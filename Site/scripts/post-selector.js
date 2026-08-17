const posts = index.filter(post => post.namespace == params.get('namespace')),
    select = document.createElement('select'),
    dp = new DOMParser()

select.dir = 'ltr'
select.name = 'Posts'
select.required = false
select.append(dp.parseFromString(`<option value='HOME'>Posts</option>`, 'text/html').body.children.item(0))

for (const post of posts) {
    select.append(dp.parseFromString(`<option value='${post.id}'>${post.title}</option>`, 'text/html').body.children.item(0))
}

let value = params.get('post') ?? 'HOME'
select.setAttribute('value', value)
select.value = value

select.addEventListener('change', () => {
    if (select.value == 'HOME') {
        redirect('/')
        return
    }

    redirect(`/?post=${select.value}`)
})

return select
