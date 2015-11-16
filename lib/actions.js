var store = require('./store')
var router = require('./router')
var actions = {}

actions.error = function actions_error (error) {
  store.dispatch({ type: 'error', error: error })
}

module.exports = actions
