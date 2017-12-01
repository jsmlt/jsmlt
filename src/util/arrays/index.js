// Local imports
import * as Random from '../random';
import * as Search from '../search';
import * as LinAlg from '../../math/linalg';

/**
 * Take a slice out of an array, but wrap around the beginning an end of the array. For example,
 * if `begin` is -1, the last element of the input array is used as the first output element.
 *
 * @param {Array.<mixed>} array - Input array
 * @param {number} begin Index of first array element
 * @param {number} end Index of end of slice range (element with this index will itself not be
 *   included in output)
 * @return {Array.<mixed>} Sliced array
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
 * @param {Array.<mixed>} array Input array
 * @return {Array.<Array.<mixed>>} Output array
 */
export function zipWithIndex(array) {
  return array.map((x, i) => [x, i]);
}

/**
 * Count the occurrences of the unique values in an array
 *
 * @param {Array.<mixed>} array Input array
 * @return {Array.<Array.<mixed>>} Array where each element is a 2-dimensional array. In these 2D
 *   arrays, the first element corresponds to the unique array value, and the second elements
 *   corresponds to the number of times this value occurs in the original array
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
 * Filter an array and return the array indices where the filter was matched. Corresponds to
 * JavaScript's native Array.filter(), but instead of returning the elements that match the filter
 * criteria, it returns the indices of the elements matching the filter.
 *
 * @param {Array.<mixed>} array - Array to be filtered
 * @param {function(element: mixed, !index: Number): boolean} callback - Callback function to be
 *   used for filtering. This function takes an array element and possibly its index as its input
 *   and should return true when the index should be used (filtered) and false when it shouldn't
 * @return {Array.<Number>} Array of array indices in the original array where the array element
 *   matches the filter
 */
export function argFilter(array, callback) {
  return zipWithIndex(array)
    // Filter zipped elements + indices where the element matches the filter
    .filter(x => callback(x[0], x[1]))

    // Map the zipped elements to the indices
    .map(x => x[1]);
}
/**
 * Sort an array and return the array indices of the sorted elements. Corresponds to JavaScript's
 * native Array.sort(), but instead of returning the sorted elements, it returns the indices of the
 * sorted elements.
 *
 * @param {Array.<mixed>} array - Array to be sorted
 * @param {function(a: mixed, b: mixed): Number} [compareFunction = null] - Callback function be
 *   used for sorting. This function takes two array elements and returns an integer indicating
 *   sort order of the two elements a and b:
 *     < 0  : a before b
 *     == 0 : leave order of a and b unchanged with respect to each other
 *     > 0  : b after a
 *   Defaults to numeric sorting.
 * @return {Array.<Number>} Array of array indices such that the elements corresponding with these
 *   indices in the original array are sorted
 */
export function argSort(array, callback) {
  const useCallback = typeof callback === 'function'
    ? callback
    : ((a, b) => a - b);

  return zipWithIndex(array)
    // Sort zipped elements + indices by element value
    .sort((a, b) => useCallback(a[0], b[0]))

    // Map the zipped elements to the indices
    .map(x => x[1]);
}

/**
 * Get array key corresponding to largest element in the array.
 *
 * @param {Array.<number>} array Input array
 * @return {number} Index of array element with largest value
 */
export function argMax(array) {
  if (array.length === 0) {
    return null;
  }

  return zipWithIndex(array).reduce((r, x) => (x[0] > r[0] ? x : r))[1];
}

/**
 * Take a random sample without replacement from an array. Uses the Fisher-Yates shuffling,
 * algorithm, modified to accomodate sampling.
 *
 * @param {Array.<mixed>} input Input array
 * @param {number} number Number of elements to sample from the input array
 * @return {Array.<mixed>} Array of length {number} with values sampled from the input array
 */
export function sampleFisherYates(input, number) {
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

/**
 * Take a random sample with or without replacement from an array with uniform weights.
 *
 * @param {Array.<mixed>} input - Input array
 * @param {number} number - Number of elements to sample from the input array
 * @param {boolean} [withReplacement=true] - Whether to sample with (set to true) or without
 *   replacement (false)
 * @return {Array.<mixed>} Array of length {number} with values sampled from the input array
 */
function sampleUniform(input, number, withReplacement = true) {
  // If sampling without replacement, use Fisher-Yates sampling
  if (!withReplacement) {
    return sampleFisherYates(input, number);
  }

  // If sampling with replacement, choose a random element each time
  const indices = Random.randint(0, input.length, number);
  return indices.map(x => input[x]);
}

/**
 * Take a random sample with or without replacement from an array. Supports using sampling weights,
 * governing the probability of an item in the input array being selected.
 *
 * @param {Array.<mixed>} input - Input array
 * @param {number} number - Number of elements to sample from the input array
 * @param {boolean} [withReplacement=true] - Whether to sample with (set to true) or without
 *   replacement (false)
 * @param {Array.<number>|string} [weights='uniform'] - Weights to use for sampling. Defaults to
 *  'uniform',  which means all samples have equal probability of being selected. Alternatively, you
 *  can pass an array of weights, containing a single weight for each element in the input array
 * @return {Array.<mixed>} Array of length {number} with values sampled from the input array
 */
export function sample(input, number, withReplacement = true, weights = 'uniform') {
  if (Array.isArray(weights)) {
    if (weights.length !== input.length) {
      throw new Error('Weights array length does not equal input array length.');
    }

    if (!withReplacement && number > weights.filter(x => x > 0).length) {
      throw new Error('Invalid sampling quantity specified: sampling without replacement cannot sample more elements than the number of non-zero weights in the weights array.');
    }
  } else if (weights !== 'uniform') {
    throw new Error('Invalid value specified for "weights".');
  }

  if (!withReplacement && number > input.length) {
    throw new Error('Invalid sampling quantity specified: sampling without replacement cannot sample more elements than the number of input elements.');
  }

  // Use the uniform sampling method if the user has specified uniform weights
  if (weights === 'uniform') {
    return sampleUniform(input, number, withReplacement);
  }

  // Copy weights vector
  const useWeights = weights.slice();

  const calculateCumWeights = localWeights =>
    localWeights.reduce((r, a, i) => ([
      ...r,
      i > 0 ? (r[i - 1] + a) : a
    ]), []);

  const sampleSingle = (useCumWeights) => {
    // Generate a random number, and find the interval in the array of cumulative weights to which
    // it corresponds. We use this index as the sampled array index, which corresponds to weighted
    // sampling
    const randomNumber = Random.rand(0, useCumWeights[useCumWeights.length - 1]);
    return Search.binaryIntervalSearch([0, ...useCumWeights], randomNumber);
  };

  if (withReplacement) {
    // Sample with replacement, i.e., randomly sample one element n times in a row
    const cumWeights = calculateCumWeights(useWeights);

    return LinAlg.zeros(number).map(() =>
      input[sampleSingle(cumWeights)]
    );
  }

  // Sample without replacement: randomly sample one element, remove it from the list of elements
  // that can still be sampled and the weights list, and sample from the remaining elements

  // Copy input
  const useInput = input.slice();

  // List of elements sampled
  const samples = [];

  while (samples.length < number) {
    // Sample from remaining inputs
    const cumWeights = calculateCumWeights(useWeights);
    const useSample = sampleSingle(cumWeights);
    samples.push(useInput[useSample]);

    // Remove sampled element from input elements and weights lists
    useInput.splice(useSample, 1);
    useWeights.splice(useSample, 1);
  }

  return samples;
}

/**
 * Deep check whether two arrays are equal: sub-arrays will be traversed, and strong type checking
 * is enabled.
 *
 * @param {Array.<mixed>|mixed} array1 - First array to check or array element to check
 * @param {Array.<mixed>|mixed} array2 - Second array to check ot array element to check. Will be
 *   checked against first array
 * @return {boolean} Whether the two arrays are the same
 */
export function equal(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    return array1 === array2;
  }

  if (array1.length !== array2.length) {
    return false;
  }

  return array1.reduce((r, a, i) => r && equal(a, array2[i]), true);
}
