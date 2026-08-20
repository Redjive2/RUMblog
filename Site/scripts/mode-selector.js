const button = document.createElement('button'),
    html = document.querySelector('html')
    
let mode = localStorage.getItem('rumblog-prefers-theme')

if (mode === null) {
    if (html.hasAttribute('data-theme')) {
        mode = html.getAttribute('data-theme')
    } else {
        const query = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        
        mode = query
    }
    
    button.style.color = 'rgb(42, 44, 48)'
    localStorage.setItem('rumblog-prefers-theme', mode)
}

html.setAttribute('data-theme', mode)

button.setAttribute('mode-selector', true)

button.addEventListener('click', () => {
    if (html.getAttribute('data-theme') == 'light') {
        html.setAttribute('data-theme', 'dark')
        localStorage.setItem('rumblog-prefers-theme', 'dark')
    } else {
        html.setAttribute('data-theme', 'light')
        localStorage.setItem('rumblog-prefers-theme', 'light')
    }
})

button.innerHTML = '<em>Switch theme</em>'

return button

