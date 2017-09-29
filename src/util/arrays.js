// Local imports
import * as Random from './random';

/**
 * Take a slice out of an array, but wrap around the beginning an end of the array. For example,
 * if `begin` is -1, the last element of the input array is used as the first output element.
 *
 * @param int begin Index of first array element
 * @param int end Index of end of slice range (element with this index will itself not be
 *   included in output)
 * @return Array[mixed] Sliced array
 */
export function wrapSlice(array, begin, end) {
  const result = [];

  for (let i = begin; i <= end; i += 1) {
    const index = ((i % array.length) + array.length) % array.length;
    result.push(array[index]);
  }

  return result;
}

/**
 * From an input array, create a new array where each element is comprised of a 2-dimensional array
 * where the first element is the original array entry and the second element is its index
 *
 * @param Array[mixed] array Input array
 * @return Array[Array[mixed]] Output array
 */
export function zipWithIndex(array) {
  return array.map((x, i) => [x, i]);
}

/**
 * Count the occurrences of the unique values in an array
 *
 * @param Array[mixed] array Input array
 * @param Array[Array[mixed]] Array where each element is a 2-dimensional array. In these 2D arrays,
 *   the first element corresponds to the unique array value, and the second elements corresponds
 *   to the number of times this value occurs in the original array.
 */
export function valueCounts(array) {
  // Create map of counts per array value
  const counts = [];
  const valuesIndex = {};
  let numUniqueValues = 0;

  array.forEach((x) => {
    if (typeof valuesIndex[x] === 'undefined') {
      valuesIndex[x] = numUniqueValues;
      counts.push([x, 0]);
      numUniqueValues += 1;
    }

    counts[valuesIndex[x]][1] += 1;
  });

  return counts;
}

/**
 * Get array key corresponding to largest element in the array
 *
 * @param Array[Number] array Input array
 * @return int Index of array element with largest value
 */
export function argMax(array) {
  if (array.length === 0) {
    return null;
  }

  return zipWithIndex(array).reduce((r, x) => (x[0] > r[0] ? x : r))[1];
}

/**
 * Take a random sample without replacement from an array. Uses the Fisher-Yates shuffling,
 * algorithm, modified to accomodate sampling
 *
 * @param Array input Input array
 * @param int number Number of elements to sample from the input array
 * @return Array Array of length {number} with values sampled from the input array
 */
export function sample(input, number) {
  // Copy input array
  const shuffledArray = input.slice(0);

  // Number of elements in the input array
  const numElements = input.length;

  for (let i = numElements - 1; i >= numElements - number; i -= 1) {
    const index = Random.randint(0, i + 1);
    const tmp = shuffledArray[index];
    shuffledArray[index] = shuffledArray[i];
    shuffledArray[i] = tmp;
  }

  // Return the sampled values
  return shuffledArray.slice(numElements - number);
}
