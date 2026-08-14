const markdown = await import('https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js'),
    dp = new DOMParser(),
    resp = await fetch('posts/' + this.post + '.md'),
    text = await resp.text(),
    article = document.createElement('article'),
    md = markdown.parse(text),
    contents = dp.parseFromString(md, 'text/html'),
    subpaths = this.post.split('/'),
    lastSubpath = subpaths[subpaths.length - 1],
    postname = lastSubpath.split('.')[0],
    note = `<em muteder>: ${indexDateInfo(postname)}</em>`,
    header = dp.parseFromString(`<page @=pages/header.htm note='${note}' title='${postname}' />`, 'text/html').body.children.item(0)

article.append(header, ...contents.body.children)

return article
