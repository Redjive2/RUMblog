const params = new URLSearchParams(window.location.href.split('?')[1])

if (!params.has('namespace')) {
    params.set('namespace', 'public')
}

function redirect(path) {
    const theme =
        params.get('theme') ??
        document.querySelector('[data-theme]').getAttribute('data-theme') ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light')
        ?? 'light'

    const namespace =
        params.get('namespace') ??
        'public'

    if (path.startsWith('/?')) {
        window.location.href = path + "&namespace=" + namespace + "&theme=" + theme
        return
    }

    if (!path.includes('?')) {
        window.location.href = path + "?namespace=" + namespace + "&theme=" + theme
        return
    }

    throw new Error('Whoops, redirect failed.')
}

globalThis.params = params
globalThis.redirect = redirect
