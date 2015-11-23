var extend = require('xtend')
var clone = require('clone')

var reducers = {
  set_places: function reducers_set_places (state, action) {
    
  },
  set_active_screen: function reducers_set_active_screen (state, action) {
    
  },
  set_active_user: function reducers_set_active_user (state, action) {

  },
  error: function reducers_error (state, action) {
    
  }
}

module.exports = function (state, action) {
  if (action.type.indexOf('@@redux') > -1) return state

  console.log('%c action: ', 'background-color:#green; color:white;', action.type, action)
  var reducer = reducers[action.type]

  if (reducer) {
    var newState = reducer(state, action)
    return newState
  } else {
    return state
  }
}
