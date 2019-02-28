const parseServerData = (data, viewBag) => {
  const parsedData = data instanceof Object ? data : JSON.parse(data);
  const parsedViewBag = viewBag instanceof Object ? viewBag : JSON.parse(viewBag);

  return {
    viewBag: parsedViewBag,
    sitecore: parsedData && parsedData.sitecore,
  };
}


module.exports = (nuxt) => (callback, path, data = {}, viewBag = {}) => {
  const sitecoreData = parseServerData(data, viewBag)
  return nuxt.ready()
    .then(() => nuxt.renderRoute(path, { req: { sitecoreData } }))
    .then(({ html, error, redirected }) => callback(error, { html }))
    .catch(error => callback(error))
}
