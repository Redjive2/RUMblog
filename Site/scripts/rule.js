// Every <call scripts.rule /> registers into one shared, per-root pass
// instead of running its own. Independent passes collide: whichever ran first
// consumed the text, so `match` would split "Matchup" and leave `Matchup` with
// nothing contiguous to find. Here all patterns compete at each position and
// the longest match wins, so a rule can never eat another rule's prefix.
window.ruleState ??= {
    byRoot: new Map(),
    timer: null,
}

const MARK = 'data-ruled',
    thisEl = this,
    root = getTargetElement()

register(root, {
    // sticky, not global: exec() must only ever match at the offset we set
    pattern: new RegExp(thisEl.target, 'y'),
    render: childFrag,
})

function register(root, rule) {
    let entry = window.ruleState.byRoot.get(root)

    if (!entry) {
        entry = { rules: [] }
        window.ruleState.byRoot.set(root, entry)

        new MutationObserver(() => schedule()).observe(root, {
            childList: true,
            subtree: true,
        })
    }

    entry.rules.push(rule)
    schedule()
}

// Batch to the next macrotask so every rule resolving in this turn registers
// before the first pass runs — a rule that arrives later cannot reclaim text an
// earlier one already consumed.
function schedule() {
    if (window.ruleState.timer != null) {
        return
    }

    window.ruleState.timer = setTimeout(() => {
        window.ruleState.timer = null

        for (const [root, entry] of window.ruleState.byRoot) {
            runPass(root, entry.rules)
        }
    }, 0)
}

function runPass(root, rules) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: node =>
            node.parentElement?.closest(`script, style, option, [${MARK}]`)
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT,
    })

    // collect before mutation; editing during the walk invalidates
    const targets = []
    while (walker.nextNode()) targets.push(walker.currentNode)

    for (const target of targets) {
        replaceIn(target, rules)
    }
}

function replaceIn(node, rules) {
    const data = node.data

    let frag = null,
        last = 0,
        i = 0

    while (i < data.length) {
        let best = null

        for (const rule of rules) {
            rule.pattern.lastIndex = i

            const match = rule.pattern.exec(data)

            // longest wins; ties go to whichever registered first
            if (match?.[0] && (!best || match[0].length > best.text.length)) {
                best = { rule, text: match[0] }
            }
        }

        if (!best) {
            i++
            continue
        }

        frag ??= document.createDocumentFragment()

        if (i > last) {
            frag.append(data.slice(last, i))
        }

        frag.append(best.rule.render(best.text))

        i += best.text.length
        last = i
    }

    if (!frag) {
        return
    }

    if (last < data.length) {
        frag.append(data.slice(last))
    }

    node.replaceWith(frag)
}

function childFrag(matched) {
    // one marked wrapper around the whole instance, rather than a mark per
    // node: a nested <call> in the template swaps itself for unmarked output
    // when it resolves, and per-node marks let that output escape the guard
    // and get re-matched forever. inline, so it does not disturb prose flow
    const wrapper = document.createElement('span'),
        nodes = [...thisEl.childNodes]

    // drop the template's own indentation, which would otherwise inject a
    // space on both sides of every match; whitespace *between* elements still
    // matters, e.g. the gap in `</argument> <small>(0)</small>`
    while (nodes.length && isBlank(nodes[0])) {
        nodes.shift()
    }

    while (nodes.length && isBlank(nodes[nodes.length - 1])) {
        nodes.pop()
    }

    wrapper.setAttribute(MARK, true)

    for (const c of nodes) {
        wrapper.append(c.cloneNode(true))
    }

    // <argument target /> receives the substring this match actually found,
    // which is what makes a pattern broader than one literal worth writing
    wrapper.querySelectorAll('argument[target]').forEach(argument => {
        argument.replaceWith(matched)
    })

    return wrapper
}

function isBlank(node) {
    return node.nodeType == Node.TEXT_NODE && !node.data.trim()
}

function getTargetElement() {
    if (!thisEl.hasAttribute('root')) {
        return thisEl.sourceParent
    }

    const root = thisEl.getAttribute('root')

    if (root == '') {
        return document.body
    }

    const el = document.querySelector(root)

    if (!el) {
        throw new Error(`rule.js: no element matches root="${root}"`)
    }

    return el
}
