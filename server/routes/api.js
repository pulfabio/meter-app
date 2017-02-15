const express = require('express');
const router = express.Router();
const fs = require('fs'); //file system module
const path = require('path');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bodyParser = require('body-parser');
var dbUrl = "mongodb://localhost:27017/meter-app";
var mongo = require("mongodb").MongoClient;

// Parsers for POST data
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

var superSecret = "ilmiosegreto"; //authorization secret

//REAL AUTHENTICATION ROUTE - WITH DB
// route to authenticate a user (POST http://localhost:3001/api/login)
router.post('/login', function(req, res) {

  //find the user
  mongo.connect(dbUrl, function(err, db) {
    if (err) throw err;
    db.collection("users").findOne({
      username: req.body.username
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, superSecret/*app.get('superSecret')*/, {
            expiresIn: "24h" // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            auth_token: token
          });
        }

      }

    })
  })
});

// route middleware to verify a token - implemented AFTER the authentication route
//because we don't want to secure that, but before the get methods,
//which need to be secured
router.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  //var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var token = req.get('Authorization').substring(7);

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, superSecret/*app.get('superSecret')*/, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    console.log(req.header);
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

//Next routes are secured by the middleware above.

//Real Elettr Meter dashboard route
router.get('/meters/elettr', (req, res) => {
  mongo.connect(dbUrl, function(err, db) {
    if (err) throw err;
    db.collection("meters").aggregate([
      { $match: { tipo: "elettrico" } },
      { $group: { _id: "$livello", numero: { $sum: 1 } } },
      { $sort: { livello: 1 } }
    ]).toArray(function(err, results) {
      if (err) throw err;
      res.send(results);
      db.close();
    })
  })
})

//Real Gas Meter dashboard route
router.get('/meters/gas', (req, res) => {
  mongo.connect(dbUrl, function(err, db) {
    if (err) throw err;
    db.collection("meters").aggregate([
      { $match: { tipo: "gas" } },
      { $group: { _id: "$livello", numero: { $sum: 1 } } },
      { $sort: { livello: 1 } }
    ]).toArray(function(err, results) {
      if (err) throw err;
      res.send(results);
      db.close();
    })
  })
})

//Real meter details route
router.get('/meters/details/:livello', (req,res) => {
  var liv = req.params.livello;
  mongo.connect(dbUrl, function(err, db) {
    if (err) throw err;
    db.collection("meters").find({
      livello: liv
    }).toArray(function(err, docs) {
      if (err) throw err;
      res.send(docs);
      db.close();
    })
  })
})

module.exports = router;

//AUTHENTICATION ROUTE - WITH DB - mongoose style
// route to authenticate a user (POST http://localhost:3001/api/login)
// router.post('/login', function(req, res) {

//   //find the user
//   User.findOne({
//     name: req.body.name
//   }, function(err, user) {

//     if (err) throw err;

//     if (!user) {
//       res.json({ success: false, message: 'Authentication failed. User not found.' });
//     } else if (user) {

//       // check if password matches
//       if (user.password != req.body.password) {
//         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//       } else {

//         // if user is found and password is right
//         // create a token
//         var token = jwt.sign(user, superSecret/*app.get('superSecret')*/, {
//           expiresIn: "24h" // expires in 24 hours
//         });

//         // return the information including token as JSON
//         res.json({
//           success: true,
//           message: 'Enjoy your token!',
//           token: token
//         });
//       }

//     }

//   });
// });

//MOCKED AUTHENTICATION ROUTE - WITH SiMPLE JSON FILE
// router.post('/login', function(req, res) {
//   var user;
//   fs.readFile(path.join(__dirname, "/../users.json"), "utf8", function(err, data) {
//     if (!err) {
//       data = JSON.parse(data);
//       for (var i = 0; i < data.data.length; i++) {
//         var item = data.data[i];
//         if (item.username === req.body.username) {
//           user = item;
//         }
//       }
//     } else {
//       throw err;
//     }
//     if (!user) {
//       res.json({ success: false, message: 'Authentication failed. User not found.' });
//     } else if (user) {

//       // check if password matches
//       if (user.password != req.body.password) {
//         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//       } else {

//         // if user is found and password is right
//         // create a token
//         var token = jwt.sign(user, superSecret/*app.get('superSecret')*/, {
//           expiresIn: "24h" // expires in 24 hours
//         });

//         // return the information including token as JSON
//         res.json({
//           success: true,
//           message: 'Enjoy your token!',
//           auth_token: token
//         });
//       }

//     }

//   });
// });

// Mocked Meter dashboard route
// router.get('/meters/main', (req, res) => {
//   fs.readFile(path.join(__dirname, "../meters.js"), "utf8", function(err, data) {
//     if (!err) {
//       res.json(data);
//     } else {
//       throw err;
//     }
//   })

// })

// Mocked Meter details route
// router.get('/meters/details', (req,res) => {
//   fs.readFile(path.join(__dirname, "../details.js"), "utf8", function(err, data) {
//     if (!err) {
//       res.json(data);
//     } else {
//       throw err;
//     }
//   })
// })

