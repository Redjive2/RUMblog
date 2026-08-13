async function getLatestInfo(postname) {
    const resp = await fetch('posts/index.lines'),
        text = await resp.text(),
        names = text.split('\n').map(l => l.split(", ")[0]),
        dates = text.split('\n').map(l => l.split(", ")[1]),
        date = dates[names.indexOf(postname)]

    if (names[0] == postname) {
        return `<em muteder>${date} (latest)</em>`
    }

    return `<em muteder>${date}</em>`
}

const resp = await fetch('posts/index.lines'),
    text = await resp.text(),
    index = text.split('\n').map(l => l.split(", ")),
    dp = new DOMParser()

if (window.location.href.includes("?id=")) {
    const paramStr = window.location.href.split("?")[1],
        params = new URLSearchParams(paramStr),
        id = params.get('id'),
        postname = index[parseInt(id)][0]

    return dp.parseFromString(`<compute @=scripts/post.js post='${postname}' />`, 'text/html').body.children.item(0)
}

const section = document.createElement('section'),
    hra = document.createElement('hr'),
    hrb = document.createElement('hr')

section.append(hra)

let i = 0
for (const [postname, _, desc] of index) {
    const a = document.createElement('div'),
        top = document.createElement('section'),
        bottom = document.createElement('em'),
        postEl = document.createElement('h1'),
        anchor = document.createElement('a'),
        dateEl = dp.parseFromString(await getLatestInfo(postname), 'text/html').body.children.item(0)

    
    top.role = 'group'
    a.className = 'secondary'
    a.setAttribute('post', true)
    bottom.setAttribute('muted', true)
    dateEl.setAttribute('post-date', true)
    anchor.textContent = postname
    postEl.append(anchor)

    const idx = i
    anchor.addEventListener('click', () => {
        window.location.href = 'home.htm?id=' + String(idx)
    })

    top.append(postEl, dateEl)
    bottom.append(desc)
    
    a.append(top, bottom)
    section.append(a)
    
    i++
}

section.append(hrb)

return section