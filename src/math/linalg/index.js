/**
 * Linear Algebra toolkit for manipulating vectors and matrices. Mainly works using plain
 * JavaScript arrays.
 */

/**
 * Find the shape of an array, i.e. the number of elements per dimension of the array.
 *
 * @param {Array.<mixed>} A - Arbitrarily nested array to find shape of.
 * @return {Array.<number>} Array specifying the number of elements per dimension. n-th
 *   element corresponds to the number of elements in the n-th dimension.
 */
export function getShape(A) {
  if (!Array.isArray(A)) {
    return [];
  }

  const B = getShape(A[0]);
  B.unshift(A.length);

  return B;
}

/**
 * Get an arbitrary element from an array, using another array to determine the index inside the
 * first array.
 *
 * @param {Array.<mixed>} A - Array to get an element from
 * @param {Array.<number>} index - Indices to find array element. n-th element corresponds to index
 *   in n-th dimension
 * @return {mixed} Array element value at index
 */
export function getArrayElement(A, index) {
  if (index.length === 1) {
    return A[index];
  }

  return getArrayElement(A[index[0]], index.slice(1));
}

/**
 * Set an arbitrary element in an array, using another array to determine the index inside the
 * array.
 *
 * @param {Array.<mixed>} A - Array to set an element in
 * @param {Array.<number>} index - Indices to find array element. n-th element corresponds to index
 *   in n-th dimension
 * @param {mixed} value New element value at index
 */
export function setArrayElement(A, index, value) {
  const B = A.slice();

  B[index[0]] = index.length === 1 ? value : setArrayElement(A[index[0]], index.slice(1), value);
  return B;
}

/**
 * Generate n points on the interval (a,b), with intervals (b-a)/(n-1).
 *
 * @example
 * var list = linspace(1, 3, 0.5);
 * // list now contains [1, 1.5, 2, 2.5, 3]
 *
 * @param {number} a - Starting point
 * @param {number} b - Ending point
 * @param {number} n - Number of points
 * @return {Array.<number>} Array of evenly spaced points on the interval (a,b)
 */
export function linspace(a, b, n) {
  const r = [];

  for (let i = 0; i < n; i += 1) {
    r.push(a + i * ((b - a) / (n - 1)));
  }

  return r;
}

/**
 * Initialize a vector of a certain length with a specific value in each entry.
 *
 * @param {number} n - Number of elements in the vector
 * @param {mixed} value - Value to initialize entries at
 * @return Array Vector of n elements of the specified value
 */
export function valueVector(n, value) {
  return [...Array(n)].map(() => value);
}

/**
 * Initialize an n-dimensional array of a certain value.
 *
 * @param {Array.<number>} shape - Array specifying the number of elements per dimension. n-th
 *   element corresponds to the number of elements in the n-th dimension.
 * @param {mixed} value - Value to fill the array with
 * @return {Array.<mixed>} Array of the specified with zero in all entries
 */
export function full(shape, value) {
  if (!Array.isArray(shape)) {
    return valueVector(shape, value);
  }

  if (shape.length === 1) {
    return valueVector(shape[0], value);
  }

  return [...Array(shape[0])].map(() => full(shape.slice(1), value));
}

/**
 * Initialize a zero vector of a certain length.
 *
 * @param {number} n - Number of elements in the vector
 * @return {Array} Vector of n elements of value 0
 */
export function zeroVector(n) {
  return valueVector(n, 0);
}

/**
 * Initialize an n-dimensional array of zeros.
 *
 * @param {Array.<number>} shape - Array specifying the number of elements per dimension. n-th
 *   element corresponds to the number of elements in the n-th dimension.
 * @return {Array.<mixed>}  Array of the specified with zero in all entries
 */
export function zeros(shape) {
  return full(shape, 0);
}

/**
 * Set all entries in an array to a specific value.
 *
 * @param {Array.<mixed>} A - Array of which entries should be changed
 * @param {mixed} value - Value the array entries should be changed to
 * @return {Array.<mixed>} Array with modified entries
 */
export function fill(A, value) {
  return A.map(B => (Array.isArray(B) ? fill(B, value) : value));
}

/**
 * Concatenate two or more n-dimensional arrays.
 *
 * @param {number} axis - Axis to perform concatenation on
 * @param {...Array.<mixed>} S - Arrays to concatenate. They must have the same shape, except in
 *   the dimension corresponding to axis (the first, by default)
 * @return {Array} Concatenated array
 */
export function concatenate(axis, ...S) {
  if (axis === 0) {
    return [].concat(...S);
  }

  const A = [];

  for (let i = 0; i < S[0].length; i += 1) {
    A.push(concatenate(axis - 1, ...S.map(APrime => APrime[i])));
  }

  return A;
}

/**
 * Repeat an array multiple times along an axis. This is essentially one or more concatenations of
 * an array with itself.
 *
 * @param {number} axis - Axis to perform repetition on
 * @param {number} numRepeats - Number of times to repeat the array
 * @param {Array.<mixed>} A - Array to repeat
 * @return {Array.<mixed>} Specified array repeated numRepeats times
 */
export function repeat(axis, numRepeats, A) {
  let R = A.slice();

  for (let i = 0; i < numRepeats - 1; i += 1) {
    R = concatenate(axis, R, A);
  }

  return R;
}

/**
 * Pad an array along one or multiple axes.
 *
 * @param {Array.<mixed>} A - Array to be padded
 * @param {Array.<number> | Array.<Array.<number>>} paddingLengths - Amount of padding for each axis
 *   that should be padded. Each element in this array should be a two-dimensional array, where the
 *   first element specifies the padding at the start (front) of the axis, and the second element
 *   specifies the padding at the end (back) of the axis. The nth element of `paddingLength`
 *   specifies the front and back padding of the nth axis in the `axes` parameter
 * @param {Array.<number> | Array.<Array.<number>>} paddingValues - The values to pad each axis
 *   with. See the specification of the `paddingLenghts` parameter for the expected structure
 * @param {Array.<number>} [axes] - Indices of axes to be padded. Defaults to the first n axes,
 *   where n is the number of elements in `paddingLengths`
 * @return {Array.<mixed>} Padded array
 */
export function pad(A, paddingLengths, paddingValues, axes = []) {
  let B = A.slice();

  // Use default axes to padded (first n axes where n is the number of axes used in paddingLenghts
  // and paddingValues)
  if (!axes.length) {
    for (let i = 0; i < paddingLengths.length; i += 1) {
      axes.push(i);
    }
  }

  // Pad all specified axes
  for (let i = 0; i < axes.length; i += 1) {
    const axis = axes[i];
    const currentShape = getShape(B);

    // Determine padding lengths
    let lengthFront = 0;
    let lengthBack = 0;

    if (Array.isArray(paddingLengths[i])) {
      lengthFront = paddingLengths[i][0];
      lengthBack = paddingLengths[i][1];
    } else {
      lengthFront = paddingLengths[i];
      lengthBack = paddingLengths[i];
    }

    // Determine padding values
    let valueFront = 0;
    let valueBack = 0;

    if (Array.isArray(paddingValues[i])) {
      valueFront = paddingValues[i][0];
      valueBack = paddingValues[i][1];
    } else {
      valueFront = paddingValues[i];
      valueBack = paddingValues[i];
    }

    // Shape of padding for front and back
    const shapeFront = currentShape.slice();
    const shapeBack = currentShape.slice();

    shapeFront[axis] = lengthFront;
    shapeBack[axis] = lengthBack;

    // Create padding blocks
    const paddingFront = full(shapeFront, valueFront);
    const paddingBack = full(shapeBack, valueBack);

    B = concatenate(axis, paddingFront, B, paddingBack);
  }

  return B;
}

/**
 * Calculate dot product of two vectors. Vectors should have same size.
 *
 * @param {Array.<number>} x - First vector
 * @param {Array.<number>} y - Second vector
 * @return {number} Dot product scalar result
 */
export function dot(x, y) {
  return x.reduce((r, a, i) => r + a * y[i], 0);
}

/**
 * Calculate the Euclidian norm of a vector.
 *
 * @param {Array.<number>} x - Vector of which to calculate the norm
 */
export function norm(x) {
  return Math.sqrt(dot(x, x));
}

/**
 * Calculate elementwise sum of two or more vectors. Vectors should have same size.
 *
 * @param {...Array.<number>} x - Vectors that should be summed
 * @return {Array.<number>} Sum of vectors
 */
export function sum(...x) {
  return x.reduce((r, a) => r.map((b, i) => b + a[i]));
}

/**
 * Multiply a vector by a scalar (i.e. scale the vector).
 *
 * @param {Array.<number>} x - Vector
 * @param {number} c - Scalar
 * @return {Array.<number>} Scaled vector
 */
export function scale(x, c) {
  return x.map(a => c * a);
}

/**
 * Sum all elements of an array.
 *
 * @param {Array.<number>} A - Array
 * @return {number} Sum of all vector elements
 */
export function internalSum(A) {
  return A.reduce((r, B) => r + (Array.isArray(B) ? internalSum(B) : B), 0);
}

/**
 * Get a copy of an array with absolute values of the original array entries.
 *
 * @param {Array.<mixed>} A Array to get absolute values array from
 * @return {Array.<mixed>} Array with absolute values
 */
export function abs(A) {
  return A.map(B => (Array.isArray(B) ? abs(B) : Math.abs(B)));
}

/**
 * Randomly permute the rows of a matrix.
 *
 * @param {Array.<Array.<mixed>>} S Matrix
 * @param {Array.<Array.<mixed>>} ... Other matrices to permute in the same way
 * @return {Array.<Array.<mixed>>} Permuted matrix
 */
export function permuteRows(...S) {
  // Copy matrices
  const SPermutated = S.map(A => A.slice());

  // Number of remaining rows
  let remainingRows = SPermutated[0].length;

  while (remainingRows > 0) {
    // Select a random element from the remaining rows and swap it with the first element that has
    // not yet been assigned
    const swapIndex = Math.floor(Math.random() * remainingRows);

    for (let i = 0; i < SPermutated.length; i += 1) {
      const tmpRow = SPermutated[i][remainingRows - 1];

      SPermutated[i][remainingRows - 1] = SPermutated[i][swapIndex];
      SPermutated[i][swapIndex] = tmpRow;
    }

    remainingRows -= 1;
  }

  return SPermutated;
}

/**
 * Permute the axes of an input array. In other words, you can interchange the axes of an
 * n-dimensional input array.
 *
 * @param {Array.<mixed>} A - Array of which the axes should be permuted
 * @param {Array.<number>} newAxes - For the i-th element of this array, specify the index of the
 *   axis in the original array that should be used
 * @return {Array.<mixed>} Array with permuted axes
 */
export function permuteAxes(A, newAxes) {
  // Shape of the input array
  const oldShape = getShape(A);

  // Initialize the output array as all-zeros
  const newShape = newAxes.map(x => oldShape[x]);
  let APermuted = zeros(newShape);

  // Axes are permuted by, for all old array indices, copying the value at that position to the
  // corresponding new position in the output array. This is a really naive algorithm, and could
  // be optimized. The function below iterates over all indices in the i-th original array
  // dimension, and is recursively called until the last dimension is reached
  const permuteAxesStep = (index, step) => {
    for (let i = 0; i < oldShape[step]; i += 1) {
      const oldIndex = [...index, i];

      if (step < oldShape.length - 1) {
        permuteAxesStep(oldIndex, step + 1);
      } else {
        const newIndex = newAxes.map(axis => oldIndex[axis]);
        APermuted = setArrayElement(APermuted, newIndex, getArrayElement(A, oldIndex));
      }
    }
  };

  permuteAxesStep([], 0);

  return APermuted;
}

/**
 * Recursively flatten an array.
 *
 * @param {Array.<mixed>} A - Array to be flattened
 * @return {Array.<mixed>} Flattened array
 */
export function flatten(A) {
  return [].concat(...A.map(x => (Array.isArray(x) ? flatten(x) : x)));
}

/**
 * Get the transpose of a matrix or vector.
 *
 * @param {Array.<Array.<number>>} A - Matrix or vector
 * @return {Array.<Array.<number>>} Transpose of the matrix
 */
export function transpose(A) {
  const ATranspose = zeros([A[0].length, A.length]);

  for (let i = 0; i < A.length; i += 1) {
    for (let j = 0; j < A[0].length; j += 1) {
      ATranspose[j][i] = A[i][j];
    }
  }

  return ATranspose;
}

/**
 * Generate a mesh grid, i.e. two m-by-n arrays where m=|y| and n=|x|, from two vectors. The mesh
 * grid generates two grids, where the first grid repeats x row-wise m times, and the second grid
 * repeats y column-wise n times. Can be used to generate coordinate grids.
 *
 * Example input: x=[0, 1, 2], y=[2, 4, 6, 8]
 * Corresponding output:
 *   matrix 1: [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]
 *   matrix 2: [[2, 2, 2], [4, 4, 4], [6, 6, 6], [8, 8, 8]]
 *
 * @param {Array.<number>} x - Vector of x-coordinates
 * @param {Array.<number>} y - Vector of y-coordinates
 * @return {Array.<Array.<Array.<number>>>} Two-dimensional array containing the x-grid as the first
 *   element, and the y-grid as the second element
 */
export function meshGrid(x, y) {
  const gridX = transpose(repeat(1, y.length, x));
  const gridY = repeat(1, x.length, y);

  return [gridX, gridY];
}

/**
 * Reshape an array into a different shape.
 *
 * @param {Array.<mixed>} A - Array to reshape
 * @param {Array.<number>} shape - Array specifying the number of elements per dimension. n-th
 *   element corresponds to the number of elements in the n-th dimension.
 * @return {Array.<mixed>} Reshaped array
 */
export function reshape(A, shape) {
  const AValues = flatten(A);

  let B = zeros(shape);

  const counters = zeroVector(shape.length);
  let counterIndex = counters.length - 1;

  let counterTotal = 0;

  let done = false;

  while (!done) {
    B = setArrayElement(B, counters, AValues[counterTotal]);

    // Increment current counter
    counterIndex = counters.length - 1;
    counters[counterIndex] += 1;
    counterTotal += 1;

    // If the end of the current counter is reached, move to the next counter...
    while (counters[counterIndex] === shape[counterIndex]) {
      // ...unless we have reached the end of all counters. In that case, we are done
      if (counterIndex === 0) {
        done = true;
      }

      counters[counterIndex - 1] += 1;
      counters[counterIndex] = 0;
      counterIndex -= 1;
    }
  }

  return B;
}

/**
 * Extract a sub-block of a matrix of a particular shape at a particular position.
 *
 * @deprecated Use slice() instead
 *
 * @param {Array.<mixed>} A - Array to extract block from
 * @param {Array.<number>} offset -  Array specifying the offset per dimension. n-th element
 *   corresponds to the number of elements to skip, before extracting the block, in the n-th
 *   dimension.
 * @param {Array.<number>} shape - Array specifying the number of elements per dimension. n-th
 *   element corresponds to the number of elements in the n-th dimension.
 * @return {Array.<mixed>} Sub-block extracted from array
 */
export function subBlock(A, offset, shape) {
  if (offset.length === 1) {
    return A.slice(offset[0], offset[0] + shape[0]);
  }

  const subblock = [];

  for (let i = offset[0]; i < offset[0] + shape[0]; i += 1) {
    subblock.push(subBlock(A[i], offset.slice(1), shape.slice(1)));
  }

  return subblock;
}

/**
 * Take a slice out of an input array. Negative indices can be used in both the starting indices and
 * the stopping indices. Negative indices: the negative stopping index is used as the negative
 * offset relative to the last index in the particular dimension.
 *
 * @param {Array.<mixed>} A - Array to extract block from
 * @param {Array.<number>} start -  Array specifying the starting index per dimension. n-th element
 *   corresponds to the number of elements to skip, before extracting the block, in the n-th
 *   dimension. Negative indices are supported.
 * @param {Array.<number>} stop - Array specifying the index to stop at (exclusive) per dimension.
 *   n-th element corresponds to the stopping index in the n-th dimension. Negative indices are
 *   supported. Use null for unlimited offset.
 * @return {Array.<mixed>} Array slice extracted from input array
 */
export function slice(A, start, stop) {
  // Check whether the same number of start and stop indices is supplied
  if (start.length !== stop.length) {
    throw new Error('"start" and "stop" must contain the same number of indices.');
  }

  // Check whether the number of dimensions to slice on does not exceed the number of dimensions of
  // the array
  if (start.length > getShape(A).length) {
    throw new Error('The number of start and stop indices must not exceed the number of input array dimensions');
  }

  // Parse start and end indices for highest dimension
  const parseIndex = (index, allowNull) => {
    if (allowNull && index === null) {
      return A.length;
    }

    if (index < 0) {
      return A.length + index;
    }

    return index;
  };

  const parsedStart = parseIndex(start[0], false);
  const parsedStop = parseIndex(stop[0], true);

  // If this is the deepest dimension where we should slice, simply slice the array
  if (start.length === 1) {
    return A.slice(parsedStart, parsedStop);
  }

  // If it isn't the deepest dimension to slice, slice in the sub-array
  const subslice = [];

  for (let i = parsedStart; i < parsedStop; i += 1) {
    subslice.push(slice(A[i], start.slice(1), stop.slice(1)));
  }

  return subslice;
}
