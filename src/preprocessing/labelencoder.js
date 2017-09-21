/**
 * Encoder of categorical values to integers. For k different values, encoding yields integer
 * numbers from 0 to k-1 (inclusive)
 */
export default class LabelEncoder {
  constructor() {
    /**
     * Dictionary mapping class labels to class indices.
     *
     * @var dict[string => int]
     */
    this.labelsClassIndex = {};

    /**
     * Array of class labels for class indices
     *
     * @var Array[string]
     */
    this.classIndicesLabel = [];

    /**
     * Number of unique class labels
     *
     * @var int
     */
    this.numLabels = 0;
  }

  /**
   * Encode a set of labels or a single label
   *
   * @param mixed|Array[mixed] labels Single label or list of labels. Each label should support the
   *   toString() method
   * @return int|Array[int] Single encoded label or list of encoded labels (i.e., integers
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
   * Decode a set of labels or a single label
   *
   * @param int|Array[int] encodedLabels Single encoded label or list of encoded labels
   * @return int|Array[int] Single decoded label or list of decoded labels
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
