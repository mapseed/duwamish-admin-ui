var h = require('virtual-dom/h')
var DataEditor = require('data-editor')
var formatter = require('data-format')()
var config = require('./config')
var places = require('shareabouts-api-client/places')(config)

var appEl = document.getElementById('app')
var editor = DataEditor(appEl, {})

var state = window.state = {
  view: 'map',
  properties: {},
  data: []
}

var views = {
  grid: require('data-grid')(),
  map: require('data-map')({
    zoom: 12,
    center: [47.545, -122.336],
    accessToken: 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'
  })
}

views.map.addEventListener('load', function () {
  if (!state.data.length && !state.geojson) {
    places.list({ username: 'smartercleanup', slug: 'duwamish' }, function (err, body) {
      body = JSON.parse(body)
      console.log(body)
      if (err) console.error(err)
      var formatted = formatter.format(body.features)
      state.data = formatted.data
      state.properties = formatted.properties
      state.geojson = {
        features: formatter.toGeoJSON(formatted, { convertToNames: false })
      }
      render(state)
    })
  }
  render(state)
})

function render (state) {
  var view = views[state.view].render(state)
  editor.render([ui, h('div.view-wrapper', [view])], state)
}

var viewButtons = []
Object.keys(views).forEach(function (key) {
  viewButtons.push(h('button.view-choice', {
    onclick: function (e) {
      e.preventDefault()
      if (state.view !== key) {
        state.view = key
        render(state)
      }
    }
  }, key))
})

var ui = h('div.editor-ui', [
  h('div.editor-header', viewButtons)
])

render(state)
