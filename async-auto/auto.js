async.auto({
    A: function(callback){
      callback(null, 'A data');
    },
    B: ['A', function(callback, results){
      // do something with results.A;
      callback(null, 'B data');
    }],
    C: ['A', function(callback, results){
      // do something with results.A;
      callback(null, 'C data');
    }],
    D: ['A', 'B', function(callback, results){
      // do something with results.A and results.B;
      callback(null, 'D data');
    }],
    E: ['A', 'C', function(callback, results){
      // do something with results.A and results.C;
      callback(null, 'E data');
    }]

}, function(err, results) {
    console.log('err = ', err);
});
