var extend = require('xtend')
var clone = require('clone')
var editor = require('data-editor')()

var reducers = {
  error: function (state, action) {
    return extend(state, { error: action.error })
  }
}

module.exports = function (state, action) {
  if (action.type.indexOf('@@redux') > -1) return state
  console.log('%c action: ', 'background-color:#green; color:white;', action.type, action)
  var newState = reducers[action.type](state, action)
  return newState
}
