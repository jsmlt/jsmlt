var expect = require('chai').expect;
var PolynomialKernel = require('./polynomial.js');

describe('Kernel.PolynomialKernel', function() {
  describe('.apply', function() {
    it('should calculate the Polynomial kernel  with gamma 1, no bias and of degree 2 when called with default parameters', function() {
      expect((new PolynomialKernel()).apply([1, 2], [3, 4])).to.closeTo(121, 1e-5);
    });

    it('should correctly calculate the Polynomial kernel with custom parameters', function() {
      var kernel = new PolynomialKernel({
        gamma: 3,
        coef0: 2,
        degree: 4,
      });
      expect(kernel.apply([1, 2], [3, 4])).to.closeTo(1500625, 1e-5);
    });
  });
});