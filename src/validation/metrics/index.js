// Standard imports
import * as Arrays from '../../arrays';

/**
 * Evaluate the accuracy of a set of predictions.
 *
 * @param {Array.<mixed>} yTrue - True labels
 * @param {Array.<mixed>} yPred - Predicted labels
 * @param {boolean} [normalize = true] - Whether to normalize the accuracy to a range between
 *   0 and 1. In this context, 0 means no predictions were correct, and 1 means all predictions
 *   were correct. If set to false, the integer number of correct predictions is returned
 * @return {number} Proportion of correct predictions (if normalize=true) or integer number of
 *   correct predictions (if normalize=false)
 */
export function accuracy(yTrue, yPred, normalize = true) {
  // Check input lengths
  if (yTrue.length !== yPred.length) {
    throw new Error('Number of true labels must match number of predicted labels.');
  }

  // Count the number of correctly classified points
  const numCorrect = yTrue.reduce((r, a, i) => r + ((a === yPred[i]) ? 1 : 0), 0);

  // If specified, normalize the accuracy to a number between 0 and 1
  if (normalize) {
    return numCorrect / yTrue.length;
  }

  return numCorrect;
}

/**
 * Calculate the area under the receiver-operator characteristic curve (AUROC) for a set of
 * predictions. Area is calculated using the Trapezoidal rule.
 *
 * @param {Array.<number>} yTrue - True labels. Must contain only integers 0 and 1
 * @param {Array.<mixed>} yPred - Predicted label confidences. Must be between 0 (fully confident
 *   in negative prediction) and 1 (fully confident in positive prediction), both inclusive
 * @return {number} Calculated AUROC
 */
export function auroc(yTrue, yPred) {
  // Check input lengths
  if (yTrue.length !== yPred.length) {
    throw new Error('Number of true labels must match number of predicted labels.');
  }

  // Check number of classes
  const numClasses = Arrays.unique(yTrue).length;

  if (numClasses != 2) {
    throw new Error('Number of classes in true label vector must be exactly 2.');
  }

  // Check class labels
  if (!yTrue.includes(0) || !yTrue.includes(1)) {
    throw new Error('True labels must be integers 0 and 1.');
  }

  // Check prediction confidence values
  if (!yPred.every(x => x >= 0 && x <= 1)) {
    throw new Error('Prediction confidence values must be between 0 and 1 (inclusive).');
  }
  
  // Sort the prediction probabilities descendingly to get a list of all possible thresholds
  const sortedIndices = Arrays.argSort(yPred, (a, b) => b - a);

  // To find the false positive rate and true positive rate, we need to know the number of negatives
  // and positives, respectively, in the true labels list
  const numNegative = yTrue.filter(x => x === 0).length;
  const numPositive = yTrue.filter(x => x === 1).length;

  // Keep track of number of false positives and true positives. Initialize them with threshold 1,
  // such that all examples are predicted to be negative
  let fp = 0;
  let tp = 0;

  // List of false positive rates and true positive rates. The false positive rate and true positive
  // rate at all indices i form pairs
  const fprs = [0];
  const tprs = [0];

  // Loop over all possible thresholds and calculate the tpr/fpr
  var thresholdIndexPrevious = -1;

  sortedIndices.forEach((thresholdIndex) => {
    if (yTrue[thresholdIndex] === 0) {
      fp += 1;
    } else {
      tp += 1;
    }

    if (thresholdIndexPrevious >= 0 && yPred[thresholdIndex] === yPred[thresholdIndexPrevious]) {
      fprs.splice(-1, 1);
      tprs.splice(-1, 1);
    }

    fprs.push(fp / numNegative);
    tprs.push(tp / numPositive);

    thresholdIndexPrevious = thresholdIndex;
  });

  // The area under the ROC curve is calculated by taking the area under each pair of points that
  // follow each other on the x-axis. For each pair of points, the area under the trapezoid spanned
  // by the points and the corresponding points on the x-axis is used as the area.

  const fprsDiff = Arrays.sum(
    Arrays.scale(fprs.slice(0, -1), -1),
    fprs.slice(1),
  );

  const tprsMean = Arrays.scale(
    Arrays.sum(
      tprs.slice(0, -1),
      tprs.slice(1),
    ),
    0.5
  );

  return fprsDiff.reduce((r, a, i) => r + a * tprsMean[i], 0);
}
