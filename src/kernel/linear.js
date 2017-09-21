// Internal dependencies
import LinAlg from '../math/linalg';
import Kernel from './base';

class LinearKernel extends Kernel {
  apply(x, y) {
    return LinAlg.dot(x, y);
  }
}

export default LinearKernel;
