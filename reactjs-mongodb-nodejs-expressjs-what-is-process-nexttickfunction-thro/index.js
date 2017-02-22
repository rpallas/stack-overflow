function doSomething (foo) {
  setTimeout(function () {
    console.log(foo.obj.hi);
  }, 1);
}

doSomething({ obj: { hi: 'hi...'} });
