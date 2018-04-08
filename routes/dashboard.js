var express = require('express')
 , router = express.Router()
 , url = require('url')
 , http = require('http')
 , app = express()
 , jwt = require('jsonwebtoken')
 , secret = process.env.SECRET
 , config = require('config')
 , fs = require('fs')
 , statusCodes = require('../config/statusCodes.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    var user;
    try {
         user = jwt.verify(req.cookies.authJwt, config.secret);
    } catch (err) {
        res.redirect('/login')
    }
    
    // Removes the starting forward slash and .html extension from URL
    var page = req.originalUrl.replace("\/", "").replace(".html", "")
    // Ignores anything after the '#' and '?' charachters
    .replace(/#.*$/,'').replace(/\?.*$/,'').replace(/\/.*$/,'');
    //displays page variable in console if in development mode
    if (app.get('env') === 'development') {
        console.dir("URL:  "+page);
    }
    page = (page === '') ? 'index' : page;
    // Calls the corresponding .jade page
    fs.stat('./views/pages/'+page+'.jade', function(err, stat) {
        if(err == null) {
            res.render("pages/"+page, { 
                projectTitle: require("../package.json").projectTitle,
                version: require("../package.json").version,
                quotes: require('../plugins/messages.js').getString(),
                songIDs: require('../plugins/audioPlayer.js')
            });
        } else if(err.code == 'ENOENT') {
            // file does not exist
                var err = new Error('Not Found');
                err.name= 404;
                note: statusCodes[err.name];
                res.status(404);
                //console.error('404\; page not found');
                res.render('./errors/error', { title: err.name, error: err, note: statusCodes[err.name] });
        } else {
                // file does not exist
                var err = new Error('Unknown');
                err.name= '???';
                res.render('./errors/error', { title: err.name, error: err, note: statusCodes[err.name] });
        }
    });

});
module.exports = router;