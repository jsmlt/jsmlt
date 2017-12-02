// Internal dependencies
import Kernel from './base';
import * as Arrays from '../arrays';

/**
 * The Gaussian kernel, also known as the radial basis function (RBF) kernel
 */
export default class GaussianKernel extends Kernel {
  /**
   * Initialize the Gaussian kernel with user-specified parameters
   *
   * @param {number} [sigmaSquared = 1] - Normalization parameter for exponential
   */
  constructor(sigmaSquared = 1) {
    super();

    /**
     * Normalization parameter for exponential
     *
     * @type {number}
     */
    this.sigmaSquared = sigmaSquared;
  }

  /**
   * @see {@link Kernel#apply}
   */
  apply(x, y) {
    // Gaussian
    const diff = Arrays.sum(x, Arrays.scale(y, -1));
    return Math.exp(-Arrays.dot(diff, diff) / (2 * this.sigmaSquared));
  }
}
