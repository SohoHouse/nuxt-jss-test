/**
 * Adds the GraphQL endpoint URL to the config object,
 * and ensures that components needed to calculate it are valid
 */
function addGraphQLConfig (baseConfig) {
  if (!baseConfig.graphQLEndpointPath || typeof baseConfig.sitecoreApiHost === 'undefined') {
    console.error('The `graphQLEndpointPath` and/or `layoutServiceHost` configurations were not defined. You may need to run `jss setup`.')
    process.exit(1)
  }
  // eslint-disable-next-line no-param-reassign
  baseConfig.graphQLEndpoint = `${baseConfig.sitecoreApiHost}${baseConfig.graphQLEndpointPath}?sc_apikey=${baseConfig.sitecoreApiKey}`
}

module.exports = addGraphQLConfig
