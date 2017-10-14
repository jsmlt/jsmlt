// Internal dependencies
import Clusterer from '../base';
import * as LinAlg from '../../math/linalg';
import * as Arrays from '../../util/arrays';
/**
 * k-means clusterer.
 */
export default class KMeans extends Clusterer {
  /**
   * Constructor. Initialize class members and store user-defined options.
   *
   * @param {Object} [optionsUser] - User-defined options for KNN
   * @param {number} [optionsUser.numClusters = 8] - Number of clusters to assign in total
   * @param {string} [optionsUser.initialization = 'random'] - Initialization procedure for cluster
   *   centers. Either 'random', for randomly selecting (without replacement) a datapoint for each
   *   cluster center
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      numClusters: 2,
      initialization: 'random',
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    // Set options
    this.numClusters = options.numClusters;
    this.initialization = options.initialization;
  }

  /**
   * @see {@link Clusterer#train}
   */
  train(X) {
    // Number of features per sample
    this.numSamples = LinAlg.getShape(X)[0];
    this.numFeatures = LinAlg.getShape(X)[1];

    // Check whether there aren't more clusters than samples
    if (this.numSamples < this.numClusters) {
      throw new Error(`Too many clusters (numClusters=${this.numClusters}) for the number for the
        number of samples (numSamples=${this.numSamples}). The number of clusters should be equal to
        or greater than the number of samples.`);
    }

    // Initialize cluster centroids
    if (this.initialization === 'random') {
      // Get indices [0, ..., n-1] for n datapoints
      const indices = [...Array(this.numSamples)].map((x, i) => i);

      // Sample a random index (without replacement) for each cluster, and use its features as
      // the initial centroid for that cluster
      this.centroids = Arrays.sample(indices, this.numClusters).map(x => X[x]);
    }

    let assignments = [];
    let assignmentsPrevious;

    let epoch = 0;

    do {
      // Recalculate clusters
      if (assignments.length > 0) {
        // For each cluster, calculate the new centroid as the mean of the features of all samples
        // assigned to that cluster
        this.centroids = this.centroids.map((centroid, clusterId) => {
          const clusterNumSamples = assignments.filter(x => x === clusterId).length;

          // If there are no samples assigned to this cluster, keep the centroid the same. This
          // is to prevent unstable behaviour from happening
          if (clusterNumSamples === 0) {
            return centroid;
          }

          // The new cluster centroid is the mean of all samples assigned this cluster
          return LinAlg.scale(
            // Sum of all assigned samples
            LinAlg.sum(
              ...(X.filter((x, i) => assignments[i] === clusterId))
            ),

            // Divide by the number of assignments
            1 / clusterNumSamples,
          );
        });
      }

      // Store previous assignments
      assignmentsPrevious = assignments.slice();

      // Assign clusters to samples
      assignments = this.cluster(X);
      epoch += 1;
    } while (!Arrays.equal(assignments, assignmentsPrevious) && epoch < 100);
  }

  /**
   * @see {@link Clusterer#cluster}
   */
  cluster(X) {
    return X.map(x =>
      // Minimize distance to centroid by maximizing negative squared distance
      Arrays.argMax(
        // Calculate negative squared distance from sample to centroid
        this.centroids.map(centroid => -LinAlg.norm(LinAlg.sum(centroid, LinAlg.scale(x, -1))))
      )
    );
  }
}
