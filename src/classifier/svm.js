import OneVsAll from './onevsall';
import BinarySVM from './binarysvm';
import LinAlg from '../math/linalg';
import Arrays from '../util/arrays';

/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification
 */
class SVM extends OneVsAll {
  /**
   * Constructor
   *
   * @see BinarySVM.constructor()
   *
   * @param dict optionsUser User-defined options for SVM. Options are passed to created BinarySVM
   *   objects. See BinarySVM.constructor() for more details
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

    // Set options
    this.optionsUser = optionsUser;
  }

  /**
   * @see OneVsAll.createClassifier()
   */
  createClassifier(classIndex) {
    const useClassIndices = this.training.labels.map(x => ((x === classIndex) ? 1 : 0));

    const classifier = new BinarySVM(this.optionsUser);
    classifier.loadTrainingData(this.training.features, useClassIndices, 1);

    return classifier;
  }

  /**
   * Train the multiclass SVM algorithm on a dataset
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */
  train(features, labels) {
    super.train(features, labels);

    this.trainBatch();
  }
}

export default SVM;
