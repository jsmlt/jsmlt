import OneVsAll from './onevsall';
import BinaryPerceptron from './binaryperceptron';
import LinAlg from '../math/linalg';
import Arrays from '../util/arrays';

/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification
 */
class Perceptron extends OneVsAll {
  /**
   * Constructor
   *
   * @param dict optionsUser User-defined options for perceptron
   */
  constructor(optionsUser = {}) {
    super();

    /**
     * Object to store training data
     *
     * @var dict
     */
    this.training = {
      features: [],
      labels: [],
    };

    /**
     * List of classifiers. One classifier per class label/index
     *
     * @var Array
     */
    this.classifiers = [];

    /**
     * Number of errors per iteration. Only used if accuracy tracking is enabled
     *
     * @var bool
     */
    this.numErrors = null;

    // Parse options
    const optionsDefault = {
      trackAccuracy: true, // Whether the number of misclassified samples should be tracked
                            // at each iteration
    };

    const options = Object.assign({}, optionsDefault, optionsUser);

    // Set options
    this.trackAccuracy = options.trackAccuracy;

    // Accuracy tracking
    if (this.trackAccuracy) {
      this.addListener('iterationCompleted', () => this.calculateIntermediateAccuracy());
    }
  }

  /**
   * @see OneVsAll.createClassifier()
   */
  createClassifier(classIndex) {
    const useClassIndices = this.training.labels.map(x => ((x === classIndex) ? 1 : 0));

    const classifier = new BinaryPerceptron();
    classifier.loadTrainingData(this.training.features, useClassIndices, 1);
    classifier.initializeWeights();

    return classifier;
  }

  /**
   * Train the multiclass Perceptron algorithm on a dataset
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */
  train(features, labels) {
    super.train(features, labels);

    if (this.trackAccuracy) {
      this.numErrors = [];
      this.trainIterative();
    } else {
      this.trainBatch();
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

export default Perceptron;
