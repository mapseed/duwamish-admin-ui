var test = require('tape')
var config = require('../config')
var auth = require('../lib/shareabouts/auth')(config)
var datasets = require('../lib/shareabouts/datasets')(config)

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
    t.ok(res)
    t.end()
  })
})

test('get all datasets', function (t) {
  datasets.list({ username: 'admin', password: 'sodasoda' }, function (err, res) {
    console.log(err, res)
    t.end()
  })
})

test('get one dataset', function (t) {
  datasets.get({ slug: 'example', username: 'admin', password: 'sodasoda' }, function (err, res) {
    console.log(err, res)
    t.end()
  })
})
