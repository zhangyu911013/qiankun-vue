const fs = require('fs-extra') // fs-extra provides easy-to-use methods to perform filesystem operations
const path = require('path')

function copyDistToRoot (appName, appDir) {
  const sourcePath = path.join(appDir, 'dist')
  const destinationPath = path.join('dist', appName)

  // Check if the source dist folder exists
  if (!fs.existsSync(sourcePath)) {
    console.error(`Dist folder not found for app: ${appName}`)
    return // No need to proceed further if there's no source dist folder
  }

  // Remove the destination dist/subapp folder if it exists
  if (fs.existsSync(destinationPath)) {
    fs.removeSync(destinationPath)
    console.log(`Removed existing /dist/${appName} at root`)
  }

  // Ensure the root dist folder exists
  fs.ensureDirSync(path.join(__dirname, 'dist'))

  // Copy contents from source to destination
  fs.copySync(sourcePath, destinationPath)
  console.log(`Copied /dist of ${appName} to /dist/${appName} at root`)
}

module.exports = copyDistToRoot
