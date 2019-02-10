const packageConfig = require('../../package.json')

function transformPackageConfig () {
  if (!packageConfig.config) { return {} }
  return {
    jssAppName: packageConfig.config.appName,
    defaultLanguage: packageConfig.config.language || 'en',
    graphQLEndpointPath: packageConfig.config.graphQLEndpointPath || null
  }
}
exports.transformPackageConfig = transformPackageConfig
