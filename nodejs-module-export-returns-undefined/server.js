const recursive = require('recursive-readdir');

exports.file = function() {
  recursive(__dirname, ['!*.md'], function(error, files) {
   var arr = [];
    for (var i = 0; i < files.length; i++) {
      arr.push(files[i]);
    }
    console.log(arr);
  });
};
exports.file();
