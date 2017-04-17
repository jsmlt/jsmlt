class Classifier {
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
   * Reset class labels corresponding to indices to empty
   */
  resetLabelsClassIndex() {
    this.labelsClassIndex = {};
    this.classIndicesLabel = [];
    this.numLabels = 0;
  }

  /**
   * Get the class index corresponding to a label, creating it if it doesn't exist
   *
   * @param string label Class label
   * @return int Class index corresponding to given class label
   */
  getOrCreateLabelClassIndex(label) {
    const labelString = label.toString();

    if (typeof this.labelsClassIndex[labelString] === 'undefined') {
      this.labelsClassIndex[labelString] = this.numLabels;
      this.classIndicesLabel.push(labelString);
      this.numLabels += 1;
    }

    return this.labelsClassIndex[labelString];
  }

  /**
   * Get the class index corresponding to a label
   *
   * @param string label Class label
   * @return int Class index corresponding to given class label. Returns -1 if class with the label
   *   doesn't exist
   */
  getLabelClassIndex(label) {
    const labelString = label.toString();

    if (typeof this.labelsClassIndex[labelString] === 'undefined') {
      return -1;
    }

    return this.labelsClassIndex[label];
  }

  /**
   * Get the label corresponding to a class index
   *
   * @param int classIndex Class index
   * @return string Class label corresponding to given class index. Returns -1 if class with the
   *   index doesn't exist
   */
  getClassIndexLabel(classIndex) {
    return (typeof this.classIndicesLabel[classIndex] === 'undefined') ? -1 : this.classIndicesLabel[classIndex];
  }
}

export default Classifier;
