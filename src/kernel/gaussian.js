// Internal dependencies
import Kernel from './base';
import * as LinAlg from '../math/linalg';

export default class GaussianKernel extends Kernel {
  /**
   * Constructor
   *
   * @param float sigmaSquared Optional. Normalization parameter for exponential
   */
  constructor(sigmaSquared = 1) {
    super();

    this.sigmaSquared = sigmaSquared;
  }

  /**
   * @see jsmlt.Kernel.Kernel::apply()
   */
  apply(x, y) {
    // Gaussian
    const diff = LinAlg.sum(x, LinAlg.scale(y, -1));
    return Math.exp(-LinAlg.dot(diff, diff) / (2 * this.sigmaSquared));
  }
}
