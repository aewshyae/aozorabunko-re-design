import axios from 'axios'
require('dotenv').config()

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
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
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '@/assets/css/color.scss'
    ]
  },
  env: {
    PERSON_DETAIL_URL: process.env.NUXT_ENV_PERSON_DETAIL_URL
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, _ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  generate: {
    async routes() {
      try {
        return await axios.get(process.env.NUXT_ENV_PERSON_DETAIL_URL).then(res => {
          return res.data.map(p => {
            return {
              route: `/author/${p.id}`,
              payload: p
            }
          })
        })
      } catch (e) {
        console.error(e)
      }
    },
    done({ duration, errors, _workerInfo }) {
      if (errors.length) {
        // TODO record errors or sth
      }
      console.log(`done! duration: ${duration}, errors: ${errors.length}`)
    }
  }
}
