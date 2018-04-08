var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.param('status') === 'confirm') {
        res.render('users/signup-confirmation');
    } else {
        res.render('users/signup');
    }
});

module.exports = router;
