var expect = require('chai').expect;
var metrics = require('./index.js');

describe('Metrics', function() {
  describe('.accuracy', function() {
    it('should return the accuracy for binary input vectors', function() {
      var yTrue = [0, 0, 1, 0, 0, 1, 1, 0, 0, 1];
      var yPred = [0, 1, 1, 0, 1, 0, 1, 0, 0, 1];
      expect(metrics.accuracy(yTrue, yPred)).to.equal(0.7);
    });

    it('should return the accuracy for multiclass input vectors', function() {
      var yTrue = [0, 0, 1, 2, 2, 1, 2, 0, 0, 1];
      var yPred = [0, 1, 1, 0, 1, 0, 2, 0, 0, 1];
      expect(metrics.accuracy(yTrue, yPred)).to.equal(0.6);
    });

    it('should support values of different types', function() {
      var yTrue = [5, 5, 'okay', 2.5, 2.5, 'okay', 2.5, 5, 5, 'okay'];
      var yPred = [5, 'okay', 'okay', 5, 'okay', 5, 2.5, 5, 5, 'okay'];
      expect(metrics.accuracy(yTrue, yPred)).to.equal(0.6);
    });

    it('should throw an error if different-length inputs are passed', function() {
      expect(() => metrics.accuracy([0, 1], [0, 1, 2])).to.throw();
    });
  });

  describe('.auroc', function() {
    it('should calculate the area under the ROC curve', function() {
      var yTrue = [0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1];
      var yPred = [0.3, 0.7, 0.2, 0.4, 0.6, 0.2, 0.7, 0.8, 0.1, 0.0, 0.9, 0.6, 0.9, 0.8, 0.95];
      expect(metrics.auroc(yTrue, yPred)).to.closeTo(0.866071, 1e-5);
    });

    it('should throw an error if different-length inputs are passed', function() {
      expect(() => metrics.auroc([0, 1], [0, 1, 1])).to.throw();
    });

    it('should throw an error if there are not exactly 2 classes in the true label vector', function() {
      expect(() => metrics.auroc([0], [0]).to.throw());
      expect(() => metrics.auroc([0, 1, 2], [0, 0, 0]).to.throw());
    });

    it('should throw an error if the true classes are not integers 0 and 1', function() {
      expect(() => metrics.auroc([0, 2], [0, 0]).to.throw());
      expect(() => metrics.auroc(['0', '1'], [0, 0]).to.throw());
    });

    it('should throw an error if the prediction confidences are not between 0 and 1 (inclusive)', function() {
      expect(() => metrics.auroc([0, 1], [-0.1, 0]).to.throw());
      expect(() => metrics.auroc([0, 1], [1.1, 0]).to.throw());
    });
  });
});