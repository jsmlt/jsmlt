/* eslint import/prefer-default-export: "off" */

/**
 * Generate a random integer between a lower bound (inclusive) and an upper bound (exclusive)
 *
 * @param int a Lower bound (inclusive)
 * @param int b Upper bound (exclusive)
 */
export function randint(a, b) {
  return a + Math.floor((b - a) * Math.random());
}
