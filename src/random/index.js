// Internal dependencies
import * as Arrays from '../arrays';
import * as Search from '../util/search';

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
    const index = randint(0, i + 1);
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
  const indices = randint(0, input.length, number);
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
    const randomNumber = rand(0, useCumWeights[useCumWeights.length - 1]);
    return Search.binaryIntervalSearch([0, ...useCumWeights], randomNumber);
  };

  if (withReplacement) {
    // Sample with replacement, i.e., randomly sample one element n times in a row
    const cumWeights = calculateCumWeights(useWeights);

    return Arrays.zeros(number).map(() =>
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
