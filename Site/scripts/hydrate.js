const dp = new DOMParser(),
    obs = new window.MutationObserver(hydrate),
    MARK = 'data-colored',
    rules = [
        ['RUMBLE', s => {
            const strong = document.createElement('strong')
            strong.style.color = 'rgb(182, 155, 107)'
            strong.innerHTML = '<em>' + s + '</em>'
            return strong
        }]
    ]

let pending = 0

function checkDone() {
    if (pending > 0 || document.querySelector('page:not([handled]), compute:not([handled])')) {
        return
    }

    document.querySelector('[blocker]')?.setAttribute('done', '')
}

obs.observe(document.body, { childList: true, subtree: true })
function hydrate() {
    for (const [str, transform] of rules) {
        try {
            color(document.body, str, transform)
        } catch (e) {
            console.error('rule failed:', str, e)
        }
    }

    document.querySelectorAll('page:not([handled])').forEach(async link => {
        link.setAttribute('handled', 'true')
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
    })

    document.querySelectorAll('compute:not([handled])').forEach(async link => {
        link.setAttribute('handled', 'true')
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

            const result = await f()

            result.setAttribute('fade-in', '')
            link.after(result)
            link.remove()
        } finally {
            pending--
            queueMicrotask(checkDone)
        }
    })
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

function color(root, str, transform) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: node =>
            node.data.includes(str) &&
            !node.parentElement?.closest(`script, style, option, [${MARK}]`)
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT,
    })

    // collect before mutation; editing during the walk invalidates
    const targets = []
    while (walker.nextNode()) targets.push(walker.currentNode)

    for (const target of targets) {
        const frag = document.createDocumentFragment()

        target.data.split(str).forEach((part, i) => {
            if (i > 0) {
                const result = transform(str)
                result.setAttribute(MARK, str) // name is constant; str is just data
                frag.append(result)
            }

            if (part) {
                frag.append(part)
            }
        })

        target.replaceWith(frag)
    }
}
