import Classifier from './classifier';
import LinAlg from '../math/linalg';
import Arrays from '../util/arrays';

class OneVsAll extends Classifier {
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

    /**
     * List of classifiers. One classifier per class label/index
     *
     * @var Array
     */
    this.classifiers = [];

    /**
     * Event listeners bound to the canvas
     *
     * @var Map
     */
    this.listeners = new Map();
  }

  /**
   * Create a binary classifier for one of the classes
   *
   * @param int classIndex Class index of the positive class for the binary classifier
   * @return BinaryClassifier Binary classifier
   */
  createClassifier(classIndex) {
    return null;
  }

  /**
   * Create all binary classifiers. Creates one classifier per class
   */
  createClassifiers() {
    // Get unique labels
    const uniqueClassIndices = Array.from(new Set(this.training.labels));

    // Initialize label set and classifier for all labels
    this.classifiers = uniqueClassIndices.map((classIndex) => {
      const classifier = this.createClassifier(classIndex);
      return classifier;
    });
  }

  /**
   * Train all binary classifiers one-by-one
   */
  trainBatch() {
    this.classifiers.forEach(x => x.train());
  }

  /**
   * Train all binary classifiers iteration by iteration, i.e. start with the first training
   * iteration for each binary classifier, then execute the second training iteration for each
   * binary classifier, and so forth. Can be used when one needs to keep track of information per
   * iteration, e.g. accuracy
   */
  trainIterative() {
    let remainingClassIndices = Array.from(new Set(this.training.labels));

    let epoch = 0;

    while (epoch < 100 && remainingClassIndices.length > 0) {
      const remainingClassIndicesNew = remainingClassIndices.slice();

      // Loop over all 1-vs-all classifiers
      for (const classIndex of remainingClassIndices) {
        // Run a single iteration for the classifier
        this.classifiers[classIndex].trainIteration();

        if (this.classifiers[classIndex].checkConvergence()) {
          remainingClassIndicesNew.splice(remainingClassIndicesNew.indexOf(classIndex), 1);
        }
      }

      remainingClassIndices = remainingClassIndicesNew;

      // Emit event the outside can hook into
      this.emit('iterationCompleted');

      epoch += 1;
    }

    // Emit event the outside can hook into
    this.emit('converged');
  }

  /**
   * Initialize data and classifiers for training the multiclass algorithm on a dataset. Inheriting
   * classes should call this super function, followed by a call to trainBatch, trainIterative or a
   * custom training method
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */
  train(features, labels) {
    // Check to make sure number of labels matches number of feature sets
    if (features.length !== labels.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Store data points
    this.training.features = features;
    this.training.labels = labels.map(x => this.getOrCreateLabelClassIndex(x));

    this.createClassifiers();
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
    return datapointsPredictions.map(x => this.getClassIndexLabel(Arrays.argMax(x)));
  }

  /**
   * Add an event listener for events of some type emitted from this object
   *
   * @param label Event
   * @param callback Callback function
   */
  addListener(label, callback) {
    if (!this.listeners.has(label)) {
      this.listeners.set(label, []);
    }

    this.listeners.get(label).push(callback);
  }

  /**
   * Remove a previously added event listener for events of some type emitted from this object
   *
   * @param label Event
   * @param callback Callback function
   */
  removeListener(label, callback) {
    const listeners = this.listeners.get(label);

    if (listeners) {
      this.listeners.set(label, listeners.filter(
        x => !(typeof x === 'function' && x === callback)
      ));
    }
  }

  /**
   * Emit an event, which triggers the listener callback functions bound to it
   *
   * @param label Event
   * @param ...args Remaining arguments contain arguments that should be passed to the
   *                callback functions
   */
  emit(label, ...args) {
    const listeners = this.listeners.get(label);

    if (listeners) {
      listeners.forEach((listener) => { listener(...args); });
      return true;
    }

    return false;
  }
}

export default OneVsAll;
