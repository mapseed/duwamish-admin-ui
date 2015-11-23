var shareabouts = require('../shareabouts')
var store = require('../store')
var router = require('../router')
var activeScreen = {}

activeScreen.set = function actions_activeScreen_set (screen) {
  store.dispatch({ type: 'set_active_screen', screen: screen })
}

module.exports = activeScreen
