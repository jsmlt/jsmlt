// Internal dependencies
import { Classifier } from '../base';

/**
 * Base class for neighbors-based classifiers such as KNN
 */
class Neighbors extends Classifier {
  /**
   * @see jsmlt.supervised.base.Classifier::train()
   */
  train(X, y) {
    if (X.length !== y.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Store data points
    this.training = { X, y };
  }
}

export default Neighbors;
