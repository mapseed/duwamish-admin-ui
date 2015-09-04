var config = {
  development: {
    host: 'http://127.0.0.1:8001/api/v2/'
  },
  production: {
    host: null
  }
}

module.exports = config[process.env.NODE_ENV]
