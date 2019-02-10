function transformScJssConfig () {
  // scjssconfig.json may not exist if you've never run setup
  // so if it doesn't we substitute a fake object
  let config
  try {
    // eslint-disable-next-line global-require
    config = require('../scjssconfig.json')
  } catch (e) {
    return {}
  }
  if (!config) return {}
  return {
    sitecoreApiKey: config.sitecore.apiKey,
    sitecoreApiHost: config.sitecore.layoutServiceHost
  }
}

module.exports = transformScJssConfig
