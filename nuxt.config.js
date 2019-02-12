const pkg = require('./package')

const dev = process.env.NODE_ENV === 'development'

if (dev) require('dotenv').config()

module.exports = {
  mode: 'universal',
  srcDir: 'client/',
  dev,
  devtools: true,
  build: {
    extend(config, { isClient }) {
      // Extend only webpack config for client-bundle
      if (isClient || dev) {
        config.devtool = 'source-map'
      }
    }
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  modules: [
    '@@/nuxt-jss'
  ],
  jss: {
    enableProxy: process.env.ENABLE_SITECORE_PROXY,
    sitecoreApiHost: process.env.SITECORE_API_HOST,
    componentPath: 'sitecore/components'
  }
}
