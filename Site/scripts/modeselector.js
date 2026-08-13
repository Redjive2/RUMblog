const button = document.createElement('button'),
    html = document.querySelector('html')
    
let startingMode = html.getAttribute('data-theme')

if (!startingMode) {
    html.setAttribute('data-theme', 'dark')
    button.style.color = 'rgb(42, 44, 48)'
}

button.setAttribute('mode-selector', true)

button.addEventListener('click', () => {
    if (html.getAttribute('data-theme') == 'light') {
        html.setAttribute('data-theme', 'dark')
    } else {
        html.setAttribute('data-theme', 'light')
    }
})

button.innerHTML = '<em>Switch theme</em>'

return button

