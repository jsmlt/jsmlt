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
 * Calculate the area under the receiver-operator curve (AUROC) for a set of predictions. Area is
 * calculated using the Trapezoidal rule.
 *
 * @param {Array.<mixed>} yTrue - True labels
 * @param {Array.<mixed>} yPred - Predicted labels
 * @return {number} Calculated AUROC
 */
export function auroc(yTrue, yPred) {
  if (yTrue.length !== yPred.length) {
    throw new Error('Number of true labels must match number of predicted labels.');
  }
  
  // Sort the prediction probabilities to get a list of all possible thresholds
  const sortedIndices = Arrays.argSort(yPred, (a, b) => a - b);

  // To find the false positive rate and true positive rate, we need to know the number of negatives
  // and positives, respectively, in the true labels list
  const numNegative = yTrue.filter(x => x === 0).length;
  const numPositive = yTrue.filter(x => x === 1).length;

  // Keep track of number of false positives and true positives. Initialize them with threshold 0
  let fp = numNegative;
  let tp = numPositive;

  // List of fals positive rates and true positive rates. The false positive rate and true positive
  // rate at all indices i form pairs
  const fprs = [1];
  const tprs = [1];

  // Loop over all possible thresholds and calculate the tpr/fpr
  sortedIndices.forEach((thresholdIndex) => {
    if (yTrue[thresholdIndex] === 0) {
      fp -= 1;
    } else {
      tp -= 1;
    }

    // Add the newly calculated tpr/fpr pair to the lists
    fprs.push(fp / numNegative);
    tprs.push(tp / numPositive);
  });

  // The area under the ROC curve is calculated by taking the area under each pair of points that
  // follow each other on the x-axis. For each pair of points, the area under the trapezoid spanned
  // by the points and the corresponding points on the x-axis is used as the area.

  const fprsDiff = Arrays.sum(
    fprs.slice(0, -1),
    Arrays.scale(fprs.slice(1), -1),
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
