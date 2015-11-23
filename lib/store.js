var createStore = require('redux').createStore
var extend = require('xtend')
var reducers = require('./reducers')
var config = require('../config')

var initialState = extend({
  activeRow: null,
  activeDataset: {
    key: config.dataset ? config.dataset : null,
    metadata: {},
    properties: {},
    data: []
  },
  activeScreen: null,
  activeUser: {},
  datasets: [],
  users: [],
  ui: {}
}, config)

module.exports = createStore(reducers, initialState)
