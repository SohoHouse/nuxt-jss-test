import { resolve } from 'path'
import createSitecoreProxy from './sitecore-proxy'
import consola from 'consola'

const defaultOptions = {
  sitecoreApiKey: 'no-api-key',
  sitecoreApiHost: 'http://localhost:3000',
  jssAppName: 'My New JSS App',
  defaultLanguage: 'en',
  routePrefix: ''
}

export default async function NuxtJSS(moduleOptions) {
  const options = Object.assign(defaultOptions, this.options.jss, moduleOptions)

  if (options.enableProxy) {
    const handler = await createSitecoreProxy()
    this.addServerMiddleware({ path: '__jss_proxy', handler })

    const { https, port, host } = this.nuxt.options.server
    options.sitecoreApiHost = `${https ? 'https' : 'http'}://${host}:${port}/__jss_proxy`
    console.log()
    consola.ready({
      message: `Sitecore Disconnected proxy registered at ${options.sitecoreApiHost}`,
      badge: true
    })
    console.log()
  }

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