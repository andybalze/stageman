var express = require('express')
  , router = express.Router()
  , jwt = require('jsonwebtoken')
  , bodyParser = require('body-parser')
  , config = require('config')
  , knex = require('../config/knexfile.js')
  , parseUrlencoded = bodyParser.urlencoded({ extended: false})
  , secret = config.secret
  , Random = require("random-js")
  , random = new Random(Random.engines.mt19937().autoSeed());

router.post('/users/create', parseUrlencoded, function(req, res, next) {
  var user = req.body;
  var randomInt = random.integer(0, 2147483647)
  var userToken = createUser(user, randomInt);
  res.status(201).json(userToken);
});

router.post('/users/verify', parseUrlencoded, function(req, res, next) {
  var user = req.body;
  knex.select('').from('users').where(knex.raw('username = ? AND password = ?', [user.username, user.password]))
  .then(function(row) {
    var user = row[0];
    console.log(user.id);
    return res.status(200).json({token:generateToken(user)});
  })
  .catch( function(err) {
    console.error(err);
    return res.status(403).json({status:'403',message:'Login credentials incorrect'});
  });
});

router.post('/users/validate', parseUrlencoded, function(req, res, next) {
  var user = req.body;
  knex.select('').from('users').where(knex.raw('username = ?', [user.username]))
  .then(function(row) {
    if(row[0]) {
      return res.status(200).json({valid:'false'});
    } else {
      return res.status(200).json({valid:'true'});
    }
  });
});

function createUser(user, id) {
  console.log(user);
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
   month = (month < 10 ? "0" : "") + month;
  var day  = date.getDate();
   day = (day < 10 ? "0" : "") + day;
  var userToEncode = {
    id:id,
    email:user.email,
    fullName:user.fullName,
    nickName:user.nickName,
    createDate:''+year+'-'+month+'-'+day,
    username:user.username,
    password:user.password,
    status:user.status
  };
  knex.insert(userToEncode).into('users').then( function() {
    var token = generateToken(userToEncode);
    return token;
  }).catch( function(err) {
    console.log(err);
  });
}

function generateToken(user) {
  return jwt.sign(user,secret);
}

function validateToken(token) {
  var user;
  try {
    user = jwt.verify(token,secret);
    
  }
  catch (err) {
    return err;
  }
  return user;
}

module.exports = router;