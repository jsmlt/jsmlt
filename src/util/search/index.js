/* eslint import/prefer-default-export: "off" */

/**
 * Perform a binary search in a sorted array A to find the index i such that the search value is
 * larger than or equal to A[i], and strictly smaller than A[i+1]. Informally, this corresponds with
 * finding the interval in which the search value lies.
 *
 * @param {Array.<number>} array - Sorted input array
 * @param {number} value - Value for which the interval should be found
 * @return {number} Index i of array element A[i] such that `value >= A[i] && value < A[i + 1]`
 */
export function binaryIntervalSearch(array, value) {
  // Check whether the element to search falls within the range of the array (i.e., the range from
  // the lowest array value (first index) and largest array value (last index))
  if (value < array[0] || value >= array[array.length - 1]) {
    throw new Error('Binary search target value is outside of the range of the array.');
  }

  // Let and right bounds to search in
  let l = 0;
  let r = array.length - 1;

  // Middle index between left and right bound
  let m;

  while (true) {
    // Recalculate middle index
    m = Math.floor((l + r) / 2);

    if (value < array[m]) {
      // Check whether we've found the right interval
      if (value >= array[m - 1]) {
        break;
      }

      // Change bounds to left half
      r = m - 1;
    } else {
      // Change bounds to right half
      l = m + 1;
    }
  }

  return m - 1;
}
