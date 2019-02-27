const { Nuxt } = require('nuxt-start')
const createViewRenderer = require('./nuxt-jss/create-view-renderer')

// Require nuxt config
const config = require('./nuxt.config.js')

// Create a new nuxt instance
const nuxt = new Nuxt(config)
module.exports.renderView = createViewRenderer(nuxt)
