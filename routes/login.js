var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/login');
});

router.get('/two-step', function(req, res, next) {
  res.render('users/two-step');
});

router.get('/password-recovery', function(req, res, next) {
  res.render('users/password-recovery');
});

module.exports = router;
