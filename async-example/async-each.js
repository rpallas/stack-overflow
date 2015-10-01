var async = require('async');
var arr = { values: ['1', '2', '3', '4', '5'] };    

async.each(arr.values, function(element, callback) {
  async.setImmediate(function () {
    console.log(element);
    callback();
  });
}, function() {
  console.log('Excecute this after.');
});
