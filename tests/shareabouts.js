var test = require('tape')
var config = require('../config')
var subset = require('json-subset')
var auth = require('../lib/shareabouts/auth')(config)
var datasets = require('../lib/shareabouts/datasets')(config)
var places = require('../lib/shareabouts/places')(config)
var submissions = require('../lib/shareabouts/submissions')(config)

// Our dataset for testing, which should not already exist
var TEST_DATASET = config.dataset || 'example'
var TEST_HOST = config.host || 'http://127.0.0.1:8001/api/v2/'
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

// TODO: Only create the new test dataset if it doesn't already exist
// and/or delete the test dataset if the test fails
// (helpful if the test fails after we create the dataset)
test('create a new test dataset', function (t) {
  datasets.post({
    username: USERNAME,
    password: PASSWORD,
    body: {
      "display_name": TEST_DATASET,
      "slug": TEST_DATASET,
      "owner": TEST_HOST + USERNAME
    }
  }, function (err, res) {
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

test('get all datasets', function (t) {
  datasets.list({ username: USERNAME, password: PASSWORD }, function (err, res) {
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

test('get one dataset', function (t) {
  datasets.get({ slug: TEST_DATASET, username: USERNAME, password: PASSWORD }, function (err, res) {
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

test('Update our dataset to contain special permissions', function (t) {
  datasets.put({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET,
                 body: {
                   "display_name": "new display name",
                   "slug": TEST_DATASET,
                   "owner": TEST_HOST + USERNAME
                 }
               }, function (err, res) {
                 t.notOk(err)
                 t.ok(res)
                 t.end()
               })
})

test('get places from test dataset', function (t) {
  places.list({ username: USERNAME, slug: TEST_DATASET }, function (err, res) {
    t.notOk(err)
    t.ok(res)
    t.end()
  })
})

var placeBody = {
  "properties": {
    "description": "my description is here",
    "location_type": "observation",
    "private-submitter_email": "email@email.com",
    "name": "hey Joe",
    "user_token": "user:7",
    "visible": true
  },
  "geometry": {
    "coordinates": [
        -122.5,
      47.5195
    ],
    "type": "Point"
  },
  "type": "Feature"
}
var examplePlaceId
test('post a place to the example dataset', function (t) {
  places.post({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET,
                body: placeBody
              }, function (err, res) {
                console.log(err, res)
                t.notOk(err)
                t.ok(res)
                examplePlaceId = res.id
                t.end()
              })
})

// Checking to ensure that our place is the same
// NOTE: We are using JSON.parse because Shareabouts API (or our request module) is not returning valid JSON
test('get a place', function (t) {
  places.getPrivate({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.ok(subset(placeBody, JSON.parse(res)))
    t.end()
  })
})

placeBody['properties'].description = "I am changing my description"
test('update our previously added place to the example dataset', function (t) {
  places.put({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId,
               body: placeBody
             }, function (err, res) {
               console.log(err, res)
               t.notOk(err)
               t.ok(res)
               t.end()
             })
})

/*
 * Checking whether our update was successful
 */
test('get a place', function (t) {
  places.getPrivate({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.ok(subset(placeBody, JSON.parse(res)))
    t.end()
  })
})

/*
 * POST a comment to a place
 */
var commentBody = {
  comment: "hey this is a commment!",
  submitter_name: "joe blow",
  user_token: "user:123",
  visible: true
}
var commentId
test('POST a comment', function (t) {
  submissions.post({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId, submissionSetName: 'comments', body: commentBody }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    commentId = res.id
    t.end()
  })
})


/*
 * GET a comment from a place
 */
// TODO: why does `submission.get` return `res` as string but `submission.put` returns `res` as object?
test('GET a comment', function (t) {
  submissions.get({ username: USERNAME, slug: TEST_DATASET, placeId: examplePlaceId, submissionSetName: 'comments', submissionId: commentId }, function (err, res) {
    console.log(err, res)
    res2 = res
    t.notOk(err)
    t.ok(res)
    t.ok(subset(commentBody, JSON.parse(res)))
    t.end()
  })
})

/*
 * PUT a comment to a place
 */
commentBody.comment = "This is an updated comment!"
test('PUT a comment', function (t) {
  submissions.put({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId, submissionSetName: 'comments', submissionId: commentId, body: commentBody }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res)
    t.ok(subset(commentBody, res))
    t.end()
  })
})

/*
 * DELETE a comment from a place
 */
test('DELETE a comment', function (t) {
  submissions.delete({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId, submissionSetName: 'comments', submissionId: commentId }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res === '')
    t.end()
  })
})

/*
 * DELETE our test place
 */

test('delete an existing place to the example dataset', function (t) {
  places.delete({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET, placeId: examplePlaceId }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res === '')
    t.end()
  })
})

test('delete our test dataset', function (t) {
  datasets.delete({ username: USERNAME, password: PASSWORD, slug: TEST_DATASET }, function (err, res) {
    console.log(err, res)
    t.notOk(err)
    t.ok(res === '')
    t.end()
  })
})
