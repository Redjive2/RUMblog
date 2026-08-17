// absolute URL on purpose — relative import() specifiers have no reliable base
// inside eval'd code, which is where every call runs
const markdown = await import(location.origin + '/lib/marked.esm.js'),
    dp = new DOMParser(),
    post = index.find(p => p.id == this.post && p.namespace == params.get('namespace')),
    resp = await fetch(post.path),
    text = await resp.text(),
    article = document.createElement('article'),
    md = markdown.parse(text),
    contents = dp.parseFromString(md, 'text/html'),
    note = `<em muteder>: ${indexDateInfo(post)}</em>`,
    header = dp.parseFromString(`<page ui.header note='${note}' title='${post.title}' />`, 'text/html').body.children.item(0)

article.append(header, ...contents.body.children)

return article
