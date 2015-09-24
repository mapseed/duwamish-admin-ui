var test = require('tape')
var config = require('../config')
var auth = require('../lib/shareabouts/auth')(config)
var datasets = require('../lib/shareabouts/datasets')(config)
var places = require('../lib/shareabouts/places')(config)

test('log in using username & password', function (t) {
  auth.logIn({ username: 'admin', password: 'sodasoda' }, function (err, res) {
    t.ok(res)
    t.end()
  })
})

test('log out', function (t) {
  auth.logOut({ username: 'admin', password: 'sodasoda' }, function (err, res) {
    t.notOk(err)
    t.end()
  })
})

test('try to get current user', function (t) {
  auth.currentUser({ username: 'admin', password: 'sodasoda' }, function (err, res) {
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

test('get all datasets', function (t) {
  datasets.list({ username: 'admin', password: 'sodasoda' }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

test('get one dataset', function (t) {
  datasets.get({ slug: 'example', username: 'admin', password: 'sodasoda' }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

test('get places from example dataset', function (t) {
  places.list({ username: 'admin', slug: 'example' }, function (err, res) {
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

// TODO: create a place that specifies an ID (requires special privileges on the dataset)
test('post a place to the example dataset', function (t) {
  places.post({ username: 'admin', password: 'sodasoda', slug: 'example', placeId: 3263,
                body:
      {
        "properties": {
          "description": "asdf2",
          "location_type": "observation",
          "private-submitter_email": "asd2",
          "name": "asdf2",
          "user_token": "user:7",
          "visible": "on"
        },
        "geometry": {
          "coordinates": [
              -122.5,
            47.51951934150781
          ],
          "type": "Point"
        },
        "type": "Feature"
      }
              }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

test('get a place from the example dataset', function (t) {
  places.get({ username: 'admin', slug: 'example', placeId: 3263 }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})
