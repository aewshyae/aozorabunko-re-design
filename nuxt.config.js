import routes from './routes'
const isProd = process.env.NODE_ENV === 'production'
const urlBase = isProd ? '/aozorabunko-re-design_pages/' : '/'

export default {
  target: 'static',
  modern: 'client',
  telemetry: true,
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'nofollow,noindex' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/global'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '@/assets/css/color.scss'
    ]
  },
  env: {
    PERSON_DETAIL_URL: process.env.NUXT_ENV_PERSON_DETAIL_URL,
    BOOK_CARD_URL: process.env.NUXT_ENV_BOOK_CARD_URL,
    INDEX_BY_BIBCLASS_URL: process.env.NUXT_ENV_INDEX_BY_BIBCLASS_URL,
    INDEX_BY_WORK_TITLE_URL: process.env.NUXT_ENV_INDEX_BY_WORK_TITLE_URL,
    INDEX_BY_PERSON_NAME_URL: process.env.NUXT_ENV_INDEX_BY_PERSON_NAME_URL,
    URL_BASE: urlBase,
    IS_PROD: isProd
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, _ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  router: {
    base: urlBase,
    prefetchPayloads: false
  },
  generate: {
    interval: 1,
    concurrency: 100,
    fallback: true,
    crawler: false,
    routes
  }
}
