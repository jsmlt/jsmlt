var expect = require('chai').expect;
var LinearKernel = require('./linear.js');

describe('Kernel.LinearKernel', function() {
  describe('.apply', function() {
    it('should calculate the dot product of two input vectors', function() {
      expect((new LinearKernel()).apply([1, 2, 3], [4, 5, 6])).to.equal(32);
      expect((new LinearKernel()).apply([1, 2, 3], [4, 5, 0])).to.equal(14);
      expect((new LinearKernel()).apply([1, 2, 0], [4, 5, 6])).to.equal(14);
      expect((new LinearKernel()).apply([1, 2, -3], [4, 5, 6])).to.equal(-4);
    });
  });
});