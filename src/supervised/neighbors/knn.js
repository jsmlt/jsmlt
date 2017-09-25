// Internal dependencies
import Neighbors from './base';
import LinAlg from '../../math/linalg';
import Arrays from '../../util/arrays';

/**
 * k-nearest neighbours learner. Classifies points based on the (possibly weighted) vote
 * of its k nearest neighbours (euclidian distance)
 */
class KNN extends Neighbors {
  /**
   * Constructor
   *
   * @param dict optionsUser User-defined options for KNN. See method implementation for details
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      // Number of nearest neighbours to consider for the majority vote
      numNeighbours: 3,
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    // Set options
    this.numNeighbours = options.numNeighbours;
  }

  /**
   * @see jsmlt.supervised.base.Classifier::train()
   */
  train(X, y) {
    if (X.length !== y.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Store data points
    this.training = { X, y };
  }

  /**
   * @see jsmlt.supervised.base.Classifier::predict()
   */
  predict(X) {
    if (typeof this.training === 'undefined') {
      throw new Error('Model has to be trained in order to make predictions.');
    }

    if (X[0].length !== this.training.X[0].length) {
      throw new Error('Number of features of test data should match number of features of training data.');
    }

    // Make prediction for each data point
    const predictions = X.map(x => this.predictSample(x));

    return predictions;
  }

  /**
   * Make a prediction for a single sample
   *
   * @param Array[mixed] sampleFeatures Data point features
   * @return mixed Prediction. Label of class with highest prevalence among k nearest neighbours
   */
  predictSample(sampleFeatures) {
    // Calculate distances to all other data points
    const distances = Arrays.zipWithIndex(
      this.training.X.map(
        x => LinAlg.norm(LinAlg.sum(sampleFeatures, LinAlg.scale(x, -1)))
      )
    );

    // Sort training data points based on distance
    distances.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });

    // Number of nearest neighbours to consider
    const k = Math.min(this.numNeighbours, distances.length);

    // Take top k distances
    const distancesTopKClasses = distances.slice(0, k).map(x => this.training.y[x[1]]);

    // Count the number of neighbours per class
    const votes = Arrays.valueCounts(distancesTopKClasses);

    // Get class index with highest number of votes
    let highest = -1;
    let highestLabel = -1;

    votes.forEach((vote) => {
      if (vote[1] > highest) {
        highest = vote[1];
        highestLabel = vote[0];
      }
    });

    return highestLabel;
  }
}

export default KNN;
