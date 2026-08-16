let data

const resp = await fetch('posts/index.lines'),
    text = await resp.text(),
    rawData = text.split('\n')

data = rawData
    .filter(line => !line.startsWith('##'))
    .map(line => line.split(', '))
    .map((row, index) => [index, ...row])
    .map(row => ({
        id: row[0],
        name: row[1].startsWith('~~ ') ? row[1].split('~~ ')[1] : row[1],
        date:  row[2],
        description: row[3],
        hidden: row[1].startsWith('~~ '),
    }))

data.forEach(row => {
    row.latest = data.filter(r => !r.hidden).indexOf(row) == data.filter(r => !r.hidden).length - 1
})

data.map(row => Object.freeze(row))

globalThis.index = data

globalThis.indexDateInfo = function(postname) {
    const latest = data.filter(post => post.latest)[0],
        date = data.filter(post => post.name == postname)[0].date

    if (latest.name == postname) {
        return `${date} (latest)`
    }

    return date
}

Object.freeze(data)