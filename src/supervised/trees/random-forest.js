// Internal dependencies
import { Classifier } from '../base';
import DecisionTree from './decision-tree';
import * as Arrays from '../../arrays';
import * as Random from '../../random';

/**
 * Random forest learner. Builds multiple decision trees with a random subsample of the samples,
 * and averages their predictions for the final prediction model.
 */
export default class RandomForest extends Classifier {
  /**
   * Constructor. Initialize class members and store user-defined options.
   *
   * @param {Object} [optionsUser] - User-defined options for random forest
   * @param {number} [optionsUser.numTrees = 10] - Number of decision trees to build
   * @param {string} [optionsUser.criterion = 'gini'] - Splitting criterion. Either 'gini', for the
   *   Gini coefficient, or 'entropy' for the Shannon entropy
   * @param {number|string} [optionsUser.numFeatures = 1.0] - Number of features to subsample at
   *   each node. Either a number (float), in which case the input fraction of features is used
   *   (e.g., 1.0 for all features), or a string. If string, 'sqrt' and 'log2' are supported,
   *   causing the algorithm to use sqrt(n) and log2(n) features, respectively (where n is the
   *   total number of features)
   * @param {number} [optionsUser.numTrees = 10] - Number of trees to construct
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      criterion: 'gini',
      numFeatures: 1.0,
      numTrees: 10,
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    // Set options
    this.criterion = options.criterion;
    this.numFeatures = options.numFeatures;
    this.numTrees = options.numTrees;
  }

  /**
   * @see {@link Classifier#train}
   */
  train(X, y) {
    if (X.length !== y.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Construct and train decision trees
    this.trees = [];

    // All sample indices
    const sampleIndices = [...Array(X.length)].map((x, i) => i);

    for (let i = 0; i < this.numTrees; i += 1) {
      // Construct decision tree
      const tree = new DecisionTree({
        criterion: this.criterion,
        numFeatures: this.numFeatures,
      });

      // Bootstrap the input samples
      const treeSamples = Random.sample(sampleIndices, X.length, true);

      const treeX = treeSamples.map(sampleIndex => X[sampleIndex]);
      const treeY = treeSamples.map(sampleIndex => y[sampleIndex]);

      // Train the tree
      tree.train(treeX, treeY);

      // Add the trained tree to the list of trees
      this.trees.push(tree);
    }
  }

  /**
   * @see {@link Classifier#predict}
   */
  predict(X) {
    if (typeof this.trees === 'undefined') {
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
    // Gather predictions from all trees
    const predictions = this.trees.map(x => x.predictSample(sampleFeatures));

    // Count the number of votes for each class
    const predictionCounts = Arrays.valueCounts(predictions);

    // Predict the class with the most predictions
    return predictionCounts.reduce((r, x) => (x[1] > r[1] ? x : r), [-1, -1])[0];
  }
}
