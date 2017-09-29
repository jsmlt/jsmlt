export default class Datapoint {
  /**
   * Constructor
   *
   * @param Array[Number] features Data point features array
   */
  constructor(features) {
    this.features = features; // Data point features array
    this.classIndex = null; // Index of data point's class

    // "marked" status of data point. Can be used e.g. to indicate support vectors
    this.marked = false;
  }

  /**
   * Change the class index of this data point
   *
   * @param mixed classIndex New class index
   */
  setClassIndex(classIndex) {
    this.classIndex = classIndex;
  }

  /**
   * Get the class index of this data point
   *
   * @return mixed Class index
   */
  getClassIndex() {
    return this.classIndex;
  }

  /**
   * Change the "marked" status of this data point. Can be used for e.g. support vectors
   *
   * @param bool isMarked Whether the data point should be marked or not
   */
  setMarked(marked) {
    this.marked = marked;
  }

  /**
   * Check whether the data point is marked
   *
   * @return bool Whether the data point is marked
   */
  isMarked() {
    return this.marked;
  }
}
