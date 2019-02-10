const addGraphQLConfig = require('./add-graph-ql-config')

const transformPackageConfig = require('./transform-package-config')

const transformScJssConfig = require('./transform-sc-jss-config')

const fs = require('fs')
const path = require('path')

/* eslint-disable no-console */

/**
 * Generate config
 * The object returned from this function will be made available
 * by importing src/temp/generated-config.js.
 * This is executed prior to the build running, so it's a way to
 * inject environment or build config-specific
 * settings as variables into the JSS app.
 * NOTE! Any configs returned here will be written into the client-side
 * JS bundle. DO NOT PUT SECRETS HERE.
 * @param {object} configOverrides Keys in this object will override
 *  any equivalent global config keys.
 */
module.exports = function generateConfig (configOverrides) {
  const defaultConfig = {
    sitecoreApiKey: 'no-api-key-set',
    sitecoreApiHost: '',
    jssAppName: 'Unknown'
  }

  // require + combine config sources
  const scjssConfig = transformScJssConfig()
  const packageJson = transformPackageConfig()

  // optional:
  // do any other dynamic config source (e.g. environment-specific config files)
  // Object.assign merges the objects in order, so the
  // package.json config can override the calculated config,
  // scjssconfig.json overrides it,
  // and finally config passed in the configOverrides param wins.
  const config = Object.assign(defaultConfig, scjssConfig, packageJson, configOverrides)

  // The GraphQL endpoint is an example of making a _computed_ config setting
  // based on other config settings.
  addGraphQLConfig(config)

  const configText = `/* eslint-disable */
// Do not edit this file, it is auto-generated at build time!
// See scripts/bootstrap.js to modify the generation of this file.
export default ${JSON.stringify(config, null, 2)};`

  const configPath = path.resolve(__dirname, '../../../temp/config.js')

  console.log(`Writing runtime config to ${configPath}`)

  fs.writeFileSync(configPath, configText, { encoding: 'utf8' })
}