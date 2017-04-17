import Classifier from './classifier';
import LinAlg from '../math/linalg';
import Arrays from '../util/arrays';

/**
 * k-nearest neighbours learner. Classifies points based on the (possibly weighted) vote
 * of its k nearest neighbours (euclidian distance)
 */
class KNN extends Classifier {
  constructor(numNeighbours = 3) {
    super();

    /**
     * Object to store training data
     *
     * @var dict
     */
    this.training = {
      features: [],
      labels: []
    };

    /**
     * Number of nearest neighbours to consider for the majority vote
     *
     * @var int
     */
    this.numNeighbours = numNeighbours;
  }

  /**
   * Train the KNN algorithm on a dataset
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */
  train(features, labels) {
    if (features.length !== labels.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Store data points
    this.training.features = features;
    this.training.labels = labels;
  }

  /**
   * Make a prediction for a data set
   *
   * @param Array[Array[mixed]] Features for each data point
   * @return Array[mixed] Predictions. Label of class with highest prevalence among k nearest
   *   neighbours for each sample
   */
  predict(features) {
    if (this.training.features.length === 0) {
      throw new Error('Model has to be trained in order to make predictions.');
    }

    if (features[0].length !== this.training.features[0].length) {
      throw new Error('Number of features of test data should match number of features of training data.');
    }

    // Make prediction for each data point
    const predictions = features.map(x => this.predictSample(x));

    return predictions;
  }

  /**
   * Make a prediction for a single sample
   *
   * @param Array[mixed] Data point features
   * @return mixed Prediction. Label of class with highest prevalence among k nearest neighbours
   */
  predictSample(sampleFeatures) {
    // Calculate distances to all other data points
    const distances = Arrays.zipWithIndex(
      this.training.features.map(
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
    const distancesTopKClasses = distances.slice(0, k).map(x => this.training.labels[x[1]]);

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
