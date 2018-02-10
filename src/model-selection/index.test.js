var expect = require('chai').expect;
var modelSelection = require('./index.js');
var arrays = require('../arrays/index.js');

describe('ModelSelect', function() {
  describe('.trainTestSplit', function() {
    it('should split the input arrays into the proportions indicated by the training set size parameter', function() {
      var A = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => [x, x * 10]);
      var B = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1];

      var [A_train, B_train, A_test, B_test] = modelSelection.trainTestSplit([A, B], { trainSize: 0.7 });

      expect(arrays.getShape(A_train)).to.deep.equal([7, 2]);
      expect(arrays.getShape(A_test)).to.deep.equal([3, 2]);
      expect(arrays.getShape(B_train)).to.deep.equal([7]);
      expect(arrays.getShape(B_test)).to.deep.equal([3]);
    });

    it('should should keep the indices of the train/test elements consistent across input arrays', function() {
      var A = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var B = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
      var C = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

      var [A_train, B_train, C_train, A_test, B_test, C_test] = modelSelection.trainTestSplit([A, B, C]);

      expect(A_train.filter((x, i) => B[x] != B_train[i]).length).to.equal(0);
      expect(A_train.filter((x, i) => C[x] != C_train[i]).length).to.equal(0);
      expect(A_test.filter((x, i) => B[x] != B_test[i]).length).to.equal(0);
      expect(A_test.filter((x, i) => C[x] != C_test[i]).length).to.equal(0);
    });

    it('should throw an error when the size of the input arrays is not equal in the first dimension', function() {
      expect(() => modelSelection.trainTestSplit([[0, 1], [0, 1, 2]])).to.throw();
    });
  });
});