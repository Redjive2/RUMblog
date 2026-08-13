const resp = await fetch('posts/index.lines'),
    text = await resp.text(),
    names = text.split('\n').map(l => l.split(", ")[0]),
    select = document.createElement('select'),
    dp = new DOMParser()

select.dir = 'ltr'
select.name = 'Posts'
select.required = false
select.append(dp.parseFromString(`<option disabled>Posts</option>`, 'text/html').body.children.item(0))

for (const line of names) {
    select.append(dp.parseFromString(`<option>${line}</option>`, 'text/html').body.children.item(0))
}

// 'click' on <option> never fires in WebKit — on iOS the select is a native picker
select.addEventListener('change', () => {
    window.location.href = `/?id=${names.indexOf(select.value)}`
})

return select
