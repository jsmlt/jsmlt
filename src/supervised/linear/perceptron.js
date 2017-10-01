// Internal dependencies
import { OneVsAllClassifier, Classifier } from '../base';
import * as LinAlg from '../../math/linalg';

/**
 * Perceptron learner for binary classification problem.
 */
export class BinaryPerceptron extends Classifier {
  /**
   * Get the signed value of the class index. Returns -1 for class index 0, 1 for class index 1.
   *
   * @param {number} classIndex - Class index
   * @return {number} Sign corresponding to class index
   */
  getClassIndexSign(classIndex) {
    return classIndex * 2 - 1;
  }

  /**
   * Get the class index corresponding to a sign.
   *
   * @param {number} sign - Sign
   * @return {number} Class index corresponding to sign
   */
  getSignClassIndex(sign) {
    return (sign + 1) / 2;
  }

  /**
   * @see {Classifier#train}
   */
  train(X, y) {
    // Weights increment to check for convergence
    this.weightsIncrement = Infinity;

    // Initialize weights vector to zero. Here, the number of weights equals one plus the number of
    // features, where the first weight (w0) is the weight used for the bias.
    this.weights = LinAlg.zeroVector(1 + X[0].length);

    // Store historic errors
    const epochNumErrors = [];

    // Iteration index
    let epoch = 0;

    // A single iteration of this loop corresponds to a single iteration of training all data
    // points in the data set
    while (true) {
      const [numErrors, weightsIncrement] = this.trainIteration(X, y);
      epochNumErrors.push(numErrors);

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
    let weightsIncrement = LinAlg.zeroVector(this.weights.length);

    // Initialize number of misclassified points
    let numErrors = 0;

    // Shuffle data points
    const [XUse, yUse] = LinAlg.permuteRows(X, y);

    // Loop over all datapoints
    for (let i = 0; i < XUse.length; i += 1) {
      // Transform binary class index to class sign (0 becomes -1 and 1 remains 1)
      const classSign = this.getClassIndexSign(yUse[i]);

      // Copy features vector so it is not changed in the datapoint
      const augmentedFeatures = XUse[i].slice();

      // Add feature with value 1 at the beginning of the feature vector to correpond with the
      // bias weight
      augmentedFeatures.unshift(1);

      // Calculate output
      const output = LinAlg.dot(augmentedFeatures, this.weights);

      // Check whether the point was correctly classified
      if (classSign * output <= 0) {
        // Increase the number of errors
        numErrors += 1;

        // Update the weights change to be used at the end of this epoch
        weightsIncrement = LinAlg.sum(weightsIncrement, LinAlg.scale(augmentedFeatures, classSign));
      }
    }

    // Take average of all weight increments
    this.weightsIncrement = LinAlg.scale(weightsIncrement, 0.01 / XUse.length);
    this.weights = LinAlg.sum(this.weights, this.weightsIncrement);

    return [numErrors, weightsIncrement];
  }

  /**
   * Check whether training has convergence when using iterative training using trainIteration.
   *
   * @return {boolean} Whether the algorithm has converged
   */
  checkConvergence() {
    return LinAlg.internalSum(LinAlg.abs(this.weightsIncrement)) < 0.0001;
  }

  /**
   * Make a prediction for a data set.
   *
   * @param {Array.Array.<number>} features - Features for each data point
   * @param {Object} [optionsUser] User-defined options
   * @param {string} [optionsUser.output = 'classLabels'] Output for predictions. Either
   *   "classLabels" (default, output predicted class label), "raw" (dot product of weights vector
   *   with augmented features vector) or "normalized" (dot product from "raw" but with unit-length
   *   weights)
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

    // Predictions
    const predictions = [];

    // Normalization factor for normalized output
    const weightsMagnitude = Math.sqrt(LinAlg.dot(this.weights, this.weights));

    // Loop over all datapoints
    for (let i = 0; i < features.length; i += 1) {
      // Copy features vector so it is not changed in the datapoint
      const augmentedFeatures = features[i].slice();

      // Add feature with value 1 at the beginning of the feature vector to correpond with the
      // bias weight
      augmentedFeatures.unshift(1);

      // Calculate output
      let output = LinAlg.dot(augmentedFeatures, this.weights);

      // Store prediction
      if (options.output === 'raw') {
        // Raw output: do nothing
      } else if (options.output === 'normalized') {
        // Normalized output
        output /= weightsMagnitude;
      } else {
        // Class label output
        output = this.getSignClassIndex(output > 0 ? 1 : -1);
      }

      predictions.push(output);
    }

    return predictions;
  }
}

/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification.
 */
export default class Perceptron extends OneVsAllClassifier {
  /**
   * Constructor. Initialize class members and store user-defined options.
   *
   * @param {Object} [optionsUser] User-defined options
   * @param {trackAccuracy} [optionsUser.trackAccuracy = false] Whether to track accuracy during the
   *   training process. This will let the perceptron keep track of the error rate on the test set
   *   in each training iteration
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      // Whether the number of misclassified samples should be tracked at each iteration
      trackAccuracy: false,
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    // Set options
    this.trackAccuracy = options.trackAccuracy;

    // Accuracy tracking
    if (this.trackAccuracy) {
      this.addListener('iterationCompleted', () => this.calculateIntermediateAccuracy());
    }
  }

  /**
   * @see {@link OneVsAll#createClassifier}
   */
  createClassifier(classIndex) {
    return new BinaryPerceptron();
  }

  /**
   * @see {@link Classifier#train}
   */
  train(X, y) {
    this.createClassifiers(y);

    if (this.trackAccuracy) {
      this.numErrors = [];
      this.trainIterative();
    } else {
      this.trainBatch(X, y);
    }
  }

  /**
   * Callback for calculating the accuracy of the classifier on the training set in intermediate
   * steps of training
   */
  calculateIntermediateAccuracy() {
    // Track number of errors
    const predictions = this.predict(this.training.features);
    this.numErrors.push(predictions.reduce((r, x, i) => r + (x !== this.training.labels[i]), 0));
  }
}
