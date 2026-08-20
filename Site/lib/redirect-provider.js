const params = new URLSearchParams(location.search)

// URLSearchParams built from a string is a detached copy — mutating it never
// touches the address bar, so a reload rebuilds it from the untouched URL.
// replaceState writes the query back without navigating or reloading.
for (const method of ['set', 'delete', 'append']) {
    const original = URLSearchParams.prototype[method].bind(params)

    params[method] = (...args) => {
        original(...args)

        const query = params.toString()

        history.replaceState(history.state, '', location.pathname + (query ? '?' + query : ''))
    }
}

if (!params.has('namespace')) {
    params.set('namespace', 'public')
}

// only session state survives a navigation. page state like ?post has to come
// from the caller — carrying it forward means redirect('/') inherits the post
// you are trying to leave and lands you back on the same URL
const CARRIED = ['namespace']

function redirect(path) {
    const url = new URL(path, location.origin),
        merged = new URLSearchParams(url.search)

    for (const key of CARRIED) {
        if (!merged.has(key) && params.has(key)) {
            merged.set(key, params.get(key))
        }
    }

    url.search = merged.toString()
    window.location.href = url.href
}

globalThis.params = params
globalThis.redirect = redirect
