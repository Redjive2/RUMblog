const dp = new DOMParser(),
    id = params.get('id'),
    post = index.find(post => post.id == id)

if (params.has('id')) {
    if (params.get('index') == 'hidden' && !post.hidden) {
        throw new Error(`Cannot find hidden document where id = ${id}.`)
    } else if (params.get('index') != 'hidden' && post.hidden) {
        throw new Error(`Cannot find document where id = ${id}.`)
    }

    return dp.parseFromString(`<compute @=scripts/post.js post='${post.name}' />`, 'text/html').body.children.item(0)
}

const section = document.createElement('section'),
    hra = document.createElement('hr'),
    hrb = document.createElement('hr'),
    skip = params.get('index') == 'hidden'
        ? ({ hidden }) => !hidden
        : ({ hidden }) => hidden

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
        dateEl = dp.parseFromString(`<em muteder>${indexDateInfo(post.name)}</em>`, 'text/html').body.children.item(0)

    
    top.role = 'group'
    a.className = 'secondary'
    a.setAttribute('post', true)
    bottom.setAttribute('muted', true)
    dateEl.setAttribute('post-date', true)
    anchor.textContent = post.name
    postEl.append(anchor)

    anchor.addEventListener('click', () => redirect(`/?id=${post.id}`))

    top.append(postEl, dateEl)
    bottom.append(post.description)
    
    a.append(top, bottom)
    section.append(a)
}

section.append(hrb)

return section