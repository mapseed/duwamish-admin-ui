var request = require('request')
var base64 = require('base-64')

/*
* PLACES
* get places
* TODO: Create places!
*/

module.exports = function (options) {
  options = options || {}
  var host = options.host || 'http://127.0.0.1:8001/api/v2/'
  var places = {}

  /*
  * get all places (that belong to a user?)
  */
  places.list = function list (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug + "/places?include_submissions=true&format=json",
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  }

  /*
  * get a specific place
  */
  places.get = function places_get (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  }

  places.post = function post (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug + '/places',
      method: 'POST',
      json: true,
      body: options.body,
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
  return places
}
