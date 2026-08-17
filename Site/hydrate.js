const dp = new DOMParser(),
    obs = new window.MutationObserver(hydrate),
    sourceCache = new Map(),
    compiledCache = new Map(),
    SOURCE_STORE = 'call-sources'

let pending = 0

function checkDone() {
    if (pending > 0 || document.querySelector('page:not([handled]), call:not([handled])')) {
        return
    }

    document.querySelector('[blocker]')?.setAttribute('done', '')
}

// one fetch per path, however many <call>/<page> reference it
function loadSource(path) {
    if (!sourceCache.has(path)) {
        sourceCache.set(path, revalidatingFetch(path))
    }

    return sourceCache.get(path)
}

// stale-while-revalidate across page loads: answer from the store immediately,
// refresh in the background so the next load picks up a deploy on its own
async function revalidatingFetch(path) {
    // caches is absent outside secure contexts — e.g. http:// over a LAN IP
    if (!globalThis.caches) {
        return (await fetch(path)).text()
    }

    const store = await caches.open(SOURCE_STORE),
        cached = await store.match(path),
        // default cache mode on purpose: _headers sends max-age=0,
        // must-revalidate for these paths, so this still revalidates against the
        // server, and staying default lets it consume the <link rel=preload>
        fresh = fetch(path).then(resp => {
            if (resp.ok) {
                store.put(path, resp.clone())
            }

            return resp
        })

    if (cached) {
        fresh.catch(() => {}) // background refresh; a failure here is not fatal
        return cached.text()
    }

    return (await fresh).text()
}

// one compile per path — baseFunction is instance-independent, since every
// per-instance binding arrives through .call(container) at invocation time
function compile(path, code) {
    if (!compiledCache.has(path)) {
        compiledCache.set(path, eval?.(`
            (async function() {
                ${code}
            })
            //# sourceURL=${path}
        `))
    }

    return compiledCache.get(path)
}

obs.observe(document.body, { childList: true, subtree: true })
async function hydrate() {
    const providers = [],
        rest = []

    document.querySelectorAll('page:not([handled]), call:not([handled])').forEach(link => {
        // nested inside another page/call, so this is template markup, not a
        // live node. leave it inert: the owner moves it off-document into its
        // host, and each clone it inserts gets collected on a later pass
        if (link.parentElement?.closest('page, call')) {
            return
        }

        // claim synchronously — a nested hydrate() triggered during a later await
        // would otherwise re-collect anything this loop hasn't started yet
        link.setAttribute('handled', 'true')

        // count the whole batch up front; counting inside the resolvers lets
        // pending hit 0 between targets and lifts the blocker early
        pending++

        const resolve = link.nodeName == 'PAGE'
            ? resolvePage.bind(this, link)
            : resolveCall.bind(this, link)

        // lib. publishes the globals (params, index) that scripts. reads, so it
        // has to settle first; everything else is independent and runs at once.
        // the route is the first attribute — setAttribute appends, so 'handled'
        // above lands after it
        if (link.attributes.item(0)?.name.startsWith('lib.')) {
            providers.push(resolve)
        } else {
            rest.push(resolve)
        }
    })

    if (providers.length) {
        await Promise.all(providers.map(resolve => resolve()))
    }

    rest.forEach(resolve => resolve())

    async function resolvePage(link) {
        link.setAttribute('hidden', true)

        try {
            const at = link.attributes.item(0).name.replace('.', '/') + '.htm',
                path = new URL("http://localhost:8080/" + at).pathname,
                text = await loadSource(path),
                page = dp.parseFromString(text, 'text/html'),
                frag = document.createDocumentFragment()

            // must be set before insertion — @starting-style only applies on first render
            for (const child of page.body.children) {
                child.setAttribute('fade-in', '')
            }

            frag.append(...page.body.children)

            frag.querySelectorAll('argument').forEach(async argument => {
                const argName = argument.attributes.item(0).name,
                    argContent = dp.parseFromString(link.getAttribute(argName), 'text/html').body.childNodes.item(0)
                argument.replaceWith(argContent)
            })

            link.after(frag)
            link.remove()
        } finally {
            pending--
            queueMicrotask(checkDone)
        }
    }

    async function resolveCall(link) {
        link.setAttribute('hidden', true)

        try {
            const route = link.attributes.item(0).name,
                path = new URL("http://localhost:8080/" + route.replace('.', '/') + '.js').pathname,
                text = await loadSource(path),
                host = document.createElement('host'), // never inserted — `this` binding only
                f = wrapFunction(path, text, host)

            for (const attr of link.attributes) {
                // the route is addressing, already consumed above
                if (attr.name == 'handled' || attr.name == route) {
                    continue
                }

                host.setAttribute(attr.name, attr.value)
                host[attr.name] ??= attr.value
            }

            host.append(...link.childNodes)
            host.observer = new MutationObserver(f)
            host.sourceParent = link.parentNode

            const result = await f()

            if (result != undefined) {
                result.setAttribute('fade-in', '')
                link.after(result)
            }

            link.remove()
        } finally {
            pending--
            queueMicrotask(checkDone)
        }
    }
}

hydrate()

function wrapFunction(path, code, container) {
    const baseFunction = compile(path, code)

    return async () => {
        try {
            return await baseFunction.call(container)
        } catch (e) {
            console.error(e)
            const failure = document.createElement('failure_node')
            failure.innerText = e
            failure.style = `
                color: #FFAAAA;
                background-color: #552222;
            `
            return failure
        }
    }
}
