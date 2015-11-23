var extend = require('xtend')

var config = {
  shared: {
    title: 'HeyDuwamish! Admin',
    dataset: 'pizza'
  },
  development: {
    host: 'http://127.0.0.1:4000/'
  },
  staging: {},
  production: {}
}

module.exports = extend(config.shared, config[process.env.NODE_ENV])
