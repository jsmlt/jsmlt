var expect = require('chai').expect;
var SigmoidKernel = require('./sigmoid.js');

describe('Kernel.SigmoidKernel', function() {
  describe('.apply', function() {
    it('should calculate the Sigmoid kernel with gamma 0.01 and no bias when called with default parameters', function() {
      expect((new SigmoidKernel()).apply([1, 2], [3, 4])).to.closeTo(0.10955847021, 1e-5);
    });

    it('should correctly calculate the Sigmoid kernel with custom parameters', function() {
      var kernel = new SigmoidKernel({
        gamma: 0.1,
        coef0: 1,
      });
      expect(kernel.apply([1, 2], [3, 4])).to.closeTo(0.97045193661, 1e-5);
    });
  });
});