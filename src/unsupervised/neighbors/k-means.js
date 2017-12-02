// Internal dependencies
import Clusterer from '../base';
import * as Arrays from '../../arrays';
import * as Random from '../../random';

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
   *   cluster center, or 'kmeans++', for initializing cluster centroids with the
   *   [kmeans++ procedure](https://en.wikipedia.org/wiki/K-means%2B%2B)
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      numClusters: 2,
      initialization: 'kmeans++',
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
   * Initialize the centroids of each of the clusters based on the user's settings
   *
   * @param {Array.<Array.<number>>} X - Features per data point
   */
  initializeCentroids(X) {
    if (this.initialization === 'kmeans++') {
      // Clear list of centroids
      this.centroids = [];

      // Get indices [0, ..., n-1] for n datapoints
      let indices = [...Array(this.numSamples)].map((x, i) => i);

      for (let i = 0; i < this.numClusters; i += 1) {
        let weights;

        if (this.centroids.length) {
          // Step 1. Compute the distance of each sample to the nearest cluster centroid
          const minDistances = indices.map(x =>
            // Minimize distance to nearest centroid by maximizing negative squared distance
            Math.min(
              // Calculate negative squared distance from sample to each centroid
              ...this.centroids.map(centroid =>
                Arrays.norm(Arrays.sum(centroid, Arrays.scale(X[x], -1)))
              )
            )
          );

          if (minDistances.filter(x => x > 0).length > 0) {
            // Step 2a. Calculate squared distances, which will be used as the weights for sampling
            // a data point for the new cluster centroid
            weights = Arrays.power(minDistances, 2);
          } else {
            // Step 2b. If all remaining samples have distance 0 to the nearest cluster centroid,
            // there are (too many) samples with the exact same coordinates. This is a rare case.
            // However, it can happen, for example when you have 3 clusters and 3 samples, and 2 of
            // the samples have the same features
            weights = 'uniform';
          }
        } else {
          weights = 'uniform';
        }

        // Step 4. Choose a data point from the remaining data points at random, with the computed
        // sample weights. Use it as the new cluster centroid, and remove it from the list of
        // potential cluster centroids
        const sampleIndex = Random.sample(indices, 1, false, weights)[0];
        this.centroids.push(X[sampleIndex]);
        indices = indices.filter(x => x !== sampleIndex);
      }
    } else {
      // Random initialization. Each centroid is chosen randomly without replacement from the data
      // points

      // Get indices [0, ..., n-1] for n datapoints
      const indices = [...Array(this.numSamples)].map((x, i) => i);

      // Sample a random index (without replacement) for each cluster, and use its features as
      // the initial centroid for that cluster
      this.centroids = Random.sample(indices, this.numClusters).map(x => X[x]);
    }
  }

  /**
   * @see {@link Clusterer#train}
   */
  train(X) {
    // Number of features per sample
    this.numSamples = Arrays.getShape(X)[0];
    this.numFeatures = Arrays.getShape(X)[1];

    // Check whether there aren't more clusters than samples
    if (this.numSamples < this.numClusters) {
      throw new Error(`Too many clusters (numClusters=${this.numClusters}) for the number for the
        number of samples (numSamples=${this.numSamples}). The number of clusters should be equal to
        or greater than the number of samples.`);
    }

    // Initialize cluster centroids
    this.initializeCentroids(X);

    // Keep track of current and last cluster assignments for all samples
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
          return Arrays.scale(
            // Sum of all assigned samples
            Arrays.sum(
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
        this.centroids.map(centroid => -Arrays.norm(Arrays.sum(centroid, Arrays.scale(x, -1))))
      )
    );
  }
}
