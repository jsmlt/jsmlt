var expect = require('chai').expect;
var search = require('./index.js');

describe('Util.Search', function() {
  describe('.binaryIntervalSearch', function() {
    it('should throw an error when the input value is larger than all elements in the array', function() {
      expect(() => search.binaryIntervalSearch([-9, -5, 8, 12], 15)).to.throw();
    });

    it('should throw an error when the input value is equal to the largest element in the array', function() {
      expect(() => search.binaryIntervalSearch([-9, -5, 8, 12], 12)).to.throw();
    });

    it('should throw an error when the input value is smaller than all elements in the array', function() {
      expect(() => search.binaryIntervalSearch([-9, -5, 8, 12], -10)).to.throw();
    });

    it('should return the index of the element equal to the input value when such an element exists', function() {
      expect(search.binaryIntervalSearch([-9, -5, 8, 12], 8)).to.equal(2);
    });

    it('should return the index of the last element equal to the input value when the input value occurs multiple times in the list', function() {
      expect(search.binaryIntervalSearch([-9, -5, 8, 8, 8, 12], 8)).to.equal(4);
    });

    it('should return the index of the interval in which an element lies when it lies strictly within the interval', function() {
      var A = [-10, -5, 0, 5, 10];
      expect(search.binaryIntervalSearch(A, -7)).to.equal(0);
      expect(search.binaryIntervalSearch(A, -2)).to.equal(1);
      expect(search.binaryIntervalSearch(A, 2)).to.equal(2);
      expect(search.binaryIntervalSearch(A, 7)).to.equal(3);
    });
  });
});