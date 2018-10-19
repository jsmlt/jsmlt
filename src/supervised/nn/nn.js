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

export class NN extends Classifiers {
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
      numInputs: 10,
      numOutputs: 2,
      numEpochs: 20,
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    this.numInputs = options.numInputs;
    this.numOutputs = options.numOutputs;
    this.numEpochs = options.numEpochs;

    // Initialize to empty layers
    this.layers = [];
    this.weights = [];
  }

  initializeWeights() {
    // Initialize weights for each subsequent pair of layers
    for (let i = 0; i < this.layers.length - 1; i++) {
      // Initialize weights from this layer to the next layer to a random real number in the
      // range [0, 1]
      this.weights.push(
        Arrays.random([this.layers[i].length, this.layers[i + 1].length], -1, 1)
      );
    }
  }

  train(X, y) {
    this.initializeWeights();

    for (let i = 0; i < this.numEpochs; i++) {
      this.trainEpoch(X, y);
    }
  }

  trainEpoch(X, y) {
    // Shuffle data points
    const [XUse, yUse] = Arrays.shuffle(X, y);

    for (let i = 0; i < XUse.length; i += 1) {
      this.trainSingleSample(XUse[i].slice(), y[i]);
    }
  }

  trainSingleSample(x, y) {
    const [activations, outputs] = forwardPass(x);

    // Calculate deltas
    let deltas = this.layers.map(x => Arrays.zeros(x));

    for (let k = this.layers.length - 1; k > 0; k--) {
      for (let i = 0; i < this.layers[k]; i++) {
        // Last layer
        if (k == this.layers.length - 1) {
          activation = activations[k][i];
          output = outputs[k][i];
          target = (y == i);

          deltas[k][i] = activationFunctionDerivative(activation) * (output - target);
        }
        // Earlier layers
        else {
          output = outputs[k][i];
          target = (y == i);

          const nextDeltaSum = deltas[k + 1].reduce((r, a, j) => r + a * this.weights[k][i][j]);
          deltas[k][i] = activationFunctionDerivative(activation) * nextDeltaSum;
        }
      }
    }

    // Update weights
    for (let k = 0; k < this.layers.length - 1; k++) {
      for (let i = 0; i < this.layers[k]; i++) {
        for (let j = 0; j < this.layers[k + 1]; j++) {
          this.weights[k][i][j] -= this.learningRate * outputs[k][i][j] * deltas[k + 1][j];
        }
      }
    }
  }

  forwardPass(x) {
    if (x.length != this.numInputs) {
      throw new Error('Number of features of samples should match the number of network inputs.');
    }

    // Output and activations of nodes in each layer
    outputs = this.layers.map(x => Arrays.zeros(x));
    activations = this.layers.map(x => Arrays.zeros(x));

    // Fill the outputs of the first layer, and initialize the activations to an empty list
    outputs[0] = x.slice();
    activations[0] = [];

    // Propagate the inputs layer-by-layer
    for (let layer = 1; layer < this.layers.length; layer++) {
      // Calculate the activation and output of each node in the layer
      for (let node = 0; node < this.layers[layer].length; node++) {
        // Calculate the activation of the weighted sum of the inputs in the previous layer
        activations[layer][node] = outputs[k].reduce((r, a, i) => {
          return r + a * this.weights[layer - 1][i][node];
        }, 0);

        // Calculate the output of this node by applying the activation function to the activation
        outputs[layer][node] = this.activationFunction(activations[layer][node]);
      }
    }

    return [activations, outputs];
  }

  activationFunction(a) {
    return sigmoid(a);
  }

  activationFunctionDerivative(a) {
    return sigmoid(a) * (1 - sigmoid(a));
  }

  addLayer(numNodes) {
    this.layers.push(numNodes);
  }
}

/**
 * Perceptron learner for binary classification problem.
 */
export class BinaryNN extends Classifier {
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
    this.weights = Arrays.zeros(1 + X[0].length);

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
    let weightsIncrement = Arrays.zeros(this.weights.length);

    // Initialize number of misclassified points
    let numErrors = 0;

    // Shuffle data points
    const [XUse, yUse] = Arrays.shuffle(X, y);

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
      const output = Arrays.dot(augmentedFeatures, this.weights);

      // Check whether the point was correctly classified
      if (classSign * output <= 0) {
        // Increase the number of errors
        numErrors += 1;

        // Update the weights change to be used at the end of this epoch
        weightsIncrement = Arrays.sum(weightsIncrement, Arrays.scale(augmentedFeatures, classSign));
      }
    }

    // Take average of all weight increments
    this.weightsIncrement = Arrays.scale(weightsIncrement, 0.01 / XUse.length);
    this.weights = Arrays.sum(this.weights, this.weightsIncrement);

    return [numErrors, weightsIncrement];
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
    const weightsMagnitude = Math.sqrt(Arrays.dot(this.weights, this.weights));

    // Loop over all datapoints
    for (let i = 0; i < features.length; i += 1) {
      // Copy features vector so it is not changed in the datapoint
      const augmentedFeatures = features[i].slice();

      // Add feature with value 1 at the beginning of the feature vector to correpond with the
      // bias weight
      augmentedFeatures.unshift(1);

      // Calculate output
      let output = Arrays.dot(augmentedFeatures, this.weights);

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
