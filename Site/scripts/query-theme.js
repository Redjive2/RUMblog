const thisEl = this,
    // span, not div: this lands mid-sentence inside prose, and a block box
    // there forces a line break before and after every match
    resultEl = document.createElement('span'),
    // <html> always exists, unlike querySelector('[data-theme]') — mode-selector
    // sets that attribute from the same concurrent batch this runs in
    themeEl = document.documentElement

for (const branch of ['dark', 'light']) {
    if (!thisEl.querySelector(branch)) {
        throw new Error(`query-theme.js: missing <${branch}> branch`)
    }
}

new MutationObserver(render).observe(themeEl, {
    attributes: true,
    attributeFilter: ['data-theme'],
})

render()

return resultEl

function currentTheme() {
    // the live attribute first: it is what the toggle actually changes, and a
    // stale ?theme= would otherwise pin this to whatever the page loaded with
    return themeEl.getAttribute('data-theme') ??
        params.get('theme') ??
        // parenthesised: ?: binds looser than ??, so without these the whole
        // chain becomes the condition and the result is always 'dark'
        (window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light')
}

function render() {
    const branch = thisEl.querySelector(currentTheme() == 'dark' ? 'dark' : 'light')

    // deep clone, and unwrap: the <dark>/<light> tag is a selector, not output
    resultEl.replaceChildren(...branch.cloneNode(true).childNodes)
}
