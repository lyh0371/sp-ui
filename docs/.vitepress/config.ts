import { defineConfig } from 'vitepress'
import sidebar from './theme/sidebar'
const ogDescription = 'Next Generation Frontend Tooling'
const ogImage = 'https://vitejs.dev/og-image.png'
const ogTitle = 'SPUI'
const ogUrl = 'https://vitejs.dev'

// netlify envs
// const deployURL = process.env.DEPLOY_PRIME_URL || ''
// const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

export default defineConfig({
  title: `SP-UI`,
  description: '组件库',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    ['meta', { name: 'theme-color', content: '#646cff' }]
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/logo.png',
    editLink: {
      pattern: 'https://github.com/vitejs/vite/edit/main/docs/:path',
      text: 'Suggest changes to this page'
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/lyh0371/sp-ui' }],

    // algolia: {
    //   appId: '7H67QR5P0A',
    //   apiKey: 'deaab78bcdfe96b599497d25acc6460e',
    //   indexName: 'vitejs',
    //   searchParameters: {
    //     facetFilters: ['tags:en']
    //   }
    // },
    carbonAds: {
      code: 'CEBIEK3N',
      placement: 'vitejsdev'
    },
    footer: {
      message: `关于作者：https://juejin.cn/user/3438928104003758/posts`
    },

    nav: [
      { text: '指南', link: '/guide/index', activeMatch: '/guide/' },
      { text: '组件', link: '/components/button', activeMatch: '/components/' }
    ],
    sidebar
  },
  markdown: {
    config: (md) => {
      const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss'
      })
    }
  }
})
