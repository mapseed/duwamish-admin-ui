var shareabouts = require('../shareabouts')
var store = require('../store')
var router = require('../router')
var activeDataset = {}

/**
*
*/
activeDataset.getPlaces = function actions_activeDataset_getPlaces () {
  var state = store.getState()
  var user = state.currentUser
  shareabouts.places.list(user, function (err, res) {
    if (err) return store.dispath({ type: 'error', error: err })
    store.dispath({ type: 'set_places', places: places })
  })
}

module.exports = activeDataset
