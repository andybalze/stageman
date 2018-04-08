var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/terms', function(req, res, next) {
  res.render('policies/terms', {});
});
router.get('/privacy', function(req, res, next) {
  res.render('policies/privacy', {});
});
module.exports = router;
