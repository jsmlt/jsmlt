// Internal dependencies
import LinAlg from '../math/linalg';
import Kernel from './base';

class GaussianKernel extends Kernel {
  /**
   * Constructor
   *
   * @param float sigmaSquared Optional. Normalization parameter for exponential
   */
  constructor(sigmaSquared = 0.5) {
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

export default GaussianKernel;
