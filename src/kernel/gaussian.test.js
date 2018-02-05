var expect = require('chai').expect;
var GaussianKernel = require('./gaussian.js');

describe('Kernel.GaussianKernel', function() {
  describe('.apply', function() {
    it('should calculate the Gaussian kernel with variance 1 when called with default parameters', function() {
      expect((new GaussianKernel()).apply([1, 2], [3, 4])).to.closeTo(0.01831563888, 1e-5);
    });

    it('should correctly calculate the Gaussian kernel with custom variance', function() {
      expect((new GaussianKernel(2)).apply([1, 2], [3, 4])).to.closeTo(0.13533528323, 1e-5);
    });

    it('should return 1 when a point is compared to itself', function() {
      expect((new GaussianKernel()).apply([1, 2], [1, 2])).to.closeTo(1, 1e-5);
    });
  });
});