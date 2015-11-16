var env = require('node-env-file')

var config = {
  development: {
    host: 'http://127.0.0.1:4000/'
  },
  staging: {},
  production: {}
}

try {
  env('.env', { overwrite: true })
} catch (err) {
  if (err.name !== 'TypeError' || err.message.lastIndexOf('Environment', 0) === -1) {
    throw err
  }
}

var environment = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
module.exports = config[environment]
