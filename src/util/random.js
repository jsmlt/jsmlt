/* eslint import/prefer-default-export: "off" */

/**
 * Generate a random integer between a lower bound (inclusive) and an upper bound (exclusive).
 *
 * @param {number} a Lower bound (inclusive)
 * @param {number} b Upper bound (exclusive)
 * @return {number} Random integer in range [a,b]
 */
export function randint(a, b) {
  return a + Math.floor((b - a) * Math.random());
}
