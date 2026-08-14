const posts = index.filter(post => !post.hidden)
    select = document.createElement('select'),
    dp = new DOMParser()

select.dir = 'ltr'
select.name = 'Posts'
select.required = false
select.append(dp.parseFromString(`<option disabled>Posts</option>`, 'text/html').body.children.item(0))

for (const postname of posts.map(post => post.name)) {
    select.append(dp.parseFromString(`<option>${postname}</option>`, 'text/html').body.children.item(0))
}

select.addEventListener('change', () => {
    window.location.href = `/?id=${posts.findIndex(post => post.name == select.value).id}`
})

return select
