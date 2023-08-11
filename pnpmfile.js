// pnpmfile.js
module.exports = {
  hooks: {
    readPackage (packageJson) {
      const overrides = {
        // Force specific versions
        vue: '2.6.14',
        '@vue/composition-api': '^1.7.1'
        // ... other overrides
      }

      for (const [name, version] of Object.entries(overrides)) {
        if (packageJson.dependencies && packageJson.dependencies[name]) {
          packageJson.dependencies[name] = version
        }
        if (packageJson.devDependencies && packageJson.devDependencies[name]) {
          packageJson.devDependencies[name] = version
        }
      }

      return packageJson
    }
  }
}
