export default class Kernel {
  /**
   * Evaluate the kernel on a pair of data points
   *
   * @abstract
   *
   * @param Array[float] x First input value
   * @param Array[float] y Second input value
   * @return float Kernel output
   */
  apply(x, y) { throw new Error('Method must be implemented child class.'); }
}
