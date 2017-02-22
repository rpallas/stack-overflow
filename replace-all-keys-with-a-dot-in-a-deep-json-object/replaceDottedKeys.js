const _ = require('lodash');

const data = {
  foo: {
    'bar.utf8': 'utf8 title foo.bar'
  },
  'baz$utf8': 'baz utf8'
};

_.mixin({
  deep: (map) => {
    return (data, callback) => {
      return map(_.mapValues(data,  (value) => {
        return _.isPlainObject(value) ? _.deep(map)(value, callback) : value;
      }), callback);
    }
  },
});

const result = _.deep(_.mapKeys)(data,  (val, key) => {
  return key.replace(/[.$]/, '_');
});
console.log(JSON.stringify(result, null, 2));
