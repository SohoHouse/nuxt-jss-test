const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar') // eslint-disable-line import/no-extraneous-dependencies
const generateComponentFactory = require('./generate-component-factory')

const configPath = path.resolve(process.cwd(), 'nuxt.config.js')
const { jss: config } = require(configPath)

const componentFactoryPath = path.resolve(process.cwd(), 'temp/component-factory.js')
const componentRootPath = config.componentPath || path.resolve(process.cwd(), 'sitecore/components')

function writeComponentFactory() {
  const componentFactory = generateComponentFactory(componentRootPath)
  console.log(`Writing component factory to ${componentFactoryPath}`)
  fs.writeFileSync(componentFactoryPath, componentFactory, { encoding: 'utf8' })
}

function watchComponentFactory() {
  console.log(`Watching for changes to component factory sources in ${componentRootPath}...`)
  chokidar
    .watch(componentRootPath, { ignoreInitial: true, awaitWriteFinish: true })
    .on('add', writeComponentFactory)
    .on('unlink', writeComponentFactory)
}

exports.writeComponentFactory = writeComponentFactory
exports.watchComponentFactory = watchComponentFactory
