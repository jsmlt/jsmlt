/* eslint import/prefer-default-export: "off" */

// Local imports
import * as Arrays from '../util/arrays';

/**
 * Split a dataset into a training and a test set
 *
 * @param Array input List of input arrays. The input arrays should have the same length (i.e., they
 *   should have the same first dimension size)
 * @param dict optionsUser User-defined options. See method implementation for details
 * @return Array List of output arrays. The number of elements is 2 times the number of input
 *   elements. For each input element, a pair of output elements is returned.
 *
 * Example usage:
 *     X = [{ n x d array of features }]
 *     y = [{ n x 1 array of labels}]
 *
 *     [X_train, y_train, X_test, y_test] = trainTestSplit([X, y])
 *
 *  Now, X_train and y_train will contain the features and labels of the training set, respectively,
 *  and X_test and y_test will contain the features and labels of the test set.
 */
export function trainTestSplit(input, optionsUser = {}) {
  // Options
  const optionsDefault = {
    /**
     * Size of the training set. If int, this exact number of training samples is used. If float,
     * the total number of elements times the float number is used as the number of training
     * elements.
     *
     * @var int|float
     */
    trainSize: 0.8,
  };

  const options = {
    ...optionsDefault,
    ...optionsUser,
  };

  // Total number of elements
  const numElements = input[0].length;

  // Check whether all input data sets have the same size
  if (!input.every(x => x.length === input[0].length)) {
    throw new Error(`All input arrays should have the same length (i.e., the size of their
      first dimensions should be the same`);
  }

  // Generate list of all possible array indices
  const indices = [...Array(numElements).keys()];

  // Number of training elements
  const numTrainElements = Math.round(numElements * options.trainSize);

  // Take a random sample from the list of possible indices, which are then used as the indices
  // of the elements to use for the training data
  const trainIndices = Arrays.sample(indices, numTrainElements);

  // Create resulting training and test sets
  const trainArrays = input
    .map(trainArray =>
      trainArray
      .filter((x, i) => trainIndices.includes(i))
      .map(x => (Array.isArray(x) ? x.slice() : x))
    );

  const testArrays = input
    .map(testArray =>
      testArray
      .filter((x, i) => !trainIndices.includes(i))
      .map(x => (Array.isArray(x) ? x.slice() : x))
    );

  // Return train and test sets
  return [...trainArrays, ...testArrays];
}
