var store = require('../store')
var router = require('../router')
var ui = {}

ui.error = function actions_ui_error (error) {
  store.dispatch({ type: 'error', error: error })
}

module.exports = ui
