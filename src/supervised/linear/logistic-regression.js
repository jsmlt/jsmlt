// Internal dependencies
import { OneVsAllClassifier, Classifier } from '../base';
import * as Arrays from '../../arrays';

/**
 * Calculate the logit function for an input
 *
 * @param {number} x - Input number
 * @return {number} Output of logit function applied on input
 */
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

/**
 * Logistic Regression learner for binary classification problem.
 */
export class BinaryLogisticRegression extends Classifier {
  /**
   * @see {Classifier#train}
   */
  train(X, y) {
    // Weights increment to check for convergence
    this.weightsIncrement = Infinity;

    // Initialize weights vector to zero. Here, the number of weights equals one plus the number of
    // features, where the first weight (w0) is the weight used for the bias.
    this.weights = Arrays.zeros(1 + X[0].length);

    // Iteration index
    let epoch = 0;

    // A single iteration of this loop corresponds to a single iteration of training all data
    // points in the data set
    while (true) {
      const weightsIncrement = this.trainIteration(X, y);

      if (weightsIncrement.reduce((r, a) => r + Math.abs(a), 0) < 0.0001 || epoch > 100) {
        break;
      }

      epoch += 1;
    }
  }

  /**
   * Train the classifier for a single iteration on the stored training data.
   *
   * @param {Array.<Array.<number>>} X - Features per data point
   * @param {Array.<mixed>} y Class labels per data point
   */
  trainIteration(X, y) {
    // Initialize the weights increment vector, which is used to increment the weights in each
    // iteration after the calculations are done.
    let weightsIncrement = Arrays.zeros(this.weights.length);

    // Shuffle data points
    const [XUse, yUse] = Arrays.permuteRows(X, y);

    // Loop over all datapoints
    for (let i = 0; i < XUse.length; i += 1) {
      // Copy features vector so it is not changed in the datapoint
      const augmentedFeatures = XUse[i].slice();

      // Add feature with value 1 at the beginning of the feature vector to correpond with the
      // bias weight
      augmentedFeatures.unshift(1);

      // Calculate weights increment
      weightsIncrement = Arrays.sum(
        weightsIncrement,
        Arrays.scale(
          augmentedFeatures,
          yUse[i] - sigmoid(Arrays.dot(this.weights, augmentedFeatures))
        )
      );
    }

    // Take average of all weight increments
    this.weightsIncrement = Arrays.scale(weightsIncrement, 0.5);
    this.weights = Arrays.sum(this.weights, this.weightsIncrement);

    return weightsIncrement;
  }

  /**
   * Check whether training has convergence when using iterative training using trainIteration.
   *
   * @return {boolean} Whether the algorithm has converged
   */
  checkConvergence() {
    return Arrays.internalSum(Arrays.abs(this.weightsIncrement)) < 0.0001;
  }

  /**
   * Make a prediction for a data set.
   *
   * @param {Array.Array.<number>} features - Features for each data point
   * @param {Object} [optionsUser] User-defined options
   * @param {string} [optionsUser.output = 'classLabels'] Output for predictions. Either
   *   "classLabels" (default, output predicted class label), "raw", or "normalized" (both returning
   *   the sigmoid of the dot product of the feature vector and unit-length weights)
   * @return {Array.<number>} Predictions. Output dependent on options.output, defaults to class
   *   labels
   */
  predict(features, optionsUser = {}) {
    // Options
    const optionsDefault = {
      output: 'classLabels', // 'classLabels', 'normalized' or 'raw'
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    // Probabilistic predictions
    const predictionsProba = this.predictProba(features);

    if (options.output === 'raw' || options.output === 'normalized') {
      // Probability of positive class is the raw output
      return predictionsProba.map(x => x[1]);
    }

    // Calculate binary predictions
    const predictions = [];

    for (let i = 0; i < predictionsProba.length; i += 1) {
      predictions.push(predictionsProba[i][1] >= 0.5 ? 1 : 0);
    }

    return predictions;
  }

  /**
   * Make a probabilistic prediction for a data set.
   *
   * @param {Array.Array.<number>} features - Features for each data point
   * @return {Array.Array.<number>} Probability predictions. Each array element contains the
   *   probability of the negative (0) class in the first element, and the probability of the
   *   positive (1) class in the second element
   */
  predictProba(features) {
    // Predictions
    const predictions = [];

    // Normalization factor for normalized output
    const weightsMagnitude = Math.sqrt(Arrays.dot(this.weights, this.weights));

    // Loop over all datapoints
    for (let i = 0; i < features.length; i += 1) {
      // Copy features vector so it is not changed in the datapoint
      const augmentedFeatures = features[i].slice();

      // Add feature with value 1 at the beginning of the feature vector to correpond with the
      // bias weight
      augmentedFeatures.unshift(1);

      // Calculate probability of positive class
      const output = Arrays.dot(augmentedFeatures, this.weights);
      const posProb = sigmoid(output / weightsMagnitude);

      // Add pair of probabilities to list
      predictions.push([1 - posProb, posProb]);
    }

    return predictions;
  }
}

/**
 * Logistic Regression learner for 2 or more classes. Uses 1-vs-all classification.
 */
export default class LogisticRegression extends OneVsAllClassifier {
  /**
   * @see {@link OneVsAll#createClassifier}
   */
  createClassifier(classIndex) {
    return new BinaryLogisticRegression();
  }

  /**
   * @see {@link Classifier#train}
   */
  train(X, y) {
    this.createClassifiers(y);
    this.trainBatch(X, y);
  }
}
