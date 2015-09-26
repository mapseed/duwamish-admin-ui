var config = {
  development: {
    host: 'http://127.0.0.1:8001/api/v2/'
  },
  staging: {
    host: 'http://dev-api.heyduwamish.org:8010/api/v2/'
  },
  production: {
    host: null
  }
}

module.exports = config[process.env.NODE_ENV]
