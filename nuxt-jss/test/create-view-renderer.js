import { Nuxt, Builder } from 'nuxt'
import config from '../../nuxt.config'
import { default as createViewRenderer } from '../create-view-renderer'

const nuxt = new Nuxt(config)
new Builder(nuxt).build()
  .then(() => {
    const viewRenderer = createViewRenderer(nuxt)

    viewRenderer((err, { html } = {}) => {
      console.log(err, html)
    }, '/', { sitecore: { context: { pageEditing: true } } })
  })
