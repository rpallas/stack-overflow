var browserify = require('browserify')();
var fs = require('fs');

var lang = process.argv[2];
console.log('Doing something with the lang value: ', lang);

browserify.add('./client/app.js');
browserify.transform(require("jadeify"));
browserify
  .bundle()
  .pipe(fs.createWriteStream(__dirname + '/bundle.js'));

