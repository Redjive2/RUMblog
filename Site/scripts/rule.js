window.ruleId ??= 0

const thisEl = this,
    targetEl = getTargetElement(),
    MARK = 'changed-by-rule-instance-' + String(window.ruleId++),
    boundChange = () => change(targetEl, thisEl.target, childFrag)

new MutationObserver(
    boundChange
).observe(targetEl, {
    childList: true,
    subtree: true
})

boundChange()

function childFrag() {
    const frag = document.createDocumentFragment()

    for (const c of thisEl.children) {
        const node = c.cloneNode(true)
        node.setAttribute?.(MARK, true)
        frag.append(node)
    }
    
    return frag
}

function change(root, str, transform) {
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
                const result = transform()
                frag.append(result)
            }

            if (part) {
                frag.append(part)
            }
        })

        target.replaceWith(frag)
    }
}

function getTargetElement() {
    if (!thisEl.hasAttribute('root')) {
        return thisEl.sourceParent
    }

    const root = thisEl.getAttribute('root')

    if (root == '') {
        return document.body
    }

    return document.querySelector('root')
}