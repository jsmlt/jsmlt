import Classifier from './classifier';
import LinAlg from '../math/linalg';

/**
 * Binary classifier base class, intended to be extended by binary classifiers that support
 * callback via a OneVsAll classifier.
 */
class BinaryClassifier extends Classifier {
  constructor() {
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
  }

  /**
   * Load training data from arrays and store it in the class
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   * @param bool positiveClass Optional. Whether a specific class should be marked as the positive
   *   class. Relevant for output like "raw" or "normalized" where one wants to know to which class
   *   each side of the boundary corresponds. Defaults to null
   */
  loadTrainingData(features, labels, positiveClass = null) {
    // Check to make sure number of labels matches number of feature sets
    if (features.length !== labels.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Format labels
    const uniqueLabels = Array.from(new Set(labels));

    if (uniqueLabels.length > 2) {
      throw new Error('No more than 2 unique class labels should be passed to a BinaryClassifier. Two class labels are distinct if their string representations are inequal.');
    }

    if (positiveClass !== null
      && uniqueLabels.includes(positiveClass)
      && uniqueLabels.length === 2
      ) {
      this.getOrCreateLabelClassIndex(uniqueLabels[1 - uniqueLabels.indexOf(positiveClass)]);
    }

    // Store data points
    this.training.features = features;
    this.training.labels = labels.map(x => this.getOrCreateLabelClassIndex(x));
  }
}

export default BinaryClassifier;
