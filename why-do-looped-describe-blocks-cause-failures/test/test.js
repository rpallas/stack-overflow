var implementations = [ 'first', 'second', 'third' ]

for(i in implementations) {
  var name = implementations[i],
      path = "../js/components/fancy_" + name

  jest.dontMock(path)
  func = require(path)

  describe(name + " implementation", function() {
    it("does things", function() {
      expect(func()).toBe("one with the world")
    })
  })
}
