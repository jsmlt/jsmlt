/**
 * Generate a random integer between a lower bound (inclusive) and an upper bound (exclusive).
 *
 * @param {number} a - Lower bound (inclusive)
 * @param {number} b - Upper bound (exclusive)
 * @param {number|Array.<number>} [shape = null] - If null, a single element is returned. If
 *   integer, an array of {shape} elements is returned. If an Array, random numbers are returned in
 *   a shape specified by this array. n-th element corresponds to the number of elements in the
 *   n-th dimension.
 * @return {Array.<mixed>}  Array of the specified with zero in all entries
 * @return {number|Array.<mixed>} Random integer in range [a,b), or a possibly nested array of
 *   random integers in range [a, b)
 */
export function randint(a, b, shape = null) {
  if (Number.isInteger(shape)) {
    // List of random integers
    return [...Array(shape)].map(x => randint(a, b));
  } else if (Array.isArray(shape) && shape.length > 0) {
    if (shape.length === 1) {
      // Single shape item remaining; return list of integers
      return randint(a, b, shape[0]);
    }

    // Nested list of random integers
    return [...Array(shape[0])].map(() => randint(a, b, shape.slice(1)));
  }

  // Single random integer
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
