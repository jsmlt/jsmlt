import Classifier from './classifier';
import BinaryPerceptron from './binaryperceptron';
import LinAlg from '../math/linalg';
import Arrays from '../util/arrays';

/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification
 */
class PerceptronOld extends Classifier {
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
      trackAccuracy: false, // Whether the number of misclassified samples should be tracked
                            // at each iteration
    };

    const options = Object.assign({}, optionsDefault, optionsUser);

    // Set options
    this.trackAccuracy = options.trackAccuracy;
  }

  /**
   * Train the Perceptron algorithm on a dataset
   */
  train(features, labels) {
    // Check to make sure number of labels matches number of feature sets
    if (features.length !== labels.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Get unique labels
    const classIndices = labels.map(label => this.getOrCreateLabelClassIndex(label));
    const uniqueClassIndices = Array.from(new Set(classIndices));

    this.training.features = features;
    this.training.labels = classIndices;

    // Initialize label set and classifier for all labels
    this.classifiers = uniqueClassIndices.map((classIndex) => {
      const useClassIndices = classIndices.map(x => ((x === classIndex) ? 1 : 0));

      const classifier = new BinaryPerceptron();
      classifier.loadTrainingData(features, useClassIndices, 1);
      classifier.initializeWeights();

      return classifier;
    });

    // Do 1-vs-all classification. This step is separated from initializing and loading the data to
    // account for the option of classifying iteration-wise to be able to store intermediate results
    const converged = LinAlg.valueVector(false);
    let numConverged = 0;

    let epoch = 0;
    const numErrorsLog = [];

    while (true) {
      // Loop over all 1-vs-all classifiers
      for (const classIndex of uniqueClassIndices) {
        if (converged[classIndex]) {
          continue;
        }

        // Run a single iteration for the classifier
        const [numErrors, weightsIncrement] = this.classifiers[classIndex].trainIteration();

        // Check for convergence
        if (LinAlg.internalSum(LinAlg.abs(weightsIncrement)) < 0.0001) {
          converged[classIndex] = true;
          numConverged += 1;
        }
      }

      if (this.trackAccuracy) {
        // Track number of errors
        const predictions = this.predict(features);
        numErrorsLog.push(predictions.reduce((r, x, i) => r + (x !== classIndices[i]), 0));

        epoch += 1;
      }

      if (numConverged === this.classifiers.length || epoch > 100) {
        break;
      }
    }

    if (this.trackAccuracy) {
      this.numErrors = numErrorsLog;
    }
  }

  /**
   * Make a prediction for a data set
   *
   * @param Array[Array[mixed]] Features for each data point
   * @return Array[Integer] Predictions. For each data point the class label is either -1 or 1
   */
  predict(features) {
    if (this.weights === null) {
      throw new Error('Model has to be trained in order to make predictions.');
    }

    if (features[0].length !== this.training.features[0].length) {
      throw new Error('Number of features of test data should match number of features of training data.');
    }

    // Get predictions from all classifiers for all data points by predicting all data points with
    // each classifier (getting an array of predictions for each classifier) and transposing
    const datapointsPredictions = LinAlg.transpose(this.classifiers.map(x => x.predict(features, { output: 'normalized' })));

    // Form final prediction by taking index of maximum normalized classifier output
    return datapointsPredictions.map(x => Arrays.argMax(x));
  }
}

export default PerceptronOld;
