var phantom = require('node-phantom');
console.log('boom');
phantom.create(function(err, ph) {
  console.log('testing', err);
  ph.exit();
});
