import { resolve } from 'path'

const defaultOptions = {
  sitecoreApiKey: 'no-api-key',
  sitecoreApiHost: 'http://localhost:3000',
  jssAppName: 'My New JSS App',
  defaultLanguage: 'en',
  routePrefix: ''
}

export default function NuxtJSS(moduleOptions) {
  const options = Object.assign(defaultOptions, this.options.jss, moduleOptions)

  this.extendRoutes((routes, resolve) => {
    routes.push({
      path: `${options.routePrefix}/:sitecoreRoute*`,
      component: resolve(__dirname, 'route-handler.vue')
    })
  })

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'nuxt-jss.js',
    options
  })
}
