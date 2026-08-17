const dp = new DOMParser(),
    id = params.get('post'),
    post = index.find(post => post.id == id)

if (params.has('post')) {
    if (params.get('namespace') != post.namespace) {
        throw new Error(`Cannot find document where id = ${id} in namespace '${params.get('namespace')}'.`)
    }

    return dp.parseFromString(`<call scripts.post post='${post.id}' />`, 'text/html').body.children.item(0)
}

const section = document.createElement('section'),
    hra = document.createElement('hr'),
    hrb = document.createElement('hr'),
    skip = post => post.namespace != params.get('namespace')

section.append(hra)

for (const post of index) {
    if (skip(post)) {
        continue
    }
    
    const a = document.createElement('div'),
        top = document.createElement('section'),
        bottom = document.createElement('em'),
        postEl = document.createElement('h1'),
        anchor = document.createElement('a'),
        dateEl = dp.parseFromString(`<em muteder>${indexDateInfo(post)}</em>`, 'text/html').body.children.item(0)

    
    top.role = 'group'
    a.className = 'secondary'
    a.setAttribute('post', true)
    bottom.setAttribute('muted', true)
    dateEl.setAttribute('post-date', true)
    anchor.textContent = post.title
    postEl.append(anchor)

    anchor.addEventListener('click', () => redirect(`/?post=${post.id}`))

    top.append(postEl, dateEl)
    bottom.append(post.description)
    
    a.append(top, bottom)
    section.append(a)
}

section.append(hrb)

return section