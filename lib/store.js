var createStore = require('redux').createStore
var extend = require('xtend')
var reducers = require('./reducers')
var config = require('../config')

var initialState = extend(config, {})

module.exports = createStore(reducers, initialState)
