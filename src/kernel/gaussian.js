// Internal dependencies
import LinAlg from '../math/linalg';
import Kernel from './base';

class GaussianKernel extends Kernel {
  constructor(sigmaSquared = 0.5) {
    super();

    this.sigmaSquared = sigmaSquared;
  }

  apply(x, y) {
    // Gaussian
    const diff = LinAlg.sum(x, LinAlg.scale(y, -1));
    return Math.exp(-LinAlg.dot(diff, diff) / (2 * this.sigmaSquared));
  }
}

export default GaussianKernel;
