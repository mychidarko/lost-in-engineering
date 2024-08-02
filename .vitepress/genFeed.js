const fs = require('fs')
const path = require('path')
const { Feed } = require('feed')
const { load } = require('./posts.data')
const url = `https://blog.leafphp.dev`

const feed = new Feed({
  title: 'Lost in Engineering',
  description:
    'Welcome to the Lost in Engineering blog. We write about software, engineering, space and other cool stuff.',
  id: url,
  link: url,
  language: 'en',
  image: 'https://avatars.githubusercontent.com/u/107226129?s=200&v=4',
  favicon: `https://avatars.githubusercontent.com/u/107226129?s=200&v=4`,
  copyright: 'Copyright (c) 2024-present, Michael Darko and blog contributors'
})

load(true).forEach((post) => {
  const file = path.resolve(__dirname, `dist${post.href}`)
  const rendered = fs.readFileSync(file, 'utf-8')
  const content = rendered.match(
    /<div [^<>]+?class="prose[^<>]+?>([\s\S]*)<\/div><\/div><footer/
  )

  feed.addItem({
    title: post.title,
    id: `${url}${post.href}`,
    link: `${url}${post.href}`,
    description: post.excerpt,
    content: content && content[1],
    author: [
      {
        name: post.data.author,
        link: post.data.twitter
          ? `https://twitter.com/${post.data.twitter}`
          : undefined
      }
    ],
    date: post?.data?.date
  })
})

fs.writeFileSync(path.resolve(__dirname, 'dist/feed.rss'), feed.rss2())
