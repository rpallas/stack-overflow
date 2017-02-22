var async = require('async');

// var opts = {times : 25, interval : 60000};
// async.retry(opts,function(callback){ console.log("XXXX"); return callback(new Error("sda")); },function(err){ callback(err); });

var count = 0;
var functionData = { some: 'data' };
var myFunction = function(callback, results) {
  console.log(++count);
  process.nextTick(function() {
    if (count < 5) {
      return callback({ message: 'this failed' }, null);
    }
    callback(null, { message: 'this succeeded' });
  });
};

var vikasFunction = function(callback){ console.log("XXXX"); return callback(new Error("sda")); };

async.retry({times : 25, interval : 1000}, vikasFunction.bind(functionData), function(err, results) {
  console.log("===================================");
  console.log("Async function finished processing");
});
