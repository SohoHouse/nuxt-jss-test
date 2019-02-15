module.exports = nuxt => (callback, path, data, viewBag) =>
  nuxt.renderRoute(path)
    .then(({ html, error, redirected }) => callback(error, { html }))
    .catch(error => callback(error))
