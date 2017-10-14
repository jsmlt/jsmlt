/**
 * Base class for kernels, which calculate some distance metric between two data points
 */
export default class Kernel {
  /**
   * Evaluate the kernel on a pair of data points
   *
   * @param {Array.<number>} x - First input value
   * @param {Array.<number>} y - Second input value
   * @return {number} Kernel output
   */
  apply(x, y) { throw new Error('Method must be implemented child class.'); }
}
