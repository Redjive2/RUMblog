const params = new URLSearchParams(window.location.href.split('?')[1])

if (!params.has('index')) {
    params.set('index', 'visible')
}

function redirect(path) {
    const theme =
        params.get('theme') ??
        document.querySelector('[data-theme]').getAttribute('data-theme') ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light')
        ?? 'light'

    const indext =
        params.get('index') ??
        'visible'

    if (path.startsWith('/?')) {
        window.location.href = path + "&index=" + indext + "&theme=" + theme
        return
    }

    if (!path.includes('?')) {
        window.location.href = path + "?index=" + indext + "&theme=" + theme
        return
    }

    throw new Error('Whoops, redirect failed.')
}

globalThis.params = params
globalThis.redirect = redirect
