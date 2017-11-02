// Internal dependencies
import { Classifier } from '../base';
import * as LinAlg from '../../math/linalg';
import * as Arrays from '../../util/arrays';

/**
 * @typedef {Object} DataSplitGroups
 * @property {Array.<Array.<number>>} indices - Two-dimensional array containing, for both groups,
 *   the indices of the samples belonging to the group
 * @property {Array.<Array.<number>>} features - Two-dimensional array containing, for both groups,
 *   the features of the samples belonging to the group
 * @property {Array.<Array.<number>>} labels - Two-dimensional array containing, for both groups,
 *   the labels of the samples belonging to the group
 */

/**
 * @typedef {Object} DataSplit
 * @property {number} feature - Index of the feature by which to split
 * @property {number} featureValue - Split value of the feature by which to split
 * @property {DataSplitGroups} groups - Data groups resulting from the split
 */

/**
 * Decision tree node. Holds properties of a single tree node.
 */
export class DecisionTreeNode {}

/**
 * k-nearest neighbours learner. Classifies points based on the (possibly weighted) vote
 * of its k nearest neighbours (euclidian distance).
 */
export default class DecisionTree extends Classifier {
  /**
   * Constructor. Initialize class members and store user-defined options.
   *
   * @param {Object} [optionsUser] - User-defined options for KNN
   * @param {string} [optionsUser.criterion = 'gini'] - Splitting criterion. Either 'gini', for the
   *   Gini coefficient, or 'entropy' for the Shannon entropy
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      criterion: 'gini',
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    // Set options
    this.criterion = options.criterion;
  }

  /**
   * Calculate the impurity for multiple groups of labels. The impurity criterion used can be
   * specified by the user through the user-defined options.
   *
   * @param {Array.<Array.<mixed>>} groups - Groups of labels. Each group is an array of labels
   * @return {number} Impurity for the provided groups
   */
  calculateImpurity(groups) {
    if (this.criterion === 'gini') {
      return this.calculateWeightedImpurity(groups, this.gini);
    } else if (this.criterion === 'entropy') {
      return this.calculateWeightedImpurity(groups, this.entropy);
    }

    return null;
  }

  /**
   * Calculate the weighted impurity for multiple groups of labels. The returned impurity is
   * calculated as the weighted sum of the impurities of the individual groups, where the
   * weights are determined by the number of samples in the group.
   *
   * @param {Array.<Array.<mixed>>} groups - Groups of labels. Each group is an array of labels
   * @param {function(labels: Array.<number>): number} callback - Callback function taking an array
   *   of labels as its first and only argument
   * @return {number} Weighted impurity for the provided groups
   */
  calculateWeightedImpurity(groups, impurityCallback) {
    // Impurity per group
    const impurities = [];

    // Total number of elements
    let numElements = 0;

    // Loop over the groups and calculate the group's impurity
    for (const group of groups) {
      impurities.push(impurityCallback(group));
      numElements += group.length;
    }

    // Return the weighted sum of impurities
    return impurities.reduce((r, a, i) =>
      r + a * groups[i].length / numElements
    , 0);
  }

  /**
   * Calculate the Gini coefficient a set of labels.
   *
   * @param {Array.<mixed>} labels - Array of predicted labels
   * @return {number} Gini impurity
   */
  gini(labels) {
    const uniqueLabels = [...new Set(labels)];
    return uniqueLabels.reduce((r, label) => {
      const frac = labels.filter(x => x === label).length / labels.length;
      return r + frac * (1 - frac);
    }, 0);
  }

  /**
   * Calculate the Shannon entropy a set of labels.
   *
   * @param {Array.<mixed>} labels - Array of predicted labels
   * @return {number} Shannon entropy
   */
  entropy(labels) {
    const uniqueLabels = [...new Set(labels)];
    return uniqueLabels.reduce((r, label) => {
      const frac = labels.filter(x => x === label).length / labels.length;
      return r - frac * Math.log(frac);
    }, 0);
  }

  /**
   * Split a set of samples into two groups by some splitting value for a feature. The samples with
   * a feature value lower than the split value go the left (first) group, and the other samples go
   * to the right (second) group.
   *
   * @param {Array.<number>} XSub - Features of samples to split by some feature
   * @param {Array.<mixed>} ySub - Labels of samples
   * @param {number} fInd - Index of feature to split by
   * @param {number} splitValue - Value to be used as the splitting point for the feature
   * @return {DataSplitGroups} Assigned sample indices, features, and labels for both of the groups
   */
  splitSamples(XSub, ySub, fInd, splitValue) {
    const groupsIndices = [[], []];
    const groupsX = [[], []];
    const groupsY = [[], []];

    XSub.forEach((x, i) => {
      if (x[fInd] < splitValue) {
        groupsIndices[0].push(i);
        groupsX[0].push(x);
        groupsY[0].push(ySub[i]);
      } else {
        groupsIndices[1].push(i);
        groupsX[1].push(x);
        groupsY[1].push(ySub[i]);
      }
    });

    return {
      indices: groupsIndices,
      features: groupsX,
      labels: groupsY
    };
  }

  /**
   * Find the best splitting feature and feature value for a set of data points.
   *
   * @param {Array.<Array.<number>>} XSub - Features of samples to find the split for
   * @param {Array.<mixed>} ySub - Labels of samples
   * @param {number} baseImpurity - Impurity of parent node
   * @return {DataSplit}
   */
  findSplit(XSub, ySub, baseImpurity) {
    // Extract information from training data
    const shape = LinAlg.getShape(XSub);

    // Best split found
    let bestSplitGain = - Infinity;
    let bestSplitFeature;
    let bestSplitFeatureValue;
    let bestSplitGroups;

    // Transpose features array to easily access all sample values for a given feature
    const XSubT = LinAlg.transpose(XSub);

    // Randomly permute feature indices
    const fIndices = LinAlg.permuteRows([...Array(shape[1])].map((x, i) => i))[0];

    // Calculate best split by looping over all features and considering the split quality for
    // all of each feature's values. The best split is the feature value at which to split such
    // that the impurity is minimized
    fIndices.forEach((fInd) => {
      // Extract unique, sorted sample values for this feature
      const sampleValues = [...new Set(XSubT[fInd])];
      sampleValues.sort((a, b) => (a > b) * 2 - 1);

      // Find split values as the average value between all sorted unique values
      const splitValues = LinAlg.scale(
        LinAlg.sum(
          sampleValues.slice(1),
          sampleValues.slice(0, -1)
        ),
        0.5
      );

      // Loop over all split values
      splitValues.forEach((splitValue) => {
        // Groups samples. The first and second group correspond with the samples in the left
        // and right parts of the split, respectively
        const groups = this.splitSamples(XSub, ySub, fInd, splitValue);

        // Calculate impurity and impurity gain
        const impurity = this.calculateImpurity(groups.labels);
        const gain = baseImpurity - impurity;

        // Check whether this split is better than the current best split
        if (gain > bestSplitGain && groups.features[0].length > 0
          && groups.features[1].length > 0) {
          bestSplitGain = gain;
          bestSplitFeature = fInd;
          bestSplitFeatureValue = splitValue;
          bestSplitGroups = groups;
        }
      });
    });

    return {
      feature: bestSplitFeature,
      featureValue: bestSplitFeatureValue,
      groups: bestSplitGroups,
    };
  }

  /**
   * Build a (sub-)tree from a set of samples.
   *
   * @param {Array.<Array.<number>>} XSub - Features of samples to build a tree for
   * @param {Array.<mixed>} ySub - Labels of samples
   * @param {number} [depth = 0] - Current tree depth. 0 indicates the root node
   * @return {DecisionTreeNode} Decision tree node
   */
  buildTree(XSub, ySub, depth = 0) {
    // Create tree node
    const node = new DecisionTreeNode();

    // Calculate node impurity
    const impurity = this.calculateImpurity([ySub]);
    node.impurity = impurity;

    if (impurity === 0) {
      node.type = 'leaf';
      node.prediction = ySub[0];

      return node;
    }

    const { feature, featureValue, groups } = this.findSplit(XSub, ySub, impurity);

    // Fill node details
    node.type = 'node';
    node.feature = feature;
    node.featureValue = featureValue;
    node.left = this.buildTree(groups.features[0], groups.labels[0], depth + 1);
    node.right = this.buildTree(groups.features[1], groups.labels[1], depth + 1);

    return node;
  }

  /**
   * @see {@link Classifier#train}
   */
  train(X, y) {
    if (X.length !== y.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    this.tree = this.buildTree(X, y);
  }

  /**
   * @see {@link Classifier#predict}
   */
  predict(X) {
    if (typeof this.tree === 'undefined') {
      throw new Error('Model has to be trained in order to make predictions.');
    }

    // Make prediction for each data point
    const predictions = X.map(x => this.predictSample(x));

    return predictions;
  }

  /**
   * Make a prediction for a single sample.
   *
   * @param {Array.<number>} sampleFeatures - Data point features
   * @return {mixed} Prediction. Label of class with highest prevalence among k nearest neighbours
   */
  predictSample(sampleFeatures) {
    let node = this.tree;

    while (node.type === 'node') {
      node = (sampleFeatures[node.feature] < node.featureValue) ? node.left : node.right;
    }

    return node.prediction;
  }
}
