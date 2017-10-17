/**
 * Generate a random integer between a lower bound (inclusive) and an upper bound (exclusive).
 *
 * @param {number} a - Lower bound (inclusive)
 * @param {number} b - Upper bound (exclusive)
 * @return {number} Random integer in range [a,b)
 */
export function randint(a, b) {
  return a + Math.floor((b - a) * Math.random());
}

/**
 * Generate a random number between a lower bound (inclusive) and an upper bound (exclusive).
 *
 * @param {number} a - Lower bound (inclusive)
 * @param {number} b - Upper bound (exclusive)
 * @return {number} Random number in range [a,b)
 */
export function rand(a, b) {
  return a + (Math.random() * (b - a));
}
