const resp = await fetch('posts/postdata.jsonc'),
    text = await resp.text(),
    // JSONC: JS object syntax already permits the comments and trailing commas
    // JSON.parse rejects, and unlike a regex strip it cannot corrupt strings
    postdata = new Function('return (' + text + ')')()

if (!postdata.public) {
    throw new Error("postdata.jsonc must define a 'public' namespace")
}

const data = []

for (const [namespace, posts] of Object.entries(postdata)) {
    const ids = Object.keys(posts)

    for (const [id, info] of Object.entries(posts)) {
        data.push(Object.freeze({
            namespace,
            id,
            title: info.title,
            date: info.date.join('/'),
            description: info.description,
            // insertion order is authoring order, so the last entry is newest
            latest: id == ids[ids.length - 1],
            // one owner for the posts/<namespace>/<id>.md layout
            path: `posts/${namespace}/${id}.md`,
        }))
    }
}

globalThis.index = Object.freeze(data)

globalThis.indexDateInfo = function(post) {
    if (post.latest) {
        return `${post.date} (latest)`
    }

    return post.date
}
