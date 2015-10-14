var config = {
  development: {
    host: 'http://127.0.0.1:8001/api/v2/'
  },
  staging: {
    host: 'http://dev-api.heyduwamish.org/api/v2/'
  },
  production: {
    host: null
  }
}

// Read the .env file, but don't throw err if .env file is not found:
var env = require('node-env-file')
try {
  env('.env', { overwrite: true })
} catch (err) {
  if (err.name !== 'TypeError' || err.message.lastIndexOf('Environment', 0) === -1) {
    throw err
  }
}
var environment = process.env.NODE_ENV ? process.env.NODE_ENV : "development"

module.exports = config[environment]
