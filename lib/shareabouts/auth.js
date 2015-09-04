var request = require('request')
var base64 = require('base-64')

/*
* AUTH
* authenticating with shareabouts-api
*/

/*
* NOTE: i'm not sure this is working how it is supposed to yet.
*/

module.exports = function (options) {
  options = options || {}
  var host = options.host || 'http://127.0.0.1:8001/api/v2/'
  var auth = {}

  auth.currentUser = function currentUser (options, callback) {
    request({
      url: host + options.username,
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

  auth.logIn = function logIn (options, callback) {
    request({
      url: host + 'users/current',
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.encode(options.username + ':' + options.password)
      },
      body: JSON.stringify({ username: options.username, password: options.password })
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      auth.currentUser(options, callback)
    })
  }

  auth.logOut = function logOut (options, callback) {
    request({
      url: host + 'users/current',
      method: 'DELETE',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      callback(err, body)
    })
  }

  return auth
}
