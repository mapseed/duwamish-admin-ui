var h = require('virtual-dom/h')
var loop = require('virtual-raf')

var config = require('./config')
var store = require('./lib/store')
var actions = require('./lib/actions')
var router = require('./lib/router' )

var dataset = require('./elements/dataset')(h)

var places = require('shareabouts-api-client/places')(config)

router.start()

function render (state) {
  console.log('%c render: ', 'background-color:pink;', state)
  return h('div.app', 'hi')
}

var state = store.getState()
var tree = loop(state, render, require('virtual-dom'))
document.body.appendChild(tree())

store.subscribe(function () {
  var state = store.getState()
  tree.update(state)
})
