// Internal dependencies
import Datapoint from './datapoint';

/**
 * Container of data points for a single data set.
 */
export default class Dataset {
  /**
   * Initialize object properties.
   */
  constructor() {
    this.numDimensions = 0;
    this.numDatapoints = 0;
    this.datapoints = [];
  }

  /**
   * Add a data point to the data set. Data point should be an array with the number of dimensions
   * used throughout the dataset.
   *
   * @param features Data point features array
   */
  addDatapoint(features) {
    // Set the dimensionality of the data if this is the first data point
    if (this.numDatapoints === 0) {
      this.numDimensions = features.length;
    }

    // Construct data point
    const datapoint = new Datapoint(features);

    // Check data point validity
    if (!this.isValidDataPoint(datapoint)) {
      throw new Error('Invalid specification of data point.');
    }

    // Add data point
    this.datapoints.push(datapoint);
    this.numDatapoints += 1;

    return datapoint;
  }

  /**
   * Check whether a data point is valid. A valid data point is an array of the correct number
   * of dimensions.
   *
   * @param datapoint Data point to be checked
   * @return bool Whether the data point is valid
   */
  isValidDataPoint(datapoint) {
    return Array.isArray(datapoint.features) && datapoint.features.length === this.numDimensions;
  }

  /**
   * Get all data points from this dataset
   *
   * @return Array Data points. Array of datapoint objects
   */
  getDataPoints() {
    return this.datapoints;
  }

  /**
   * Get the number of data points in this dataset
   *
   * @return int Number of data points
   */
  numDataPoints() {
    return this.datapoints.length;
  }

  /**
   * Get the number of dimensions for the features of data points
   *
   * @return int Dimensionality
   */
  getNumDimensions() {
    return this.numDimensions;
  }

  /**
   * Extract the features from the datapoints and return them in an n x d array, where `n` is the
   * number of data points and `d` is the number of dimensions (number of features per datapoint).
   *
   * @return Array[Array[Number]] Features matrix
   */
  getFeaturesArray() {
    return this.datapoints.map(x => x.features);
  }

  /**
   * Extract the labels from the datapoints and return them in an array.
   *
   * @return Array[mixed] Labels array
   */
  getLabelsArray() {
    return this.datapoints.map(x => x.classIndex);
  }
}
