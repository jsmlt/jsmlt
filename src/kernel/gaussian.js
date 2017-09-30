// Internal dependencies
import Kernel from './base';
import * as LinAlg from '../math/linalg';

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
    const diff = LinAlg.sum(x, LinAlg.scale(y, -1));
    return Math.exp(-LinAlg.dot(diff, diff) / (2 * this.sigmaSquared));
  }
}
