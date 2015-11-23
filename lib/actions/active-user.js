var shareabouts = require('../shareabouts')
var store = require('../store')
var router = require('../router')
var activeUser = {}

/**
*
*/
activeUser.authenticate = function actions_activeUser_authenticate (options) {
  shareabouts.auth.logIn(options, function (err, res) {
    if (err) return store.dispatch({ type: 'error', error: err })

    store.dispatch({ type: 'set_active_user', user: res })
  })
}

module.exports = activeUser
