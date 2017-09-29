// Internal dependencies
import Kernel from './base';
import * as LinAlg from '../math/linalg';

export default class LinearKernel extends Kernel {
  /**
   * @see jsmlt.Kernel.Kernel::apply()
   */
  apply(x, y) {
    return LinAlg.dot(x, y);
  }
}
