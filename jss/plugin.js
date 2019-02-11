import Vue from 'vue'
import { SitecoreJssPlaceholderPlugin } from '@sitecore-jss/sitecore-jss-vue'
import componentFactory from '@@/temp/component-factory'

Vue.use(SitecoreJssPlaceholderPlugin, { componentFactory })

const store = {
  // default state
  state: {
    sitecoreContext: {
      pageEditing: false
    },
    routeData: null
  },
  setSitecoreData(sitecoreData) {
    if (!sitecoreData) return
    const route = sitecoreData.sitecore && sitecoreData.sitecore.route
    const context = (sitecoreData.sitecore && sitecoreData.sitecore.context) || {}

    // Do not replace the original state object - the store and any components that use the store
    // need to share a reference to the same object in order for mutations to be observed.
    this.state.routeData = route
    this.state.sitecoreContext = {
      ...context,
      routeName: route && route.name,
      itemId: route && route.itemId
    }
  }
}

const config = {
  sitecoreApiKey: '<%= options.sitecoreApiKey %>',
  sitecoreApiHost: '<%= options.sitecoreApiHost %>',
  jssAppName: '<%= options.jssAppName %>',
  defaultLanguage: '<%= options.defaultLanguage %>',
};

const jssStore = {
  // there may be other JSS plugins installed, merge existing properties
  ...Vue.prototype.$jss,
  config,
  store,
  sitecoreContext() {
    // this is intended only as a convenience function for easier access to the current context.
    return store.state.sitecoreContext
  },
  routeData() {
    // this is intended only as a convenience function for easier access to the current routeData.
    return store.state.routeData
  }
}

export default (ctx, inject) => {
  Vue.prototype.$jss = jssStore
  inject('jss', jssStore)
}
