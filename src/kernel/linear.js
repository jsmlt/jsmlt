// Internal dependencies
import Kernel from './base';
import * as LinAlg from '../math/linalg';

/**
 * The linear kernel calculates the dot product of the two input vectors
 */
export default class LinearKernel extends Kernel {
  /**
   * @see {@link Kernel#apply}
   */
  apply(x, y) {
    return LinAlg.dot(x, y);
  }
}
