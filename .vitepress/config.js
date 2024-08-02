import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lost in Engineering',
  description:
    'We write about software, engineering, space and other cool stuff.',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    [
      'meta',
      {
        name: 'keywords',
        content: 'space, science, tech, programming'
      }
    ],
    [
      'meta',
      {
        name: 'robots',
        content: 'index, sollow, all'
      }
    ],
    [
      'meta',
      {
        name: 'twitter:site',
        content: '@mychidarko'
      }
    ],
    [
      'meta',
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
    [
      'meta',
      {
        name: 'og:type',
        content: 'website'
      }
    ],
    [
      'meta',
      {
        name: 'og:image',
        content:
          'https://repository-images.githubusercontent.com/214705101/0ff19323-d2c5-46f5-a582-0b1f3a6eabcc'
      }
    ]
  ],
  vite: {
    build: {
      minify: 'terser'
    }
  }
})
