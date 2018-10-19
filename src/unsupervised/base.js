/**
 * Base class for clustering algorithms.
 */
export default class Clusterer {
  /**
   * Run the clustering algorithm on a dataset and obtain the cluster predictions per class.
   *
   * @abstract
   *
   * @param {Array.<Array.<number>>} X - Features per data point
   */
  train(X) { throw new Error('Method must be implemented child class.'); }

  /**
   * Assign clusters to samples.
   *
   * @param {Array.<Array.<number>>} X - Features per data point
   * @return {Array.<number>} Cluster indices assigned to input data points. For n input data
   *   points, an n-dimensional array containing the cluster assignments will be returned
   */
  cluster(X) { throw new Error('Method must be implemented child class.'); }
}
