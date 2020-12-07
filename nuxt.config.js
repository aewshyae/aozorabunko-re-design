import axios from 'axios'

export default {
  target: 'static',
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
    BOOK_CARD_URL: process.env.NUXT_ENV_BOOK_CARD_URL
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
  generate: {
    interval: 1,
    fallback: true,
    crawler: false,
    async routes () {
      try {
        return await axios.get(process.env.NUXT_ENV_PERSON_DETAIL_URL).then((res) => {
          // NOTE tentative slicing workaround until `nuxt generate` execution time reduced
          return res.data.slice(0, 2).map((p) => {
            console.log(p.id)
            return {
              route: `/author/${p.id}`,
              payload: p
            }
          })
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
