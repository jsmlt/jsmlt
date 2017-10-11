// Internal dependencies
import Kernel from './base';
import * as LinAlg from '../math/linalg';

/**
 * The Polynomial kernel. The formula of this kernel is as follows:
 *   (gamma * <x, y> + coef0)^degree
 */
export default class PolynomialKernel extends Kernel {
  /**
   * Initialize the Gaussian kernel with user-specified parameters
   *
   * @param {Object} [options] - User-defined options
   * @param {number} [options.gamma = 1] - Normalization parameter of basic dot product
   * @param {number} [options.coef0 = 1] - Bias coefficient (not part of the dot product)
   * @param {number} [options.degree = 2] - Degree of the polynomial
   */
  constructor({ gamma = 1, coef0 = 1, degree = 2 } = {}) {
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

    /**
     * Degree of the polynomial
     * @type {number}
     */
    this.degree = degree;
  }

  /**
   * @see {@link Kernel#apply}
   */
  apply(x, y) {
    return (this.gamma * LinAlg.dot(x, y) + this.coef0) ** this.degree;
  }
}
