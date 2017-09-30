/**
 * Encoder of categorical values to integers. For k different values, encoding yields integer
 * numbers from 0 to k-1 (inclusive).
 *
 * @example
 * // List of raw input values
 * var y = ['Car', 'Bike', 'Bike', 'Car', 'Duck', 'Bike'];
 *
 * // Create encoder
 * var encoder = new LabelEncoder();
 *
 * // Encode input values, encoding the values to integers
 * var yEncoded = encoder.encode(y);
 * console.log(yEncoded); // [0, 1, 1, 0, 2, 0]
 *
 * // Decode the encoded values, and see that they match the original input values
 * console.log(encoder.decode(yEncoded)); // ['Car', 'Bike', 'Bike', 'Car', 'Duck', 'Bike']
 */
export default class LabelEncoder {
  /**
   * Initialize object properties.
   */
  constructor() {
    /**
     * Dictionary mapping class labels to class indices.
     *
     * @type {Object.<string, number>}
     */
    this.labelsClassIndex = {};

    /**
     * Array of class labels for class indices
     *
     * @type {Array.<string>}
     */
    this.classIndicesLabel = [];

    /**
     * Number of unique class labels
     *
     * @type {number}
     */
    this.numLabels = 0;
  }

  /**
   * Encode a set of labels or a single label.
   *
   * @param {mixed|Array.<mixed>} labels - Single label or list of labels. Each label should support
   *   the toString() method
   * @return {number|Array.<number>} Single encoded label or list of encoded labels (i.e., integers
   *   associated with the input labels)
   */
  encode(labels) {
    // In case multiple labels are passed, encode them one-by-one
    if (Array.isArray(labels)) {
      return labels.map(label => this.encode(label));
    }

    // In case a single label is passed, encode it
    const labelString = labels.toString();

    if (typeof this.labelsClassIndex[labelString] === 'undefined') {
      this.labelsClassIndex[labelString] = this.numLabels;
      this.classIndicesLabel.push(labelString);
      this.numLabels += 1;
    }

    return this.labelsClassIndex[labelString];
  }

  /**
   * Decode a set of labels or a single label.
   *
   * @param {number|Array.<number>} encodedLabels - Single encoded label or list of encoded labels
   * @return {mixed|Array.<mixed>} Single decoded label or list of decoded labels
   */
  decode(encodedLabels) {
    // In case multiple labels are passed, decode them one-by-one
    if (Array.isArray(encodedLabels)) {
      return encodedLabels.map(label => this.decode(label));
    }

    // In case a single label is passed, decode it
    return (typeof this.classIndicesLabel[encodedLabels] === 'undefined') ? -1 : this.classIndicesLabel[encodedLabels];
  }
}
