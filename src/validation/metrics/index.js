/* eslint import/prefer-default-export: "off" */

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
