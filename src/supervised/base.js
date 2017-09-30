// Standard imports
import * as LinAlg from '../math/linalg';
import * as Arrays from '../util/arrays';

/**
 * Base class for supervised estimators (classifiers or regression models).
 */
export class Estimator {
  /**
   * Train the supervised learning algorithm on a dataset.
   *
   * @abstract
   *
   * @param {Array.<Array.<number>>} X - Features per data point
   * @param {Array.<mixed>} y Class labels per data point
   */
  train(X, y) { throw new Error('Method must be implemented child class.'); }

  /**
   * Make a prediction for a data set.
   *
   * @abstract
   *
   * @param {Array.<Array.<number>>} X - Features for each data point
   * @return {Array.<mixed>} Predictions. Label of class with highest prevalence among k nearest
   *   neighbours for each sample
   */
  test(X) { throw new Error('Method must be implemented child class.'); }
}

/**
 * Base class for classifiers.
 */
export class Classifier extends Estimator {
}

export class OneVsAllClassifier extends Classifier {
  /**
   * Create a binary classifier for one of the classes.
   *
   * @abstract
   *
   * @param {number} classIndex - Class index of the positive class for the binary classifier
   * @return {BinaryClassifier} Binary classifier
   */
  createClassifier(classIndex) { throw new Error('Method must be implemented child class.'); }

  /**
   * Create all binary classifiers. Creates one classifier per class.
   *
   * @param {Array.<number>} y - Class labels for the training data
   */
  createClassifiers(y) {
    // Get unique labels
    const uniqueClassIndices = Array.from(new Set(y));

    // Initialize label set and classifier for all labels
    this.classifiers = uniqueClassIndices.map((classIndex) => {
      const classifier = this.createClassifier();

      return {
        classIndex,
        classifier,
      };
    });
  }

  /**
   * Train all binary classifiers one-by-one
   *
   * @param {Array.<Array.<number>>} X - Features per data point
   * @param {Array.<mixed>} y Class labels per data point
   */
  trainBatch(X, y) {
    this.classifiers.forEach((classifier) => {
      const yOneVsAll = y.map(classIndex => ((classIndex === classifier.classIndex) ? 1 : 0));
      classifier.classifier.train(X, yOneVsAll);
    });
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
   * @see {Classifier#predict}
   */
  predict(X) {
    // Get predictions from all classifiers for all data points by predicting all data points with
    // each classifier (getting an array of predictions for each classifier) and transposing
    const datapointsPredictions = LinAlg.transpose(this.classifiers.map(classifier => classifier.classifier.predict(X, { output: 'normalized' })));

    // Form final prediction by taking index of maximum normalized classifier output
    return datapointsPredictions.map(x => Arrays.argMax(x));
  }
}
