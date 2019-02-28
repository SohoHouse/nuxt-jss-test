<template>
  <h1 v-if="notFound">Not Found</h1>
  <h1 v-else-if="loading">Loading</h1>
  <placeholder v-else name="jss-main" :rendering="routeData" :componentFactory="$jss.componentFactory"/>
</template>

<script>
import { isExperienceEditorActive, dataApi, Placeholder } from '@sitecore-jss/sitecore-jss-vue'
import dataFetcher from './services/data-fetcher'

// Dynamic route handler for Sitecore items.
// Because JSS app routes are defined in Sitecore, traditional static routing isn't enough -
// we need to load dynamic route data from Sitecore when the client side route changes.
// So vue-router delegates all route rendering to this handler, which attempts to get the right
// route data from Sitecore - and if none exists, renders the not found component.

/**
 * Gets route data from Sitecore.
 * This data is used to construct the component layout for a JSS route.
 * @param {string} route Route path to get data for (e.g. /about)
 * @param {string} language Language to get route data in (content language, e.g. 'en')
 * @param {dataApi.LayoutServiceRequestOptions} options Layout service fetch options
 */
function fetchRouteData (config, route, language) {
  const fetchOptions = {
    layoutServiceConfig: { host: config.sitecoreApiHost },
    querystringParams: { sc_lang: language, sc_apikey: config.sitecoreApiKey },
    fetcher: dataFetcher
  }

  return dataApi.fetchRouteData(route, fetchOptions).catch(error => {
    if (error.response && error.response.status === 404 && error.response.data) {
      return error.response.data
    }

    console.error('Route data fetch error', error, error.response)

    return null
  })
}

async function updateRouteData ({ jss, route, commit, defaultLanguage }) {
  let loading, notFound
  let sitecoreRoutePath = route.params.sitecoreRoute || '/'
  if (!sitecoreRoutePath.startsWith('/')) {
    sitecoreRoutePath = `/${sitecoreRoutePath}`
  }

  const language = route.params.lang || jss.sitecoreContext.language || defaultLanguage
  loading = true

  // get the route data for the new route
  const routeData = await fetchRouteData(jss.config, sitecoreRoutePath, language)
  if (routeData !== null && routeData.sitecore.route) {
    // Update the JSS store instance with the fetched data.
    // This will signal the RouteHandler to update/re-render, as well as any components
    // that are referencing the JSS store instance in their `data` object.
    commit('jss/setSitecoreData', routeData)
    notFound = false
  } else {
    commit('jss/setSitecoreData', routeData)
    notFound = true
  }
  loading = false

  return { loading, notFound }
}

export default {
  name: 'Route-Handler',
  computed: {
    routeData () {
      return this.$jss.store.routeData
    },
    routeFields () {
      return this.routeData && this.routeData.fields || {}
    },
    pageTitle () {
      if (this.notFound) return 'Page Not Found'
      return this.routeFields.pageTitle && this.routeFields.pageTitle.value
    },
    pageDescription () {
      if (this.notFound) return 'This page has not been found.'
      return this.routeFields.pageDescription && this.routeFields.pageDescription.value
    }
  },
  head () {
    return {
      title: this.pageTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.pageDescription }
      ]
    }
  },
  async asyncData ({ route, store: { commit, state: { jss: $jss } } }) {
    const state = { notFound: true, defaultLanguage: $jss.config.defaultLanguage, loading: true }

    // if the app state has routeData, we don't need to load it and don't need a loading screen
    if ($jss.routeData) {
      state.loading = false
    }

    // route path from vue router - if route was resolved, it's not a 404
    if (route !== null) {
      state.notFound = false
    }

    // if we have an initial SSR state, and that state doesn't have a valid route data,
    // then this is a 404 route.
    if (!$jss.routeData) {
      state.notFound = true
    }

    // if we have initial context data, and that context data has a language defined,
    // set the default language (this makes the language of content follow the
    // Sitecore context language cookie)
    // note that a route-based language (i.e. /de-DE) will override this default; this is for home.
    if ($jss.sitecoreContext && $jss.sitecoreContext.language) {
      state.defaultLanguage = $jss.sitecoreContext.language
    }

    if (state.notFound) {
      const { loading, notFound } = await updateRouteData({ 
        jss: $jss, 
        route, 
        commit, 
        defaultLanguage: state.defaultLanguage 
      })

      state.loading = loading
      state.notFound = notFound
    }

    return state
  },
  created () {
    // if no existing routeData is present (from SSR), get Layout Service fetching the route data
    if (!this.routeData) {
      this.updateRouteData(this.$route)
    }
    // tell app to sync its current language with the route language
    this.updateLanguage(this.$route)
  },
  inject: {
    changeAppLanguage: {
      type: Function
    }
  },
  methods: {
    /**
     * Loads route data from Sitecore Layout Service into appState.routeData
     */
    async updateRouteData (route) {
      const { loading, notFound } = await updateRouteData({ 
        jss: this.$jss.store, 
        route, 
        commit: this.$store.commit, 
        defaultLanguage: this.defaultLanguage 
      })

      this.loading = loading
      this.notFound = notFound
    },
    /**
     * Updates the current app language to match the route data.
     */
    updateLanguage (route) {
      const newLanguage =
        route.params.lang || this.$jss.store.sitecoreContext.language || this.defaultLanguage
      // `changeAppLanguage` is "inject"-ed from AppRoot
      this.changeAppLanguage(newLanguage)
    }
  },
  async beforeRouteUpdate (to, from, next) {
    if (to.hash !== '') {
      return next()
    }

    if (isExperienceEditorActive()) {
      return window.location.assign(to.path)
    }

    this.updateLanguage(to)
    await this.updateRouteData(to)
    next()
  },
  components: {
    Placeholder
  }
}
</script>
