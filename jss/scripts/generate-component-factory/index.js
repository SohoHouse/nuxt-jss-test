/*
  COMPONENT FACTORY GENERATION
  Generates the /src/temp/componentFactory.js file which maps Vue components
  to JSS components.

  The component factory is a mapping between a string name and a Vue component instance.
  When the Sitecore Layout service returns a layout definition, it returns named components.
  This mapping is used to construct the Vue hierarchy for the layout.

  The default convention uses the parent folder name as the component name,
  but it is customizable in generateComponentFactory().

  NOTE: this script can run in two modes. T
  he default mode, the component factory file is written once.
  But if `--watch` is a process argument, the component factory source folder will be watched,
  and the componentFactory.js rewritten on added or deleted files.
  This is used during `jss start` to pick up new or removed components at runtime.
*/

const { watchComponentFactory, writeComponentFactory } = require('./write-component-factory')

const isWatch = process.argv.some(arg => arg === '--watch')

if (isWatch) {
  watchComponentFactory()
} else {
  writeComponentFactory()
}
