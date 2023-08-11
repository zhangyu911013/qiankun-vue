// multi-npm-runner.js
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

// Load the workspace file and parse it
const workspace = yaml.load(fs.readFileSync('pnpm-workspace.yaml', 'utf-8'))

// Get the package directory from the workspace
const rootDir = path.dirname(workspace.packages[0])

// Get the npm command and the app names from the command line arguments
const npmCommand = process.argv[2]
const appsToRunCommand = process.argv.slice(3)

// If no apps are specified, run the command on all apps
if (appsToRunCommand.length === 0) {
  appsToRunCommand.push(...fs.readdirSync(rootDir).filter((dir) => {
    const dirPath = path.join(rootDir, dir)
    return fs.lstatSync(dirPath).isDirectory()
  }))
}

// Use Promise.all to run all commands in parallel and wait for all of them to finish
Promise.all(appsToRunCommand.map((app) => {
  const appDir = path.join(rootDir, app)

  // Check if app directory exists
  if (fs.existsSync(appDir)) {
    return new Promise((resolve, reject) => {
      console.log(`Running '${npmCommand}' on app: ${app}`)

      // Execute the npm command
      const child = spawn('pnpm', [npmCommand], { cwd: appDir, stdio: 'inherit', shell: true })
      child.on('close', (code) => {
        if (code !== 0) {
          console.error(`Error executing 'pnpm ${npmCommand}' on app: ${app}`)
          reject(new Error(`pnpm ${npmCommand} exited with code ${code}`))
        } else {
          resolve()
        }
      })
    })
  } else {
    console.error(`App not found in directory: ${app}`)
    return Promise.resolve() // Don't cause Promise.all to reject
  }
})).then(() => {
  console.log('All commands finished')
}).catch(() => {
  console.error('One or more commands failed')
})
