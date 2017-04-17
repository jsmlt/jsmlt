import BinaryClassifier from './binaryclassifier';
import LinAlg from '../math/linalg';

/**
 * Perceptron learner for binary classification problem.
 */
class BinaryPerceptron extends BinaryClassifier {
  constructor() {
    super();

    this.weights = null;
  }

  /**
   * Initialize weights vector to zero. Here, the number of weights equals one plus the number of
   * features, where the first weight (w0) is the weight used for the bias.
   */
  initializeWeights() {
    this.weights = LinAlg.zeroVector(1 + this.training.features[0].length);
  }

  /**
   * Get the signed value of the class index. Returns -1 for class index 0, 1 for class index 1
   *
   * @param int classIndex Class index
   * @return int Sign corresponding to class index
   */
  getClassIndexSign(classIndex) {
    return classIndex * 2 - 1;
  }

  /**
   * Get the class index corresponding to a sign
   *
   * @param int sign Sign
   * @return int Class index corresponding to sign
   */
  getSignClassIndex(sign) {
    return (sign + 1) / 2;
  }

  /**
   * Train the Perceptron algorithm on a dataset
   *
   * @param Array[Array[Number]] features Optional. Features per data point. If null, uses features
   *   and labels stored using loadTrainingData. Defaults to null
   * @param Array[mixed] labels Optional. Class labels per data point. If null, uses features and
   *   labels stored using loadTrainingData. Defaults to null
   * @param bool positiveClass Optional. Whether a specific class should be marked as the positive
   *   class. Relevant for output like "raw" or "normalized" where one wants to know to which class
   *   each side of the boundary corresponds. Defaults to null
   */
  train(features = null, labels = null, positiveClass = null) {
    if (features !== null && labels !== null) {
      // Load training data
      this.loadTrainingData(features, labels, positiveClass);
    }

    // Weights increment to check for convergence
    this.weightsIncrement = Infinity;

    // Initialize weights vector to zero
    this.initializeWeights();

    // Store historic errors
    const epochNumErrors = [];

    // Iteration index
    let epoch = 0;

    // A single iteration of this loop corresponds to a single iteration of training all data
    // points in the data set
    while (true) {
      const [numErrors, weightsIncrement] = this.trainIteration();
      epochNumErrors.push(numErrors);

      if (weightsIncrement.reduce((r, a) => r + Math.abs(a), 0) < 0.0001 || epoch > 100) {
        break;
      }

      epoch += 1;
    }
  }

  /**
   * Train the classifier for a single iteration on the stored training data
   */
  trainIteration() {
    // Initialize the weights increment vector, which is used to increment the weights in each
    // iteration after the calculations are done.
    let weightsIncrement = LinAlg.zeroVector(this.weights.length);

    // Initialize number of misclassified points
    let numErrors = 0;

    // Shuffle data points
    const [features, labels] = LinAlg.permuteRows(this.training.features, this.training.labels);

    // Loop over all datapoints
    for (let i = 0; i < this.training.features.length; i += 1) {
      // Transform binary class index to class sign (0 becomes -1 and 1 remains 1)
      const classSign = this.getClassIndexSign(labels[i]);

      // Copy features vector so it is not changed in the datapoint
      const augmentedFeatures = features[i].slice();

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
    this.weightsIncrement = LinAlg.scale(weightsIncrement, 0.01 / this.training.features.length);
    this.weights = LinAlg.sum(this.weights, this.weightsIncrement);

    return [numErrors, weightsIncrement];
  }

  /**
   * Check whether training has convergence when using iterative training using trainIteration
   *
   * @return bool Whether the algorithm has converged
   */
  checkConvergence() {
    return LinAlg.internalSum(LinAlg.abs(this.weightsIncrement)) < 0.0001;
  }

  /**
   * Make a prediction for a data set
   *
   * @param Array[Array[mixed]] Features for each data point
   * @param Object optionsUser Optional. Additional options:
   *    @prop string output Output for predictions. Either "classLabels" (default, output predicted
   *       class label), "raw" (dot product of weights vector with augmented features vector) or
   *       "normalized" (dot product from "raw" but with unit-length weights)
   *
   * @return Array[mixed] Predictions. Output dependent on options.output, defaults to class labels
   */
  predict(features, optionsUser = {}) {
    // Options
    const optionsDefault = {
      output: 'classLabels', // 'classLabels', 'normalized' or 'raw'
    };

    const options = Object.assign({}, optionsDefault, optionsUser);

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
        predictions.push(this.getClassIndexLabel(this.getSignClassIndex(output > 0 ? 1 : -1)));
      }

      predictions.push(output);
    }

    return predictions;
  }
}

export default BinaryPerceptron;
