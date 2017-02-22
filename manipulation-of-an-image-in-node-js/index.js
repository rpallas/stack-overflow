// obtain an image object:
require('lwip').open('Example.jpg', function(err, image){
  // check err...
  // define a batch of manipulations and save to disk as JPEG:
  image.batch()
    .contain(image.height(), image.width(), 'black')
    .writeFile('output.jpg', function(err){
      // check err...
      // done.
      console.log(err || 'Done');
    });
});
