var test = require('tape')
var config = require('../config')
var auth = require('../lib/shareabouts/auth')(config)
var datasets = require('../lib/shareabouts/datasets')(config)
var places = require('../lib/shareabouts/places')(config)

// Our dataset for testing, which should not already exist
var TEST_DATASET = config.dataset || 'blahBlahExampleDataset'
var TEST_HOST = config.host || 'http://127.0.0.1:8001/api/v2/'
console.log("config.host:", config.host)
var USERNAME = config.username || 'admin'
var PASSWORD = config.password || 'sodasoda'

// Assume that we already have a superuser names USERNAME with password 'sodasoda'
test('log in using username & password', function (t) {
  auth.logIn({ username: USERNAME, password: PASSWORD }, function (err, res) {
    t.ok(res)
    t.end()
  })
})

test('log out', function (t) {
  auth.logOut({ username: USERNAME, password: PASSWORD }, function (err, res) {
    t.notOk(err)
    t.end()
  })
})

test('try to get current user', function (t) {
  auth.currentUser({ username: USERNAME, password: PASSWORD }, function (err, res) {
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

// // TODO: Only create the new test dataset if it doesn't already exist
// // (helpful if the test fails after we create the dataset)
// test('create a new test dataset', function (t) {
//   datasets.post({ username: USERNAME, password: PASSWORD,
//                   body: {
//                     "display_name": TEST_DATASET,
//                     "slug": TEST_DATASET,
//                     "owner": TEST_HOST + USERNAME
//                   }
//                   }, function (err, res) {
//     console.log(err, res)
//     t.notOk(err)
//     t.ok(res)
//     t.end()
//   })
// })

test('get all datasets', function (t) {
  datasets.list({ username: USERNAME, password: PASSWORD }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

test('get one dataset', function (t) {
  datasets.get({ slug: TEST_DATASET, username: USERNAME, password: PASSWORD }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

// test('Update our dataset to contain special permissions', function (t) {
//   datasets.put({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET,
//                  body: {
//                    "display_name": "new display name",
//                    "slug": TEST_DATASET,
//                    "owner": TEST_HOST + USERNAME
//                  }
//                }, function (err, res) {
//                  t.notOk(err)
//                  t.ok(res)
//                  t.end()
//                })
// })

test('get places from test dataset', function (t) {
  places.list({ username: USERNAME, slug: TEST_DATASET}, function (err, res) {
    console.log("res:", res)
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

// var examplePlaceId;
// test('post a place to the example dataset', function (t) {
//   places.post({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET,
//                 body: {
//                   "properties": {
//                     "description": "asdf2",
//                     "location_type": "observation",
//                     "private-submitter_email": "asd2",
//                     "name": "asdf2",
//                     "user_token": "user:7",
//                     "visible": "on"
//                   },
//                   "geometry": {
//                     "coordinates": [
//                         -122.5,
//                       47.51951934150781
//                     ],
//                     "type": "Point"
//                   },
//                   "type": "Feature"
//                 }
//               }, function (err, res) {
//                 console.log(err, res)
//                 t.notOk(err)
//                 t.ok(res)
//                 examplePlaceId = res.id
//                 console.log("examplePlaceId:", examplePlaceId)
//                 t.end()
//               })
// })

// test('update our previously added place to the example dataset', function (t) {
//   places.put({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId,
//                body: {
//                  "properties": {
//                    "description": "asdf4",
//                    "location_type": "observation",
//                    "private-submitter_email": "asd4",
//                    "name": "asdf4",
//                    "user_token": "user:7",
//                    "visible": "on"
//                  },
//                  "geometry": {
//                    "coordinates": [
//                        -122.5,
//                      47.51951934150781
//                    ],
//                    "type": "Point"
//                  },
//                  "type": "Feature"
//                }
//              }, function (err, res) {
//                console.log(err, res)
//                t.notOk(err)
//                t.ok(res)
//                t.end()
//              })
// })

// test('delete an existing place to the example dataset', function (t) {
//   places.delete({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId }, function (err, res) {
//     console.log(err, res)
//     t.notOk(err)
//     t.ok(res === '')
//     t.end()
//   })
// })

// test('delete our test dataset', function (t) {
//   datasets.delete({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET }, function (err, res) {
//     console.log(err, res)
//     t.notOk(err)
//     t.ok(res === '')
//     t.end()
//   })
// })
