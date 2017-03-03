var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test-mongo-id');

var Cat = mongoose.model('Cat', { _id: Number, name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  console.log(err || 'meow');
  Cat.find({}, function (err, cats) {
    cats.forEach(function(cat){
      console.log('cat: ', cat);
    });
  });
});


