// Internal dependencies
import Kernel from './base';
import * as Arrays from '../arrays';

/**
 * The linear kernel calculates the dot product of the two input vectors
 */
export default class LinearKernel extends Kernel {
  /**
   * @see {@link Kernel#apply}
   */
  apply(x, y) {
    return Arrays.dot(x, y);
  }
}
