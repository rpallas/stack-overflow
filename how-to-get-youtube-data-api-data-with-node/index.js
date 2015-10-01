var request = require('request');

request.get('http://www.google.com', function(err, header, body){
    if (err) throw err
    console.log(body);
});
