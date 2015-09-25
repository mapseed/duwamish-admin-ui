var request = require('request')
var base64 = require('base-64')

/*
* DATASETS
* get and create datasets
*/

module.exports = function (options) {
  options = options || {}
  var host = options.host || 'http://127.0.0.1:8001/api/v2/'
  var datasets = {}

  /*
  * get all datasets that belong to a user
  */
  datasets.list = function datasets_list (options, callback) {
    request({
      url: host + options.username + '/datasets',
      method: 'GET',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(options.username + ':' + options.password)
      }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  }

  /*
  * get a specific dataset
  */
  datasets.get = function datasets_get (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug,
      method: 'GET',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(options.username + ':' + options.password)
      }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  }

  return datasets
}
