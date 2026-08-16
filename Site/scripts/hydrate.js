const dp = new DOMParser(),
    obs = new window.MutationObserver(hydrate)

let pending = 0,
    firstRun = true

function checkDone() {
    if (pending > 0 || document.querySelector('page:not([handled]), compute:not([handled])')) {
        return
    }

    document.querySelector('[blocker]')?.setAttribute('done', '')
}

obs.observe(document.body, { childList: true, subtree: true })
async function hydrate() {
    // claim the flag up front — a nested hydrate() with an empty target list
    // would otherwise clear it and drop this run out of sequential mode
    const isFirstRun = firstRun
    firstRun = false

    const targets = []

    document.querySelectorAll('page:not([handled]), compute:not([handled])').forEach(link => {
        // claim synchronously — a nested hydrate() triggered during a later await
        // would otherwise re-collect anything this loop hasn't started yet
        link.setAttribute('handled', 'true')

        if (link.nodeName == 'PAGE') {
            targets.push(resolvePage.bind(this, link))
        } else {
            targets.push(resolveCompute.bind(this, link))
        }
    })

    for (const target of targets) {
        if (isFirstRun) {
            await target()
            continue
        }

        target()
    }

    async function resolvePage(link) {
        link.setAttribute('hidden', true)
        pending++

        try {
            const path = new URL("http://localhost:8080/" + link.getAttribute('@')).pathname,
                resp = await fetch(path),
                text = await resp.text(),
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

    async function resolveCompute(link) {
        console.warn(link.getAttribute('@'))

        link.setAttribute('hidden', true)
        pending++

        try {
            const path = new URL("http://localhost:8080/" + link.getAttribute('@')).pathname,
                resp = await fetch(path),
                text = await resp.text(),
                host = document.createElement('host'), // never inserted — `this` binding only
                f = wrapFunction(text, host)

            for (const attr of link.attributes) {
                // '@' is routing metadata, already consumed above — and it isn't a
                // valid XML Name, so setAttribute() throws on it in WebKit
                if (attr.name == 'handled' || attr.name == '@') {
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

function wrapFunction(code, container) {
    const baseFunction = eval?.(`
        (async function() {
            ${code}
        })
    `)

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
