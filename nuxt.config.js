import { personDetailArray } from './util/personDetail'

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
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: [
      '@/assets/css/color.scss'
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (_config, _ctx) {
    }
  },
  generate: {
    routes() {
      return personDetailArray.map(p => {
        return {
          route: `/author/${p.id}`,
          payload: p
        }
      })
    },
    done ({ duration, errors, _workerInfo }) {
      if (errors.length) {
        // TODO record errors or sth
      }
      console.log(`done! duration: ${duration}, errors: ${errors.length}`)
    }
  }
}
