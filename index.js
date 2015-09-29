var h = require('virtual-dom/h')
var DataEditor = require('data-editor')
var formatter = require('data-format')()

var places = require('./lib/shareabouts/places')({
  host: 'http://127.0.0.1:4242/'
})

var appEl = document.getElementById('app')
var editor = DataEditor(appEl, {})

var state = window.state = {
  view: 'map',
  properties: {},
  data: []
}

var tableView = require('data-editor/table')()
var mapView = require('data-editor/map')({
  leaflet: {
    zoom: 12,
    center: [47.545, -122.336],
    accessToken: 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'
  }
})

mapView.addEventListener('load', function () {
  if (!state.data.length && !state.geojson) {
    places.list({ username: 'smartercleanup', slug: 'duwamish' }, function (err, body) {
      body = JSON.parse(body)
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

render(state)

function render (state) {
  var view
  if (state.view === 'map') {
    view = mapView.render(state)
  } else if (state.view === 'table') {
    view = tableView.render(state.data)
  }
  var ui = h('div.editor-ui', [
    h('div.editor-header', [
      h('button#toggle', {
        onclick: function (e) {
          e.preventDefault()
          if (state.view === 'map') {
            state.view = 'table'
          } else {
            state.view = 'map'
          }
          render(state)
        }
      }, 'toggle')
    ])
  ])
  editor.render([ui, h('div.view-wrapper', [view])], state)
}
