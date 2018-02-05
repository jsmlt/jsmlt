var assert = require('assert');
var arrays = require('./index.js');

describe('Arrays', function() {
  describe('.dot', function() {
    it('should calculate the dot product of two vectors', function() {
      assert.equal(arrays.dot([1, 2, 3], [4, 5, 6]), 32);
      assert.equal(arrays.dot([1, 2, 3], [4, 5, 0]), 14);
      assert.equal(arrays.dot([1, 2, 0], [4, 5, 6]), 14);
      assert.equal(arrays.dot([1, 2, -3], [4, 5, 6]), -4);
    });
  });

  describe('.scale', function() {
    it('should scale a vector', function() {
      assert.deepEqual(arrays.scale([-1, 2, 3], -2), [2, -4, -6]);
      assert.deepEqual(arrays.scale([-1, 2, 3], 0), [0, 0, 0]);
      assert.deepEqual(arrays.scale([-1, 2, 3], 1), [-1, 2, 3]);
      assert.deepEqual(arrays.scale([-1, 2, 3], 2), [-2, 4, 6]);
    });

    it('should scale a multidimensional array', function() {
      assert.deepEqual(arrays.scale([[1, 2, 3], [-4, -5, -6]], -2), [[-2, -4, -6], [8, 10, 12]]);
      assert.deepEqual(arrays.scale([[1, 2, 3], [-4, -5, -6]], 0), [[0, 0, 0], [0, 0, 0]]);
      assert.deepEqual(arrays.scale([[1, 2, 3], [-4, -5, -6]], 1), [[1, 2, 3], [-4, -5, -6]]);
      assert.deepEqual(arrays.scale([[1, 2, 3], [-4, -5, -6]], 2), [[2, 4, 6], [-8, -10, -12]]);
    });
  });

  describe('.flatten', function() {
    it('should not modify a 1-dimensional array', function() {
      var A = [8, 2, 7, 2, 6, 1, 3, 4, 3, 3, 8, 7];
      var B = arrays.flatten(A);

      assert.deepEqual(A, B);
    });

    it('should correctly flatten a multidimensional array', function() {
      var A = [[[8, 2, 7], [2, 6, 1]], [[3, 4, 3], [3, 8, 7]]];
      var B = arrays.flatten(A);

      assert.deepEqual(B, [8, 2, 7, 2, 6, 1, 3, 4, 3, 3, 8, 7]);
    });
  });

  describe('.reshape', function() {
    it('should correctly reshape a vector to a multidimensional shape', function() {
      var A = [8, 2, 7, 2, 6, 1, 3, 4, 3, 3, 8, 7];
      var shape = [3, 4];
      var B = arrays.reshape(A, shape);

      assert.deepEqual(arrays.flatten(B), arrays.flatten(A));
      assert.deepEqual(arrays.getShape(B), shape);
    });

    it('should correctly reshape a vector to a multidimensional shape with one-dimensions', function() {
      var A = [8, 2, 7, 2, 6, 1, 3, 4, 3, 3, 8, 7];
      var shape = [3, 1, 4, 1, 1];
      var B = arrays.reshape(A, shape);

      assert.deepEqual(arrays.flatten(B), arrays.flatten(A));
      assert.deepEqual(arrays.getShape(B), shape);
    });

    it('should correctly reshape a multidimensional shape to a vector', function() {
      var A = [[8, 2, 7], [2, 6, 1], [3, 4, 3], [3, 8, 7]];
      var shape = [12];
      var B = arrays.reshape(A, shape);

      assert.deepEqual(arrays.flatten(B), arrays.flatten(A));
      assert.deepEqual(arrays.getShape(B), shape);
    });

    it('should correctly reshape a multidimensional shape to another multidimensional shape', function() {
      var A = [[8, 2, 7], [2, 6, 1], [3, 4, 3], [3, 8, 7]];
      var shape = [2, 2, 3];
      var B = arrays.reshape(A, shape);

      assert.deepEqual(arrays.flatten(B), arrays.flatten(A));
      assert.deepEqual(arrays.getShape(B), shape);
    });
  });
});