const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar') // eslint-disable-line import/no-extraneous-dependencies
const generateComponentFactory = require('./generate-component-factory')

const componentFactoryPath = path.resolve(__dirname, '../../../temp/componentFactory.js')
const componentRootPath = path.resolve(__dirname, '../../components')

function writeComponentFactory () {
  const componentFactory = generateComponentFactory(componentRootPath)
  console.log(`Writing component factory to ${componentFactoryPath}`)
  fs.writeFileSync(componentFactoryPath, componentFactory, { encoding: 'utf8' })
}

function watchComponentFactory () {
  console.log(`Watching for changes to component factory sources in ${componentRootPath}...`)
  chokidar
    .watch(componentRootPath, { ignoreInitial: true, awaitWriteFinish: true })
    .on('add', writeComponentFactory)
    .on('unlink', writeComponentFactory)
}

exports.writeComponentFactory = writeComponentFactory
exports.watchComponentFactory = watchComponentFactory
