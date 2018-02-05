// Internal dependencies
import Kernel from './base';
import * as Arrays from '../arrays';

/**
 * The Sigmoid kernel. The formula of this kernel is as follows:
 *   tanh(gamma * <x, y> + coef0)
 */
export default class SigmoidKernel extends Kernel {
  /**
   * Initialize the Sigmoid kernel with user-specified parameters
   *
   * @param {Object} [options] - User-defined options
   * @param {number} [options.gamma = 1] - Normalization parameter of basic dot product
   * @param {number} [options.coef0 = 1] - Bias coefficient (not part of the dot product)
   */
  constructor({ gamma = 0.01, coef0 = 0 } = {}) {
    super();

    /**
     * Normalization parameter of basic dot product
     * @type {number}
     */
    this.gamma = gamma;

    /**
     * Bias coefficient (not part of the dot product)
     * @type {number}
     */
    this.coef0 = coef0;
  }

  /**
   * @see {@link Kernel#apply}
   */
  apply(x, y) {
    return Math.tanh(this.gamma * Arrays.dot(x, y) + this.coef0);
  }
}
