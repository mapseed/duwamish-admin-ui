var request = require('request')
var extend = require('extend')
var base64 = require('base-64')

/*
 * SUBMISSIONS
 * `submissionSetName` can be a 'comment' or a 'support', 
 * which is always associated with a place (placeId)
 */

module.exports = function (options) {
  options = options || {}
  var host = options.host || 'http://127.0.0.1:8001/api/v2/'
  var submissions = {}

  /*
  * GET all submissions from a place
  */
  // http://localhost:8001/api/v2/smartercleanup/datasets/duwamish/places/130/comments?format=json
  submissions.list = function (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId + '/' + options.submissionSetName,
      qs: extend({ format: "json" }, options.qs),
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
  * GET a specific submission by submission ID
  */
  submissions.get = function (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId + '/' + options.submissionSetName + '/' + options.submissionId,
      qs: extend({ format: "json" }, options.qs),
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
  * POST a specific submission by submission ID
  */
  submissions.post = function (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId + '/' + options.submissionSetName,
      method: 'POST',
      json: options.body,
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

  submissions.put = function (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId + '/' + options.submissionSetName + '/' + options.submissionId,
      method: 'PUT',
      json: options.body,
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

  submissions.delete = function (options, callback) {
    request({
      url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId + '/' + options.submissionSetName + '/' + options.submissionId,
      method: 'DELETE',
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

  // places.addAttachment = function (options, callback) {
  //   request({
  //     url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId + '/attachments',
  //     // url: host + options.username + '/datasets/' + options.slug + '/places',
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Basic ' + base64.encode(options.username + ':' + options.password)
  //     }
  //   }, function (err, res, body) {
  //     if (err) return callback(err)
  //     if (res.statusCode >= 400) return callback(body)
  //     return callback(null, body)
  //   })
  // }

  // places.addAttachment = function (options, callback) {
  //   request({
  //     url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId + '/attachments',
  //     // url: host + options.username + '/datasets/' + options.slug + '/places',
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Basic ' + base64.encode(options.username + ':' + options.password)
  //     }
  //   }, function (err, res, body) {
  //     if (err) return callback(err)
  //     if (res.statusCode >= 400) return callback(body)
  //     return callback(null, body)
  //   })
  // }

//   submissions.getSubmissions = function (options, callback) {
//     request({
//       url: host + options.username + '/datasets/' + options.slug + '/places/' + options.placeId + '/attachments',
//       // url: host + options.username + '/datasets/' + options.slug + '/places',
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic ' + base64.encode(options.username + ':' + options.password)
//       }
//     }, function (err, res, body) {
//       if (err) return callback(err)
//       if (res.statusCode >= 400) return callback(body)
//       return callback(null, body)
//     })
//   }
  return submissions
}
