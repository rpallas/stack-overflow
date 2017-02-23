var Async = require('async');
var Es = require('event-stream');
var Fs = require('fs');
var JSONStream = require('JSONStream');
var MongoClient = require('mongodb').MongoClient;
var Path = require('path');
var Xml2Json = require('xml2json-stream');

var filePath = Path.join(__dirname, 'data/data.xml');
var xmlParser = new Xml2Json.Parser('product');

Async.auto({
  db: function (callback) {
    console.log('opening db connection');
    MongoClient.connect('mongodb://localhost:27017/buffer-test', callback);
  },
  loadData: ['db', function (results, callback) {
    load(results.db, callback);
  }],
  cleanUp: ['db', 'loadData', function (results, callback) {
    console.log('closing db connection');
    results.db.close(callback);
  }]
}, function (err) {
  console.log(err || 'Done');
});

var load = function (db, callback) {
  console.log('loading data');
  Fs.createReadStream(filePath)
    .pipe(xmlParser)
    .pipe(JSONStream.parse())
    .pipe(batch(2))
    // .pipe(log)
    .pipe(insert(db).on('end', callback));
};

var insert = function (db) {
  return Es.map(
    function (data, callback) {
      console.log('data: ', data);
      if (data.length) {
        var bulk = db.collection('products').initializeUnorderedBulkOp();
        data.forEach(function (doc) {
          bulk.insert(doc);
        });
        bulk.execute(callback);
      } else {
        callback();
      }
    }
  );
};

var log = Es.map(
  function (data, callback) {
    console.log('data: ', data);
    callback(null, data);
  }
);

var batch = function (batchSize) {
  batchSize = batchSize || 1000;
  var batch = [];

  return Es.through(
    function write (data) {
      batch.push(data);
      if (batch.length === batchSize) {
        this.emit('data', batch);
        batch = [];
      }
    },
    function end () {
      if (batch.length) {
        this.emit('data', batch);
        batch = [];
      }
      this.emit('end');
    }
  );
};
