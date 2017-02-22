var Calc = {};
require('fs').readdirSync(__dirname).forEach(function (file) {
  if (file !== 'index.js') {
    var fileName = file.replace('.js', '');
    Calc[fileName] = require('./' + fileName);
  }
});
export Calc;

