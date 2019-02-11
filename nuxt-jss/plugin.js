import Vue from 'vue'
import { SitecoreJssPlaceholderPlugin } from '@sitecore-jss/sitecore-jss-vue'
import componentFactory from '@@/temp/component-factory'
import { mapState } from 'vuex'

Vue.use(SitecoreJssPlaceholderPlugin, { componentFactory })

const storeModule = {
  // default state
  namespaced: true,
  state: () => ({
    sitecoreContext: {
      pageEditing: false
    },
    routeData: null,
    config: {
      sitecoreApiKey: '<%= options.sitecoreApiKey %>',
      sitecoreApiHost: '<%= options.sitecoreApiHost %>',
      jssAppName: '<%= options.jssAppName %>',
      defaultLanguage: '<%= options.defaultLanguage %>',
    }
  }),
  mutations: {
    setSitecoreData(state, sitecoreData) {
      if (!sitecoreData) return
      const { sitecore: { route, context = {} } = {} } = sitecoreData

      // Do not replace the original state object - the store and any components that use the store
      // need to share a reference to the same object in order for mutations to be observed.
      state.routeData = route
      state.sitecoreContext = {
        ...context,
        routeName: route && route.name,
        itemId: route && route.itemId
      }
    }
  }
}

Vue.mixin({
  computed: mapState({
    $jss: state => ({
      store: state.jss,
      componentFactory
    })
  })
})

export default ({ store }, inject) => {
  if (!store) return
  store.registerModule('jss', storeModule)
}
