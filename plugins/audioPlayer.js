var request = require('request');

request({url: 'http://api.soundcloud.com/resolve.json?url='+
    'https://soundcloud.com/brysontiller/bryson-tiller-let-me-explain-prod-by-phonix'+'/tracks&client_id='+ '530e9a47c54f79c1a8652555c18a0b47', json: true}, function(err, res, json) {
  if (err) {
    throw err;
  }
  //console.log(json.id);
});