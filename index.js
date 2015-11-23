var h = require('virtual-dom/h')
var loop = require('virtual-raf')

var store = require('./lib/store')
var actions = require('./lib/actions')
var router = require('./lib/router' )

var header = require('./elements/header')(h)
var dataset = require('./elements/dataset')(h)

router.on('/', function () {
  console.log('route: /')
  if (!tree) init()
})

router.on('/map', function () {
  console.log('route: /map')
  if (!tree) init()
})

router.on('/list', function () {
  console.log('route: /list')
  if (!tree) init()
})

router.on('/grid', function () {
  console.log('route: /grid')
  if (!tree) init()
})

router.start()

function render (state) {
  console.log('%c render: ', 'background-color:pink;', state)
  return h('div.app', [
    header.render(state),
    dataset.render(state)
  ])
}

var tree
function init () {
  actions.activeDataset.getPlaces()
  var state = store.getState()

  tree = loop(state, render, require('virtual-dom'))
  document.body.appendChild(tree())

  store.subscribe(function () {
    var state = store.getState()
    tree.update(state)
  })

  return tree
}
