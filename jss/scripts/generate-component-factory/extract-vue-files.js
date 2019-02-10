const path = require('path')
const fs = require('fs')

/**
 * Recursively iterates the given folderPath, creating a flat array of found .vue file paths.
 * For example, given the following folder structure and using `/components` as the root folderPath:
 * /components/component0.vue
 * /components/subfolder/component1.vue
 *
 * The output would be:
 * ['component0.vue', 'subfolder/component1.vue']
 */
function extractVueFiles (folderPath) {
  let results = []
  fs.readdirSync(folderPath).forEach(pathName => {
    const computedPath = path.join(folderPath, pathName)
    const stat = fs.statSync(computedPath)
    if (stat && stat.isDirectory()) {
      results = results.concat(extractVueFiles(computedPath))
    } else if (path.extname(computedPath).toLowerCase() === '.vue') {
      results.push(computedPath)
    }
  })
  return results
}

module.exports = extractVueFiles
