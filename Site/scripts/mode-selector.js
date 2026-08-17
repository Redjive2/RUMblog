const button = document.createElement('button'),
    html = document.querySelector('html')
    
let startingMode = html.getAttribute('data-theme')

if (!startingMode) {
    if (params.has('theme')) {
        html.setAttribute('data-theme', params.get('theme'))
    } else {
        const query = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        
        html.setAttribute('data-theme', query)
        params.set('theme', query)
    }
    
    button.style.color = 'rgb(42, 44, 48)'
}

button.setAttribute('mode-selector', true)

button.addEventListener('click', () => {
    if (html.getAttribute('data-theme') == 'light') {
        html.setAttribute('data-theme', 'dark')
        params.set('theme', 'dark')
    } else {
        html.setAttribute('data-theme', 'light')
        params.set('theme', 'light')
    }
})

button.innerHTML = '<em>Switch theme</em>'

return button

