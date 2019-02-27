module.exports = (nuxt) => (callback, path, data = {}, viewBag = {}) => {
  return nuxt.ready()
    .then(() => nuxt.renderRoute(path))
    .then(({ html, error, redirected }) => callback(error, { html }))
    .catch(error => callback(error))
}
