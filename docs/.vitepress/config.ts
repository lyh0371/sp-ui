import { defineConfig } from 'vitepress'

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

    algolia: {
      appId: '7H67QR5P0A',
      apiKey: 'deaab78bcdfe96b599497d25acc6460e',
      indexName: 'vitejs',
      searchParameters: {
        facetFilters: ['tags:en']
      }
    },
    carbonAds: {
      code: 'CEBIEK3N',
      placement: 'vitejsdev'
    },
    footer: {
      message: `关于作者：https://juejin.cn/user/3438928104003758/posts`
    },

    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '组件', link: '/comps/', activeMatch: '/comps/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Why Vite',
              link: '/guide/why'
            },
            {
              text: 'Getting Started',
              link: '/guide/'
            },
            {
              text: 'Features',
              link: '/guide/features'
            },
            {
              text: 'Using Plugins',
              link: '/guide/using-plugins'
            },
            {
              text: 'Dependency Pre-Bundling',
              link: '/guide/dep-pre-bundling'
            },
            {
              text: 'Static Asset Handling',
              link: '/guide/assets'
            },
            {
              text: 'Building for Production',
              link: '/guide/build'
            },
            {
              text: 'Deploying a Static Site',
              link: '/guide/static-deploy'
            },
            {
              text: 'Env Variables and Modes',
              link: '/guide/env-and-mode'
            },
            {
              text: 'Server-Side Rendering (SSR)',
              link: '/guide/ssr'
            },
            {
              text: 'Backend Integration',
              link: '/guide/backend-integration'
            },
            {
              text: 'Comparisons',
              link: '/guide/comparisons'
            },
            {
              text: 'Troubleshooting',
              link: '/guide/troubleshooting'
            },
            {
              text: 'Migration from v2',
              link: '/guide/migration'
            }
          ]
        },
        {
          text: 'APIs',
          items: [
            {
              text: 'Plugin API',
              link: '/guide/api-plugin'
            },
            {
              text: 'HMR API',
              link: '/guide/api-hmr'
            },
            {
              text: 'JavaScript API',
              link: '/guide/api-javascript'
            },
            {
              text: 'Config Reference',
              link: '/config/'
            }
          ]
        }
      ],
      '/comps/': [
        {
          text: 'Config',
          items: [
            {
              text: 'Configuring Vite',
              link: '/config/'
            },
            {
              text: 'Shared Options',
              link: '/config/shared-options'
            },
            {
              text: 'Server Options',
              link: '/config/server-options'
            },
            {
              text: 'Build Options',
              link: '/config/build-options'
            },
            {
              text: 'Preview Options',
              link: '/config/preview-options'
            },
            {
              text: 'Dep Optimization Options',
              link: '/config/dep-optimization-options'
            },
            {
              text: 'SSR Options',
              link: '/config/ssr-options'
            },
            {
              text: 'Worker Options',
              link: '/config/worker-options'
            }
          ]
        }
      ]
    }
  }
})
