var jsmlt =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Linear Algebra toolkit for manipulating vectors and matrices. Mainly works using plain
 * JavaScript arrays.
 */

/**
 * Find the shape of an array, i.e. the number of elements per dimension of the array
 *
 * @param Array[...[mixed]] A Array to find shape of
 * @return Array[Number] shape  Array specifying the number of elements per dimension. n-th element
 *                corresponds to the number of elements in the n-th dimension.
 */
function getShape(A) {
  if (!Array.isArray(A)) {
    return [];
  }

  const B = getShape(A[0]);
  B.unshift(A.length);

  return B;
}

/**
 * Generate n points on the interval (a,b), with intervals (b-a)/(n-1)
 *
 * @param Number a Starting point
 * @param Number a Ending point
 * @param Integer n Number of points
 */
function linspace(a, b, n) {
  const r = [];

  for (let i = 0; i < n; i += 1) {
    r.push(a + i * ((b - a) / (n - 1)));
  }

  return r;
}

/**
 * Initialize a vector of a certain length with a specific value in each entry
 *
 * @param Integer n Number of elements in the vector
 * @param mixed value Value to initialize entries at
 * @return Array Vector of n elements of the specified value
 */
function valueVector(n, value) {
  return [...Array(n)].map(() => value);
}

/**
 * Initialize an n-dimensional array of a certain value
 *
 * @param Array[Number] shape Array specifying the number of elements per dimension. n-th element
 *                corresponds to the number of elements in the n-th dimension.
 * @param mixed value     Value to fill the array with
 * @return Array[...[mixed]]  Array of the specified with zero in all entries
 */
function full(shape, value) {
  if (shape.length === 1) {
    return valueVector(shape[0], value);
  }

  return [...Array(shape[0])].map(() => full(shape.slice(1), value));
}

/**
 * Initialize a zero vector of a certain length
 *
 * @param Integer n Number of elements in the vector
 * @return Array Vector of n elements of value 0
 */
function zeroVector(n) {
  return valueVector(n, 0);
}

/**
 * Initialize an n-dimensional array of zeros
 *
 * @param Array[Number] shape Array specifying the number of elements per dimension. n-th element
 *                corresponds to the number of elements in the n-th dimension.
 * @return Array[...[mixed]]  Array of the specified with zero in all entries
 */
function zeros(shape) {
  return full(shape, 0);
}

/**
 * Set all entries in an array to a specific value
 *
 * @param Array[...[mixed]] A Array of which entries should be changed
 * @param mixed value Value the array entries should be changed to
 * @return Array[...[mixed]] Array with modified entries
 */
function fill(A, value) {
  return A.map(B => (Array.isArray(B) ? fill(B, value) : value));
}

/**
 * Concatenate two or more n-dimensional arrays.
 *
 * @param Integer axis Axis to perform concatenation on
 * @param Array[...[mixed]] ...S  Arrays to concatenate. They must have the same shape, except
 *                  in the dimension corresponding to axis (the first, by default)
 * @return Array Concatenated array
 */
function concatenate(axis, ...S) {
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
 * an array with itself
 *
 * @param Integer axis Axis to perform repetition on
 * @param Integer numRepeats Number of times to repeat the array
 * @param Array[...[mixed]] A Array to repeat
 * @return Array[...[mixed]] Specified array repeated numRepeats times
 */
function repeat(axis, numRepeats, A) {
  let R = A.slice();

  for (let i = 0; i < numRepeats - 1; i += 1) {
    R = concatenate(axis, R, A);
  }

  return R;
}

/**
 * Pad an array along one or multiple axes
 *
 * @param Array[...[mixed]] A Array to be padded
 */
function pad(A, paddingLengths = [[1, 1]], paddingValues = [[0, 0]], axes = []) {
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
 * @param Array[Number] x First vector
 * @param Array[Number] y Second vector
 * @return Number Dot product scalar result
 */
function dot(x, y) {
  return x.reduce((r, a, i) => r + a * y[i], 0);
}

/**
 * Calculate the Euclidian norm of a vector
 *
 * @param Array[Number] x Vector of which to calculate the norm
 */
function norm(x) {
  return Math.sqrt(dot(x, x));
}

/**
 * Calculate sum of two vectors. Vectors should have same size.
 *
 * @param Array[Number] x First vector
 * @param Array[Number] y Second vector
 * @return Array[Number] Sum of vectors
 */
function sum(x, y) {
  return x.map((a, i) => a + y[i]);
}

/**
 * Multiply a vector by a scalar (i.e. scale the vector)
 *
 * @param Array[Number] x Vector
 * @param Number c Scalar
 * @return Array[Number] Scaled vector
 */
function scale(x, c) {
  return x.map(a => c * a);
}

/**
 * Sum all elements of an array
 *
 * @param Array[...[Number]] x Array
 * @return Number Sum of all vector elements
 */
function internalSum(A) {
  return A.reduce((r, B) => r + (Array.isArray(B) ? internalSum(B) : B), 0);
}

/**
 * Get a copy of an array with absolute values of the original array entries
 *
 * @param Array[...[Number]] A Array to get absolute values array from
 * @return Array[...[Number]] Array with absolute values
 */
function abs(A) {
  return A.map(B => (Array.isArray(B) ? abs(B) : Math.abs(B)));
}

/**
 * Randomly permute the rows of a matrix
 *
 * @param Array[Array[mixed]] S Matrix
 * @param Array[Array[mixed]] ... Other matrices to permute in the same way
 * @param Array[Array]
 * @return Array[Array[mixed]] Permuted matrix
 */
function permuteRows(...S) {
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
 * Recursively flatten an array
 *
 * @param Array[...[mixed]] A Array to be flattened
 * @return Array[mixed] Flattened array
 */
function flatten(A) {
  return [].concat(...A.map(x => (Array.isArray(x) ? flatten(x) : x)));
}

/**
 * Get the transpose of a matrix or vector
 *
 * @param Array[Array[Number]] A Matrix or vector
 * @return Array[Array[Number]] Transpose of the matrix
 */
function transpose(A) {
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
 * repeats y column-wise n times. Can be used to generate coordinate grids
 *
 * Example input: x=[0, 1, 2], y=[2, 4, 6, 8]
 * Corresponding output:
 *   matrix 1: [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]]
 *   matrix 2: [[2, 2, 2], [4, 4, 4], [6, 6, 6], [8, 8, 8]]
 *
 * @param Array[Number] x Vector of x-coordinates
 * @param Array[Number] y Vector of y-coordinates
 * @return [Array[Array[Number]], Array[Array[Number]]] Grids
 */
function meshGrid(x, y) {
  const gridX = transpose(repeat(1, y.length, x));
  const gridY = repeat(1, x.length, y);

  return [gridX, gridY];
}

/**
 * Set an arbitrary element in an array, using another array to determine the index inside the array
 *
 * @param Array[...[mixed]] A Array to set an element in
 * @param Array[Number] index Indices to find array element. n-th element corresponds to index in
 *                            n-th dimension
 * @param mixed value New element value at index
 */
function setArrayElement(A, index, value) {
  const B = A.slice();

  B[index[0]] = index.length === 1 ? value : setArrayElement(A[index[0]], index.slice(1), value);
  return B;
}

/**
 * Reshape an array into a different shape
 *
 * @param Array[...[mixed]] A Array to reshape
 * @param Array[Number] shape Array specifying the number of elements per dimension. n-th element
 *                corresponds to the number of elements in the n-th dimension.
 * @return Array[...[mixed]] Reshaped array
 */
function reshape(A, shape) {
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
 * Extract a sub-block of a matrix of a particular shape at a particular position
 *
 * @param Array[...[mixed]] A Array to extract block from
 * @param Array[Number] offset  Array specifying the offset per dimension. n-th element corresponds
 *                to the number of elements to skip, before extracting the block, in the n-th
 *                dimension.
 * @param Array[Number] shape Array specifying the number of elements per dimension. n-th element
 *                corresponds to the number of elements in the n-th dimension.
 * @return Array[...[mixed]]  Sub-block extracted from array
 */
function subBlock(A, offset, shape) {
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
 * Get an arbitrary element from an array, using another array to determine the index inside the
 * first array
 *
 * @param Array[...[mixed]] A Array to get an element from
 * @param Array[Number] index Indices to find array element. n-th element corresponds to index in
 *                            n-th dimension
 * @return mixed Array element value at index
 */
function getArrayElement(A, index) {
  if (index.length === 1) {
    return A[index];
  }

  return getArrayElement(A[index[0]], index.slice(1));
}

/* harmony default export */ __webpack_exports__["a"] = ({
  linspace,
  zeroVector,
  valueVector,
  zeros,
  full,
  fill,
  pad,
  getShape,
  dot,
  norm,
  sum,
  scale,
  internalSum,
  abs,
  permuteRows,
  flatten,
  concatenate,
  transpose,
  meshGrid,
  repeat,
  reshape,
  subBlock,
  setArrayElement,
  getArrayElement,
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Take a slice out of an array, but wrap around the beginning an end of the array. For example,
 * if `begin` is -1, the last element of the input array is used as the first output element.
 *
 * @param int begin Index of first array element
 * @param int end Index of end of slice range (element with this index will itself not be
 *   included in output)
 * @return Array[mixed] Sliced array
 */
function wrapSlice(array, begin, end) {
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
function zipWithIndex(array) {
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
function valueCounts(array) {
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
function argMax(array) {
  if (array.length === 0) {
    return null;
  }

  return zipWithIndex(array).reduce((r, x) => (x[0] > r[0] ? x : r))[1];
}

/* harmony default export */ __webpack_exports__["a"] = ({
  wrapSlice,
  zipWithIndex,
  valueCounts,
  argMax,
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Classifier {
  constructor() {
    /**
     * Dictionary mapping class labels to class indices.
     *
     * @var dict[string => int]
     */
    this.labelsClassIndex = {};

    /**
     * Array of class labels for class indices
     *
     * @var Array[string]
     */
    this.classIndicesLabel = [];

    /**
     * Number of unique class labels
     *
     * @var int
     */
    this.numLabels = 0;
  }

  /**
   * Reset class labels corresponding to indices to empty
   */
  resetLabelsClassIndex() {
    this.labelsClassIndex = {};
    this.classIndicesLabel = [];
    this.numLabels = 0;
  }

  /**
   * Get the class index corresponding to a label, creating it if it doesn't exist
   *
   * @param string label Class label
   * @return int Class index corresponding to given class label
   */
  getOrCreateLabelClassIndex(label) {
    const labelString = label.toString();

    if (typeof this.labelsClassIndex[labelString] === 'undefined') {
      this.labelsClassIndex[labelString] = this.numLabels;
      this.classIndicesLabel.push(labelString);
      this.numLabels += 1;
    }

    return this.labelsClassIndex[labelString];
  }

  /**
   * Get the class index corresponding to a label
   *
   * @param string label Class label
   * @return int Class index corresponding to given class label. Returns -1 if class with the label
   *   doesn't exist
   */
  getLabelClassIndex(label) {
    const labelString = label.toString();

    if (typeof this.labelsClassIndex[labelString] === 'undefined') {
      return -1;
    }

    return this.labelsClassIndex[label];
  }

  /**
   * Get the label corresponding to a class index
   *
   * @param int classIndex Class index
   * @return string Class label corresponding to given class index. Returns -1 if class with the
   *   index doesn't exist
   */
  getClassIndexLabel(classIndex) {
    return (typeof this.classIndicesLabel[classIndex] === 'undefined') ? -1 : this.classIndicesLabel[classIndex];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Classifier);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Kernel {
}

/* harmony default export */ __webpack_exports__["a"] = (Kernel);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classifier__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
// Internal dependencies



/**
 * Binary classifier base class, intended to be extended by binary classifiers that support
 * callback via a OneVsAll classifier.
 */
class BinaryClassifier extends __WEBPACK_IMPORTED_MODULE_0__classifier__["a" /* default */] {
  constructor() {
    super();

    /**
     * Object to store training data
     *
     * @var dict
     */
    this.training = {
      features: [],
      labels: [],
    };
  }

  /**
   * Load training data from arrays and store it in the class
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   * @param bool positiveClass Optional. Whether a specific class should be marked as the positive
   *   class. Relevant for output like "raw" or "normalized" where one wants to know to which class
   *   each side of the boundary corresponds. Defaults to null
   */
  loadTrainingData(features, labels, positiveClass = null) {
    // Check to make sure number of labels matches number of feature sets
    if (features.length !== labels.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Format labels
    const uniqueLabels = Array.from(new Set(labels));

    if (uniqueLabels.length > 2) {
      throw new Error('No more than 2 unique class labels should be passed to a BinaryClassifier. Two class labels are distinct if their string representations are inequal.');
    }

    if (positiveClass !== null
      && uniqueLabels.includes(positiveClass)
      && uniqueLabels.length === 2
      ) {
      this.getOrCreateLabelClassIndex(uniqueLabels[1 - uniqueLabels.indexOf(positiveClass)]);
    }

    // Store data points
    this.training.features = features;
    this.training.labels = labels.map(x => this.getOrCreateLabelClassIndex(x));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BinaryClassifier);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__kernel__ = __webpack_require__(3);
// Internal dependencies



class LinearKernel extends __WEBPACK_IMPORTED_MODULE_1__kernel__["a" /* default */] {
  apply(x, y) {
    return __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].dot(x, y);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LinearKernel);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binaryclassifier__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
// Internal dependencies



/**
 * Perceptron learner for binary classification problem.
 */
class BinaryPerceptron extends __WEBPACK_IMPORTED_MODULE_0__binaryclassifier__["a" /* default */] {
  constructor() {
    super();

    this.weights = null;
  }

  /**
   * Initialize weights vector to zero. Here, the number of weights equals one plus the number of
   * features, where the first weight (w0) is the weight used for the bias.
   */
  initializeWeights() {
    this.weights = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].zeroVector(1 + this.training.features[0].length);
  }

  /**
   * Get the signed value of the class index. Returns -1 for class index 0, 1 for class index 1
   *
   * @param int classIndex Class index
   * @return int Sign corresponding to class index
   */
  getClassIndexSign(classIndex) {
    return classIndex * 2 - 1;
  }

  /**
   * Get the class index corresponding to a sign
   *
   * @param int sign Sign
   * @return int Class index corresponding to sign
   */
  getSignClassIndex(sign) {
    return (sign + 1) / 2;
  }

  /**
   * Train the Perceptron algorithm on a dataset
   *
   * @param Array[Array[Number]] features Optional. Features per data point. If null, uses features
   *   and labels stored using loadTrainingData. Defaults to null
   * @param Array[mixed] labels Optional. Class labels per data point. If null, uses features and
   *   labels stored using loadTrainingData. Defaults to null
   * @param bool positiveClass Optional. Whether a specific class should be marked as the positive
   *   class. Relevant for output like "raw" or "normalized" where one wants to know to which class
   *   each side of the boundary corresponds. Defaults to null
   */
  train(features = null, labels = null, positiveClass = null) {
    if (features !== null && labels !== null) {
      // Load training data
      this.loadTrainingData(features, labels, positiveClass);
    }

    // Weights increment to check for convergence
    this.weightsIncrement = Infinity;

    // Initialize weights vector to zero
    this.initializeWeights();

    // Store historic errors
    const epochNumErrors = [];

    // Iteration index
    let epoch = 0;

    // A single iteration of this loop corresponds to a single iteration of training all data
    // points in the data set
    while (true) {
      const [numErrors, weightsIncrement] = this.trainIteration();
      epochNumErrors.push(numErrors);

      if (weightsIncrement.reduce((r, a) => r + Math.abs(a), 0) < 0.0001 || epoch > 100) {
        break;
      }

      epoch += 1;
    }
  }

  /**
   * Train the classifier for a single iteration on the stored training data
   */
  trainIteration() {
    // Initialize the weights increment vector, which is used to increment the weights in each
    // iteration after the calculations are done.
    let weightsIncrement = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].zeroVector(this.weights.length);

    // Initialize number of misclassified points
    let numErrors = 0;

    // Shuffle data points
    const [features, labels] = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].permuteRows(this.training.features, this.training.labels);

    // Loop over all datapoints
    for (let i = 0; i < this.training.features.length; i += 1) {
      // Transform binary class index to class sign (0 becomes -1 and 1 remains 1)
      const classSign = this.getClassIndexSign(labels[i]);

      // Copy features vector so it is not changed in the datapoint
      const augmentedFeatures = features[i].slice();

      // Add feature with value 1 at the beginning of the feature vector to correpond with the
      // bias weight
      augmentedFeatures.unshift(1);

      // Calculate output
      const output = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].dot(augmentedFeatures, this.weights);

      // Check whether the point was correctly classified
      if (classSign * output <= 0) {
        // Increase the number of errors
        numErrors += 1;

        // Update the weights change to be used at the end of this epoch
        weightsIncrement = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].sum(weightsIncrement, __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].scale(augmentedFeatures, classSign));
      }
    }

    // Take average of all weight increments
    this.weightsIncrement = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].scale(weightsIncrement, 0.01 / this.training.features.length);
    this.weights = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].sum(this.weights, this.weightsIncrement);

    return [numErrors, weightsIncrement];
  }

  /**
   * Check whether training has convergence when using iterative training using trainIteration
   *
   * @return bool Whether the algorithm has converged
   */
  checkConvergence() {
    return __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].internalSum(__WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].abs(this.weightsIncrement)) < 0.0001;
  }

  /**
   * Make a prediction for a data set
   *
   * @param Array[Array[mixed]] Features for each data point
   * @param Object optionsUser Optional. Additional options:
   *    @prop string output Output for predictions. Either "classLabels" (default, output predicted
   *       class label), "raw" (dot product of weights vector with augmented features vector) or
   *       "normalized" (dot product from "raw" but with unit-length weights)
   *
   * @return Array[mixed] Predictions. Output dependent on options.output, defaults to class labels
   */
  predict(features, optionsUser = {}) {
    // Options
    const optionsDefault = {
      output: 'classLabels', // 'classLabels', 'normalized' or 'raw'
    };

    const options = Object.assign({}, optionsDefault, optionsUser);

    // Predictions
    const predictions = [];

    // Normalization factor for normalized output
    const weightsMagnitude = Math.sqrt(__WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].dot(this.weights, this.weights));

    // Loop over all datapoints
    for (let i = 0; i < features.length; i += 1) {
      // Copy features vector so it is not changed in the datapoint
      const augmentedFeatures = features[i].slice();

      // Add feature with value 1 at the beginning of the feature vector to correpond with the
      // bias weight
      augmentedFeatures.unshift(1);

      // Calculate output
      let output = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].dot(augmentedFeatures, this.weights);

      // Store prediction
      if (options.output === 'raw') {
        // Raw output: do nothing
      } else if (options.output === 'normalized') {
        // Normalized output
        output /= weightsMagnitude;
      } else {
        // Class label output
        predictions.push(this.getClassIndexLabel(this.getSignClassIndex(output > 0 ? 1 : -1)));
      }

      predictions.push(output);
    }

    return predictions;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BinaryPerceptron);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binaryclassifier__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_random__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classification_linearkernel__ = __webpack_require__(5);
// Internal dependencies





/**
 * SVM learner for binary classification problem
 */
class BinarySVM extends __WEBPACK_IMPORTED_MODULE_0__binaryclassifier__["a" /* default */] {
  /**
   * Constructor
   *
   * @param dict optionsUser User-defined options for SVM. See method implementation for details
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      C: 100.0, // Regularization (i.e. penalty for slack variables)
      kernel: null, // Kernel. Defaults to null (which is checked to instantiate the linear kernel),
      convergenceNumPasses: 10, // Number of passes without alphas changing to treat the algorithm
                                 // as converged
      numericalTolerance: 1e-4, // Numerical tolerance for a value in the to be equal to another
                                // SMO algorithm to be equal to another value
    };

    const options = Object.assign({}, optionsDefault, optionsUser);

    // Set options
    this.C = options.C;
    this.kernel = options.kernel === null ? new __WEBPACK_IMPORTED_MODULE_3__classification_linearkernel__["a" /* default */]() : options.kernel;
    this.numericalTolerance = options.numericalTolerance;
    this.convergenceNumPasses = options.convergenceNumPasses;

    this.supportVectors = [];
    this.kernelCache = null;
    this.kernelCacheStatus = null;
  }

  /**
   * Get the signed value of the class index. Returns -1 for class index 0, 1 for class index 1
   *
   * @param int classIndex Class index
   * @return int Sign corresponding to class index
   */
  getClassIndexSign(classIndex) {
    return classIndex * 2 - 1;
  }

  /**
   * Get the class index corresponding to a sign
   *
   * @param int sign Sign
   * @return int Class index corresponding to sign
   */
  getSignClassIndex(sign) {
    return (sign + 1) / 2;
  }

  /**
   * Train the binary SVM algorithm on a dataset
   *
   * @param Array[Array[Number]] features Optional. Features per data point. If null, uses features
   *   and labels stored using loadTrainingData. Defaults to null
   * @param Array[mixed] labels Optional. Class labels per data point. If null, uses features and
   *   labels stored using loadTrainingData. Defaults to null
   * @param bool positiveClass Optional. Whether a specific class should be marked as the positive
   *   class. Relevant for "raw" or "normalized" output where one wants to know to which class each
   *   side of the boundary corresponds. Defaults to null
   */
  train(features = null, labels = null, positiveClass = null) {
    if (features !== null || labels !== null) {
      // Load training data
      this.loadTrainingData(features, labels, positiveClass);
    }

    // Number of training samples
    const numSamples = this.training.features.length;

    // Alphas (Lagrange multipliers)
    this.alphas = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].zeroVector(numSamples);

    // Bias term
    this.b = 0.0;

    // Kernel cache
    this.kernelCache = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].full([numSamples, numSamples], 0.0);
    this.kernelCacheStatus = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].full([numSamples, numSamples], false);

    // Number of passes of the algorithm without any alphas changing
    let numPasses = 0;

    // Shorthand notation for features and labels
    const X = this.training.features;
    const Y = this.training.labels.map(x => this.getClassIndexSign(x));

    while (numPasses < this.convergenceNumPasses) {
      let alphasChanged = 0;

      // Loop over all training samples
      for (let i = 0; i < numSamples; i += 1) {
        // Calculate offset to the 1-margin of sample i
        const ei = this.sampleMargin(X[i]) - Y[i];

        // Check whether the KKT constraints were violated
        if ((Y[i] * ei < -this.numericalTolerance && this.alphas[i] < this.C)
          || (Y[i] * ei > this.numericalTolerance && this.alphas[i] > 0)) {
          /* Now, we need to update \alpha_i as it violates the KKT constraints */

          // Thus, we pick a random \alpha_j such that j does not equal i
          let j = __WEBPACK_IMPORTED_MODULE_2__util_random__["a" /* default */].randint(0, numSamples - 1);
          if (j >= i) j += 1;

          // Calculate offset to the 1-margin of sample j
          const ej = this.sampleMargin(X[j]) - Y[j];

          // Calculate lower and upper bounds for \alpha_j
          const [boundL, boundH] = this.calculateAlphaBounds(i, j);

          if (Math.abs(boundH - boundL) < this.numericalTolerance) {
            // Difference between bounds is practically zero, so there's not much to optimize.
            // Continue to next sample.
            continue;
          }

          // Calculate second derivative of cost function from Lagrange dual problem. Note
          // that a_i = (g - a_j * y_j) / y_i, where g is the negative sum of all a_k * y_k where
          // k is not equal to i or j
          const Kij = this.applyKernel(i, j);
          const Kii = this.applyKernel(i, i);
          const Kjj = this.applyKernel(j, j);
          const eta = 2 * Kij - Kii - Kjj;

          if (eta >= 0) {
            continue;
          }

          // Compute new \alpha_j
          const oldAlphaJ = this.alphas[j];
          let newAlphaJ = oldAlphaJ - Y[j] * (ei - ej) / eta;
          newAlphaJ = Math.min(newAlphaJ, boundH);
          newAlphaJ = Math.max(newAlphaJ, boundL);

          // Don't update if the difference is too small
          if (Math.abs(newAlphaJ - oldAlphaJ) < this.numericalTolerance) {
            continue;
          }

          // Compute new \alpha_i
          const oldAlphaI = this.alphas[i];
          const newAlphaI = oldAlphaI + Y[i] * Y[j] * (oldAlphaJ - newAlphaJ);

          // Update \alpha_j and \alpha_i
          this.alphas[j] = newAlphaJ;
          this.alphas[i] = newAlphaI;

          // Update the bias term, interpolating between the bias terms for \alpha_i and \alpha_j
          const b1 = this.b - ei - Y[i] * (newAlphaI - oldAlphaI) * Kii
                       - Y[j] * (newAlphaJ - oldAlphaJ) * Kij;
          const b2 = this.b - ej - Y[i] * (newAlphaI - oldAlphaI) * Kij
                       - Y[j] * (newAlphaJ - oldAlphaJ) * Kjj;

          if (newAlphaJ > 0 && newAlphaJ < this.C) {
            this.b = b2;
          } else if (newAlphaI > 0 && newAlphaI < this.C) {
            this.b = b1;
          } else {
            this.b = (b1 + b2) / 2;
          }

          alphasChanged += 1;
        }
      }

      if (alphasChanged === 0) {
        numPasses += 1;
      } else {
        numPasses = 0;
      }
    }

    this.supportVectors = this.alphas.map(x => x > 1e-6);
  }

  /**
   * Calculate the margin (distance to the decision boundary) for a single sample
   *
   * @param Array[Number]|int sample Sample features array or training sample index
   * @return double Distance to decision boundary
   */
  sampleMargin(sample) {
    let rval = this.b;

    for (let i = 0; i < this.training.features.length; i += 1) {
      const k = this.applyKernel(sample, i);
      rval += this.getClassIndexSign(this.training.labels[i]) * this.alphas[i] * k;
    }

    return rval;
  }

  /**
   * Apply the kernel to two data points. Accepts both feature arrays and training data point
   * indices for x and y. If x and y are integers, attempts to fetch the kernel result for the
   * corresponding training data points from cache, and computes and stores the result in cache if
   * it isn't found
   *
   * @param Array[Number]|int x Feature vector or data point index for first data point. Arrays are
   *                            treated as feature vectors, integers as training data point indices
   * @param Array[Number]|int y Feature vector or data point index for second data point. Arrays are
   *                            treated as feature vectors, integers as training data point indices
   * @return Number Kernel result
   */
  applyKernel(x, y) {
    const fromCache = (typeof x === 'number' && typeof y === 'number');

    if (fromCache && this.kernelCacheStatus[x][y] === true) {
      return this.kernelCache[x][y];
    }

    const xf = (typeof x === 'number') ? this.training.features[x] : x;
    const yf = (typeof y === 'number') ? this.training.features[y] : y;
    const result = this.kernel.apply(xf, yf);

    if (fromCache) {
      this.kernelCache[x][y] = result;
      this.kernelCacheStatus[x][y] = true;
    }

    return result;
  }

  /**
   * Calculate the bounds on \alpha_j to make sure it can be clipped to the [0,C] box and that it
   * can be chosen to satisfy the linear equality constraint stemming from the fact that the sum of
   * all products y_i * a_i should equal 0.
   *
   * @param int i Index of \alpha_i
   * @param int j Index of \alpha_j
   * @return [int, int] Lower and upper bound
   */
  calculateAlphaBounds(i, j) {
    let boundL;
    let boundH;

    if (this.training.labels[i] === this.training.labels[j]) {
      // The alphas lie on a line with slope -1
      boundL = this.alphas[j] - (this.C - this.alphas[i]);
      boundH = this.alphas[j] + this.alphas[i];
    } else {
      // The alphas lie on a line with slope 1
      boundL = this.alphas[j] - this.alphas[i];
      boundH = this.alphas[j] + (this.C - this.alphas[i]);
    }

    boundL = Math.max(0, boundL);
    boundH = Math.min(this.C, boundH);

    return [boundL, boundH];
  }

  /**
   * Make a prediction for a data set
   *
   * @param Array[Array[mixed]] Features for each data point
   * @param Object optionsUser Optional. Additional options:
   *    @prop string output Output for predictions. Either "classLabels" (default, output predicted
   *       class label), "raw" or "normalized" (both output margin (distance to decision boundary)
   *       for each sample)
   *
   * @return Array[mixed] Predictions. Output dependent on options.output, defaults to class labels
   */
  predict(features, optionsUser) {
    // Options
    const optionsDefault = {
      output: 'classLabels', // 'classLabels', 'normalized' or 'raw'
    };

    const options = Object.assign({}, optionsDefault, optionsUser);

    return features.map((x) => {
      let output = this.sampleMargin(x);

      // Store prediction
      if (options.output === 'raw' || options.output === 'normalized') {
        // Raw output: do nothing
      } else {
        // Class label output
        output = this.getClassIndexLabel(this.getSignClassIndex(output > 0 ? 1 : -1));
      }

      return output;
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BinarySVM);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Generate a random integer between a lower bound (inclusive) and an upper bound (exclusive)
 *
 * @param int a Lower bound (inclusive)
 * @param int b Upper bound (exclusive)
 */
function randint(a, b) {
  return a + Math.floor((b - a) * Math.random());
}

/* harmony default export */ __webpack_exports__["a"] = ({
  randint,
});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classifier__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_arrays__ = __webpack_require__(1);
// Internal dependencies




class OneVsAll extends __WEBPACK_IMPORTED_MODULE_0__classifier__["a" /* default */] {
  constructor() {
    super();

    /**
     * Object to store training data
     *
     * @var dict
     */
    this.training = {
      features: [],
      labels: [],
    };

    /**
     * List of classifiers. One classifier per class label/index
     *
     * @var Array
     */
    this.classifiers = [];

    /**
     * Event listeners bound to the canvas
     *
     * @var Map
     */
    this.listeners = new Map();
  }

  /**
   * Create a binary classifier for one of the classes
   *
   * @param int classIndex Class index of the positive class for the binary classifier
   * @return BinaryClassifier Binary classifier
   */
  createClassifier(classIndex) {
    return null;
  }

  /**
   * Create all binary classifiers. Creates one classifier per class
   */
  createClassifiers() {
    // Get unique labels
    const uniqueClassIndices = Array.from(new Set(this.training.labels));

    // Initialize label set and classifier for all labels
    this.classifiers = uniqueClassIndices.map((classIndex) => {
      const classifier = this.createClassifier(classIndex);
      return classifier;
    });
  }

  /**
   * Train all binary classifiers one-by-one
   */
  trainBatch() {
    this.classifiers.forEach(x => x.train());
  }

  /**
   * Train all binary classifiers iteration by iteration, i.e. start with the first training
   * iteration for each binary classifier, then execute the second training iteration for each
   * binary classifier, and so forth. Can be used when one needs to keep track of information per
   * iteration, e.g. accuracy
   */
  trainIterative() {
    let remainingClassIndices = Array.from(new Set(this.training.labels));

    let epoch = 0;

    while (epoch < 100 && remainingClassIndices.length > 0) {
      const remainingClassIndicesNew = remainingClassIndices.slice();

      // Loop over all 1-vs-all classifiers
      for (const classIndex of remainingClassIndices) {
        // Run a single iteration for the classifier
        this.classifiers[classIndex].trainIteration();

        if (this.classifiers[classIndex].checkConvergence()) {
          remainingClassIndicesNew.splice(remainingClassIndicesNew.indexOf(classIndex), 1);
        }
      }

      remainingClassIndices = remainingClassIndicesNew;

      // Emit event the outside can hook into
      this.emit('iterationCompleted');

      epoch += 1;
    }

    // Emit event the outside can hook into
    this.emit('converged');
  }

  /**
   * Initialize data and classifiers for training the multiclass algorithm on a dataset. Inheriting
   * classes should call this super function, followed by a call to trainBatch, trainIterative or a
   * custom training method
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */
  train(features, labels) {
    // Check to make sure number of labels matches number of feature sets
    if (features.length !== labels.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Store data points
    this.training.features = features;
    this.training.labels = labels.map(x => this.getOrCreateLabelClassIndex(x));

    this.createClassifiers();
  }

  /**
   * Make a prediction for a data set
   *
   * @param Array[Array[mixed]] Features for each data point
   * @return Array[Integer] Predictions. For each data point the class label is either -1 or 1
   */
  predict(features) {
    if (this.weights === null) {
      throw new Error('Model has to be trained in order to make predictions.');
    }

    if (features[0].length !== this.training.features[0].length) {
      throw new Error('Number of features of test data should match number of features of training data.');
    }

    // Get predictions from all classifiers for all data points by predicting all data points with
    // each classifier (getting an array of predictions for each classifier) and transposing
    const datapointsPredictions = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].transpose(this.classifiers.map(x => x.predict(features, { output: 'normalized' })));

    // Form final prediction by taking index of maximum normalized classifier output
    return datapointsPredictions.map(x => this.getClassIndexLabel(__WEBPACK_IMPORTED_MODULE_2__util_arrays__["a" /* default */].argMax(x)));
  }

  /**
   * Add an event listener for events of some type emitted from this object
   *
   * @param label Event
   * @param callback Callback function
   */
  addListener(label, callback) {
    if (!this.listeners.has(label)) {
      this.listeners.set(label, []);
    }

    this.listeners.get(label).push(callback);
  }

  /**
   * Remove a previously added event listener for events of some type emitted from this object
   *
   * @param label Event
   * @param callback Callback function
   */
  removeListener(label, callback) {
    const listeners = this.listeners.get(label);

    if (listeners) {
      this.listeners.set(label, listeners.filter(
        x => !(typeof x === 'function' && x === callback)
      ));
    }
  }

  /**
   * Emit an event, which triggers the listener callback functions bound to it
   *
   * @param label Event
   * @param ...args Remaining arguments contain arguments that should be passed to the
   *                callback functions
   */
  emit(label, ...args) {
    const listeners = this.listeners.get(label);

    if (listeners) {
      listeners.forEach((listener) => { listener(...args); });
      return true;
    }

    return false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (OneVsAll);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Datapoint {
  /**
   * Constructor
   *
   * @param Array[Number] features Data point features array
   */
  constructor(features) {
    this.features = features; // Data point features array
    this.classIndex = null; // Index of data point's class
    this.marked = false; // "marked" status of data point. Can be used e.g. to indicate
                           // support vectors
  }

  /**
   * Change the class index of this data point
   *
   * @param mixed classIndex New class index
   */
  setClassIndex(classIndex) {
    this.classIndex = classIndex;
  }

  /**
   * Get the class index of this data point
   *
   * @return mixed Class index
   */
  getClassIndex() {
    return this.classIndex;
  }

  /**
   * Change the "marked" status of this data point. Can be used for e.g. support vectors
   *
   * @param bool isMarked Whether the data point should be marked or not
   */
  setMarked(marked) {
    this.marked = marked;
  }

  /**
   * Check whether the data point is marked
   *
   * @return bool Whether the data point is marked
   */
  isMarked() {
    return this.marked;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Datapoint);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Datapoint {
  /**
   * Constructor
   *
   * @param jsml.UI.Canvas Canvas to which this datapoint element is bound
   * @param jsml.Dataset.Datapoint datapoint Datapoint model
   */
  constructor(canvas, datapoint) {
    this.canvas = canvas;

    this.model = datapoint;
    this.radius = 0;
    this.steps = 0;
  }

  /**
   * Update information about this element from the model
   */
  updateFromModel() {
    this.x = this.model.features[0];
    this.y = this.model.features[1];
    this.color = this.canvas.getClassColor(this.model.classIndex);
    this.marked = this.model.isMarked();
  }

  /**
   * Update drawing properties of the model
   */
  update() {
    this.updateFromModel();

    // Update radius
    const progress = Math.min(this.steps / 20, 0.75);
    this.radius = Math.sin(progress * Math.PI) * 6;

    // Increase current step
    this.steps += 1;
  }

  /**
   * Draw the element on the canvas
   */
  draw() {
    const canvas = this.canvas.canvas;
    const context = canvas.context;

    // Calculate position of point
    const [pointCx, pointCy] = this.canvas.convertFeaturesToCanvasCoordinates(this.x, this.y);

    // Draw main point filled, stroked circle
    context.beginPath();
    context.arc(pointCx, pointCy, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#555';
    context.stroke();

    // Mark point (e.g. for Support Vectors)
    if (this.marked) {
      context.beginPath();
      context.arc(pointCx, pointCy, this.radius + 3, 0, 2 * Math.PI, false);
      context.lineWidth = 1;
      context.strokeStyle = '#555';// this.color;
      context.stroke();
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Datapoint);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classification__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classifier__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__math__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Classification", function() { return __WEBPACK_IMPORTED_MODULE_0__classification__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Classifier", function() { return __WEBPACK_IMPORTED_MODULE_1__classifier__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return __WEBPACK_IMPORTED_MODULE_2__data__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return __WEBPACK_IMPORTED_MODULE_3__util__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Math", function() { return __WEBPACK_IMPORTED_MODULE_4__math__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return __WEBPACK_IMPORTED_MODULE_5__ui__["a"]; });










/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classification_boundaries__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classification_gaussiankernel__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classification_linearkernel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classification_kernel__ = __webpack_require__(3);





/* harmony default export */ __webpack_exports__["a"] = ({
  Boundaries: __WEBPACK_IMPORTED_MODULE_0__classification_boundaries__["a" /* default */],
  GaussianKernel: __WEBPACK_IMPORTED_MODULE_1__classification_gaussiankernel__["a" /* default */],
  LinearKernel: __WEBPACK_IMPORTED_MODULE_2__classification_linearkernel__["a" /* default */],
  Kernel: __WEBPACK_IMPORTED_MODULE_3__classification_kernel__["a" /* default */],
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_marchingsquares__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_marchingsquares___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_marchingsquares__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_arrays__ = __webpack_require__(1);
// External dependencies


// Internal dependencies



class Boundaries {
  constructor() {
    this.features = null;
    this.predictions = null;
    this.predictionsGrid = null;
  }

  /**
   * Determine decision boundaries for a specific classifier
   *
   * @param jsml.Classification.Classifier classifier
   *   Classifier to generate the decision boundaries for
   * @param Array[Integer]|Integer resolution
   *   Number of points on the x-axis and on the y-axis. Use integer for the same resolution on the
   *   x- and y-axis, and a 2-dimensional array to specify resolutions per axis.
   * @return Array[Array[mixed]]
   *   Predicted class labels for each grid point. m x n array for m rows, n columns
   */
  calculateClassifierDecisionBoundaries(classifier, resolution) {
    const resolutionX = Array.isArray(resolution) ? resolution[0] : resolution;
    const resolutionY = Array.isArray(resolution) ? resolution[1] : resolution;

    // Generate features
    const features = this.generateFeaturesFromLinSpaceGrid(
      resolutionX,
      resolutionY,
      [-1, 1],
      [-1, 1]
    );

    // Predict labels for all grid points
    const predictions = classifier.predict(features);
    const predictionsGrid = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].reshape(predictions, [resolutionX, resolutionY]);

    // Determine decision boundaries for grid
    this.features = features;
    this.predictions = predictions;
    this.predictionsGrid = this.getGridDecisionBoundaries(predictionsGrid);

    return this.predictionsGrid;
  }

  /**
   * Obtain the features list corresponding with the grid coordinates of the last decision
   * boundaries calculation
   *
   * @return Array[Array[Number]] Features for all data points (2-dimensional)
   */
  getFeatures() {
    return this.features;
  }

  /**
   * Obtain the predictions list for the last decision boundaries calculation
   *
   * @return Array[mixed] List of predicted class labels
   */
  getPredictions() {
    return this.predictions;
  }

  /**
   * Obtain the grid of predictions for the last decision bundaries calculation
   *
   * @return Array[Array[mixed]]
   *   Predicted class labels for each grid point. m x n array for m rows, n columns
   */
  getPredictionsGrid() {
    return this.predictionsGrid;
  }

  /**
   * Determine the decision boundaries for a grid of class predictions
   *
   * @param Array[Array[mixed]] grid Grid of predictions, an array of row arrays, where each row
   *   array contains the predictions for the cells in that row. For an m x n prediction grid,
   *   each of the m entries of `grid` should have n entries
   * @return Object[String => Array[Array[Array[Number]]]] The returned object contains the
   *   boundaries per level (class label). Each boundary then consists of some coordinates (forming
   *   a path), and each coordinate is a 2-dimensional array where the first entry is the
   *   x-coordinate and the second entry is the y-coordinate
   */
  getGridDecisionBoundaries(grid) {
    // Get unique prediction values
    const levels = Array.from(new Set(__WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].flatten(grid)));

    // Contours per level
    const contours = {};

    for (const level of levels) {
      contours[level] = this.getGridLevelBoundaries(grid, level);
    }

    return contours;
  }

  /**
   * Determine the decision boundaries for a single grid level (class label)
   *
   * @param Array[Array[mixed]] grid See this.getGridDecisionBoundaries@param:grid
   * @param String level Level (class label) to calculate boundaries for
   * @return Array[Array[Array[Number]]]
   *   Boundaries for this level (class label). See this.getGridDecisionBoundaries@return
   */
  getGridLevelBoundaries(grid, level) {
    // Create 1-vs-all grid grid for this level
    let gridLocal = [];

    for (let i = 0; i < grid.length; i += 1) {
      gridLocal.push([]);

      for (let j = 0; j < grid.length; j += 1) {
        gridLocal[i].push(grid[i][j] === level ? -2 : -1);
      }
    }

    // Check boundaries to see whether padding should be applied
    let pad = true;

    for (let i = 0; i < grid.length; i += 1) {
      if (gridLocal[i][0] === -1
        || gridLocal[i][grid.length - 1] === -1
        || gridLocal[0][i] === -1
        || gridLocal[grid.length - 1][i] === -1) {
        pad = false;
      }
    }

    if (pad) {
      // Add padding to the grid
      gridLocal = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].pad(gridLocal, [1, 1], [-1, -1]);
    }

    // Calculate contours
    const contours = __WEBPACK_IMPORTED_MODULE_0_marchingsquares__["isoBands"](gridLocal, -2, 0.5);

    // Reshape contours to fit square centered around 0. This has to be done because isoBands
    // assumes the x- and y-coordinates of the grid points are the array indices. The square is
    // roughly 2-by-2, but slightly larger to account for the outside boundaries formed because of
    // the "cliff" padding added earlier.
    for (const contour of contours) {
      for (const contourPoint of contour) {
        if (pad) {
          contourPoint[0] = (contourPoint[0] - 1) / (gridLocal.length - 3) * 2 - 1;
          contourPoint[1] = (contourPoint[1] - 1) / (gridLocal[0].length - 3) * 2 - 1;
        } else {
          contourPoint[0] = (contourPoint[0]) / (gridLocal.length - 1) * 2 - 1;
          contourPoint[1] = (contourPoint[1]) / (gridLocal[0].length - 1) * 2 - 1;
        }
      }
    }

    return contours;
  }

  smoothContours(contours, degree = 5) {
    const contoursSmoothed = JSON.parse(JSON.stringify(contours));

    contours.keys().foreach((level) => {
      const levelContours = contours[level];
      const levelContoursSmoothed = JSON.parse(JSON.stringify(levelContours));

      for (let i = 0; i < levelContours.length; i += 1) {
        for (let j = 0; j < levelContours[i].length; j += 1) {
          if (Math.abs(levelContours[i][j][0]) >= 1 || Math.abs(levelContours[i][j][1]) >= 1) {
            continue;
          }

          let points = __WEBPACK_IMPORTED_MODULE_2__util_arrays__["a" /* default */].wrapSlice(levelContours[i], j - degree, j + degree);

          const half = (points.length - 1) / 2;
          let cutoff = 0;

          for (let k = 0; k < points.length; k += 1) {
            if (Math.abs(points[k][0]) >= 1 || Math.abs(points[k][1]) >= 1) {
              cutoff = Math.max(cutoff, half - Math.abs(k - half));
            }
          }

          if (cutoff > 0) {
            points = points.slice(cutoff, points.length + 1 - cutoff);
          }

          const pointsX = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].subBlock(points, [0, 0], [points.length, 1]));
          const pointsY = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].subBlock(points, [0, 1], [points.length, 1]));

          levelContoursSmoothed[i][j][0] = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].internalSum(pointsX) / pointsX.length;
          levelContoursSmoothed[i][j][1] = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].internalSum(pointsY) / pointsY.length;
        }
      }

      contoursSmoothed[level] = levelContoursSmoothed;
    });

    return contoursSmoothed;
  }

  /**
   * Generate a list of features from a grid of points with linear spacing
   *
   * @param Integer pointsX Number of points on the x-axis
   * @param Integer pointsY Number of points on the y-axis
   * @param Array[Number] boundsX 2-dimensional array of left and right bound on the points on
   *   the x-axis
   * @param Array[Number] boundsY 2-dimensional array of left and right bound on the points on
   *   the y-axis
   */
  generateFeaturesFromLinSpaceGrid(pointsX, pointsY, boundsX, boundsY) {
    // Generate vectors with linear spacing
    const linspaceX = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].linspace(boundsX[0], boundsX[1], pointsX);
    const linspaceY = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].linspace(boundsY[0], boundsY[1], pointsY);

    // Create mesh grid with coordinates for each point in the grid
    const [gridX, gridY] = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].meshGrid(linspaceX, linspaceY);

    // Generate corresponding vectors of coordinate components
    const gridXVec = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].flatten(gridX);
    const gridYVec = __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].flatten(gridY);

    // Join coordinate components per data point, yielding the feature vector
    return __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].concatenate(1, gridXVec, gridYVec);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Boundaries);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
* @license GNU Affero General Public License.
* Copyright (c) 2015, 2015 Ronny Lorenz <ronny@tbi.univie.ac.at>
* v. 1.2.0
* https://github.com/RaumZeit/MarchingSquares.js
*/

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(16), __webpack_require__(17)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('./marchingsquares-isobands'),require('./marchingsquares-isocontours'));
    } else {
        // Browser globals (root is window)
        root.MarchingSquaresJS = factory(
                                    (root.MarchingSquaresJS) ? root.MarchingSquaresJS.isoBands : null,
                                    (root.MarchingSquaresJS) ? root.MarchingSquaresJS.isoContours : null
                                  );
    }
}(this, function (isoBands, isoContours) {
  return {
      isoBands : (typeof isoBands === 'function') ? isoBands : (((typeof isoBands === 'object') && (typeof isoBands.isoBands === 'function')) ? isoBands.isoBands : null),
      isoContours: (typeof isoContours === 'function') ? isoContours : (((typeof isoContours === 'object') && (typeof isoContours.isoContours === 'function')) ? isoContours.isoContours : null)
  };
}));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
* @license GNU Affero General Public License.
* Copyright (c) 2015, 2015 Ronny Lorenz <ronny@tbi.univie.ac.at>
* v. 1.2.0
* https://github.com/RaumZeit/MarchingSquares.js
*/

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return { isoBands : factory() }; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = { isoBands : factory() };
    } else {
        // Browser globals (root is window)
        root.MarchingSquaresJS = {
                                    isoBands : factory(),
                                    isoContours : (root.MarchingSquaresJS) ? root.MarchingSquaresJS.isoContours : null
                                 };
    }
}(this, function () {

  var defaultSettings = {
    successCallback:  null,
    verbose:          false,
    polygons:         false
  };
    
  var settings = {};
    
    /*
      Compute isobands(s) of a scalar 2D field given a certain
      threshold and a bandwidth by applying the Marching Squares
      Algorithm. The function returns a list of path coordinates
      either for individual polygons within each grid cell, or the
      outline of connected polygons.
    */
  function isoBands(data, minV, bandwidth, options){
    /* process options */
    options = options ? options : {};

    var optionKeys = Object.keys(defaultSettings);

    for(var i = 0; i < optionKeys.length; i++){
      var key = optionKeys[i];
      var val = options[key];
      val = ((typeof val !== 'undefined') && (val !== null)) ? val : defaultSettings[key];

      settings[key] = val;
    }

    if(settings.verbose)
      console.log("MarchingSquaresJS-isoBands: computing isobands for [" + minV + ":" + (minV + bandwidth) + "]");

    var grid = computeBandGrid(data, minV, bandwidth);

    var ret;
    if(settings.polygons){
      if (settings.verbose)
        console.log("MarchingSquaresJS-isoBands: returning single polygons for each grid cell");
      ret = BandGrid2Areas(grid);
    } else {
      if (settings.verbose)
        console.log("MarchingSquaresJS-isoBands: returning polygon paths for entire data grid");
      ret = BandGrid2AreaPaths(grid);
    }

    if(typeof settings.successCallback === 'function')
      settings.successCallback(ret);

    return ret;
  }

  /*
    Thats all for the public interface, below follows the actual
    implementation
  */

  /* Some private variables */
  var Node0 = 64,
      Node1 = 16,
      Node2 = 4,
      Node3 = 1;

  /*  For isoBands, each square is defined by the three states
      of its corner points. However, since computers use power-2
      values, we use 2bits per trit, i.e.:

      00 ... below minV
      01 ... between minV and maxV
      10 ... above maxV

      Hence we map the 4-trit configurations as follows:

      0000 => 0
      0001 => 1
      0002 => 2
      0010 => 4
      0011 => 5
      0012 => 6
      0020 => 8
      0021 => 9
      0022 => 10
      0100 => 16
      0101 => 17
      0102 => 18
      0110 => 20
      0111 => 21
      0112 => 22
      0120 => 24
      0121 => 25
      0122 => 26
      0200 => 32
      0201 => 33
      0202 => 34
      0210 => 36
      0211 => 37
      0212 => 38
      0220 => 40
      0221 => 41
      0222 => 42
      1000 => 64
      1001 => 65
      1002 => 66
      1010 => 68
      1011 => 69
      1012 => 70
      1020 => 72
      1021 => 73
      1022 => 74
      1100 => 80
      1101 => 81
      1102 => 82
      1110 => 84
      1111 => 85
      1112 => 86
      1120 => 88
      1121 => 89
      1122 => 90
      1200 => 96
      1201 => 97
      1202 => 98
      1210 => 100
      1211 => 101
      1212 => 102
      1220 => 104
      1221 => 105
      1222 => 106
      2000 => 128
      2001 => 129
      2002 => 130
      2010 => 132
      2011 => 133
      2012 => 134
      2020 => 136
      2021 => 137
      2022 => 138
      2100 => 144
      2101 => 145
      2102 => 146
      2110 => 148
      2111 => 149
      2112 => 150
      2120 => 152
      2121 => 153
      2122 => 154
      2200 => 160
      2201 => 161
      2202 => 162
      2210 => 164
      2211 => 165
      2212 => 166
      2220 => 168
      2221 => 169
      2222 => 170
  */

  /*
    The look-up tables for tracing back the contour path
    of isoBands
  */

  var isoBandNextXTL = [];
  var isoBandNextYTL = [];
  var isoBandNextOTL = [];

  var isoBandNextXTR = [];
  var isoBandNextYTR = [];
  var isoBandNextOTR = [];

  var isoBandNextXRT = [];
  var isoBandNextYRT = [];
  var isoBandNextORT = [];

  var isoBandNextXRB = [];
  var isoBandNextYRB = [];
  var isoBandNextORB = [];

  var isoBandNextXBL = [];
  var isoBandNextYBL = [];
  var isoBandNextOBL = [];

  var isoBandNextXBR = [];
  var isoBandNextYBR = [];
  var isoBandNextOBR = [];

  var isoBandNextXLT = [];
  var isoBandNextYLT = [];
  var isoBandNextOLT = [];

  var isoBandNextXLB = [];
  var isoBandNextYLB = [];
  var isoBandNextOLB = [];

  isoBandNextXRT[85] = isoBandNextXRB[85] = -1;
  isoBandNextYRT[85] = isoBandNextYRB[85] = 0;
  isoBandNextORT[85] = isoBandNextORB[85] = 1;
  isoBandNextXLT[85] = isoBandNextXLB[85] = 1;
  isoBandNextYLT[85] = isoBandNextYLB[85] = 0;
  isoBandNextOLT[85] = isoBandNextOLB[85] = 1;

  isoBandNextXTL[85] = isoBandNextXTR[85] = 0;
  isoBandNextYTL[85] = isoBandNextYTR[85] = -1;
  isoBandNextOTL[85] = isoBandNextOBL[85] = 0;
  isoBandNextXBR[85] = isoBandNextXBL[85] = 0;
  isoBandNextYBR[85] = isoBandNextYBL[85] = 1;
  isoBandNextOTR[85] = isoBandNextOBR[85] = 1;


  /* triangle cases */
  isoBandNextXLB[1] = isoBandNextXLB[169] = 0;
  isoBandNextYLB[1] = isoBandNextYLB[169] = -1;
  isoBandNextOLB[1] = isoBandNextOLB[169] = 0;
  isoBandNextXBL[1] = isoBandNextXBL[169] = -1;
  isoBandNextYBL[1] = isoBandNextYBL[169] = 0;
  isoBandNextOBL[1] = isoBandNextOBL[169] = 0;

  isoBandNextXRB[4] = isoBandNextXRB[166] = 0;
  isoBandNextYRB[4] = isoBandNextYRB[166] = -1;
  isoBandNextORB[4] = isoBandNextORB[166] = 1;
  isoBandNextXBR[4] = isoBandNextXBR[166] = 1;
  isoBandNextYBR[4] = isoBandNextYBR[166] = 0;
  isoBandNextOBR[4] = isoBandNextOBR[166] = 0;

  isoBandNextXRT[16] = isoBandNextXRT[154] = 0;
  isoBandNextYRT[16] = isoBandNextYRT[154] = 1;
  isoBandNextORT[16] = isoBandNextORT[154] = 1;
  isoBandNextXTR[16] = isoBandNextXTR[154] = 1;
  isoBandNextYTR[16] = isoBandNextYTR[154] = 0;
  isoBandNextOTR[16] = isoBandNextOTR[154] = 1;

  isoBandNextXLT[64] = isoBandNextXLT[106] = 0;
  isoBandNextYLT[64] = isoBandNextYLT[106] = 1;
  isoBandNextOLT[64] = isoBandNextOLT[106] = 0;
  isoBandNextXTL[64] = isoBandNextXTL[106] = -1;
  isoBandNextYTL[64] = isoBandNextYTL[106] = 0;
  isoBandNextOTL[64] = isoBandNextOTL[106] = 1;

  /* single trapezoid cases */
  isoBandNextXLT[2] = isoBandNextXLT[168] = 0;
  isoBandNextYLT[2] = isoBandNextYLT[168] = -1;
  isoBandNextOLT[2] = isoBandNextOLT[168] = 1;
  isoBandNextXLB[2] = isoBandNextXLB[168] = 0;
  isoBandNextYLB[2] = isoBandNextYLB[168] = -1;
  isoBandNextOLB[2] = isoBandNextOLB[168] = 0;
  isoBandNextXBL[2] = isoBandNextXBL[168] = -1;
  isoBandNextYBL[2] = isoBandNextYBL[168] = 0;
  isoBandNextOBL[2] = isoBandNextOBL[168] = 0;
  isoBandNextXBR[2] = isoBandNextXBR[168] = -1;
  isoBandNextYBR[2] = isoBandNextYBR[168] = 0;
  isoBandNextOBR[2] = isoBandNextOBR[168] = 1;

  isoBandNextXRT[8] = isoBandNextXRT[162] = 0;
  isoBandNextYRT[8] = isoBandNextYRT[162] = -1;
  isoBandNextORT[8] = isoBandNextORT[162] = 0;
  isoBandNextXRB[8] = isoBandNextXRB[162] = 0;
  isoBandNextYRB[8] = isoBandNextYRB[162] = -1;
  isoBandNextORB[8] = isoBandNextORB[162] = 1;
  isoBandNextXBL[8] = isoBandNextXBL[162] = 1;
  isoBandNextYBL[8] = isoBandNextYBL[162] = 0;
  isoBandNextOBL[8] = isoBandNextOBL[162] = 1;
  isoBandNextXBR[8] = isoBandNextXBR[162] = 1;
  isoBandNextYBR[8] = isoBandNextYBR[162] = 0;
  isoBandNextOBR[8] = isoBandNextOBR[162] = 0;

  isoBandNextXRT[32] = isoBandNextXRT[138] = 0;
  isoBandNextYRT[32] = isoBandNextYRT[138] = 1;
  isoBandNextORT[32] = isoBandNextORT[138] = 1;
  isoBandNextXRB[32] = isoBandNextXRB[138] = 0;
  isoBandNextYRB[32] = isoBandNextYRB[138] = 1;
  isoBandNextORB[32] = isoBandNextORB[138] = 0;
  isoBandNextXTL[32] = isoBandNextXTL[138] = 1;
  isoBandNextYTL[32] = isoBandNextYTL[138] = 0;
  isoBandNextOTL[32] = isoBandNextOTL[138] = 0;
  isoBandNextXTR[32] = isoBandNextXTR[138] = 1;
  isoBandNextYTR[32] = isoBandNextYTR[138] = 0;
  isoBandNextOTR[32] = isoBandNextOTR[138] = 1;

  isoBandNextXLB[128] = isoBandNextXLB[42] = 0;
  isoBandNextYLB[128] = isoBandNextYLB[42] = 1;
  isoBandNextOLB[128] = isoBandNextOLB[42] = 1;
  isoBandNextXLT[128] = isoBandNextXLT[42] = 0;
  isoBandNextYLT[128] = isoBandNextYLT[42] = 1;
  isoBandNextOLT[128] = isoBandNextOLT[42] = 0;
  isoBandNextXTL[128] = isoBandNextXTL[42] = -1;
  isoBandNextYTL[128] = isoBandNextYTL[42] = 0;
  isoBandNextOTL[128] = isoBandNextOTL[42] = 1;
  isoBandNextXTR[128] = isoBandNextXTR[42] = -1;
  isoBandNextYTR[128] = isoBandNextYTR[42] = 0;
  isoBandNextOTR[128] = isoBandNextOTR[42] = 0;

  /* single rectangle cases */
  isoBandNextXRB[5] = isoBandNextXRB[165] = -1;
  isoBandNextYRB[5] = isoBandNextYRB[165] = 0;
  isoBandNextORB[5] = isoBandNextORB[165] = 0;
  isoBandNextXLB[5] = isoBandNextXLB[165] = 1;
  isoBandNextYLB[5] = isoBandNextYLB[165] = 0;
  isoBandNextOLB[5] = isoBandNextOLB[165] = 0;

  isoBandNextXBR[20] = isoBandNextXBR[150] = 0;
  isoBandNextYBR[20] = isoBandNextYBR[150] = 1;
  isoBandNextOBR[20] = isoBandNextOBR[150] = 1;
  isoBandNextXTR[20] = isoBandNextXTR[150] = 0;
  isoBandNextYTR[20] = isoBandNextYTR[150] = -1;
  isoBandNextOTR[20] = isoBandNextOTR[150] = 1;

  isoBandNextXRT[80] = isoBandNextXRT[90] = -1;
  isoBandNextYRT[80] = isoBandNextYRT[90] = 0;
  isoBandNextORT[80] = isoBandNextORT[90] = 1;
  isoBandNextXLT[80] = isoBandNextXLT[90] = 1;
  isoBandNextYLT[80] = isoBandNextYLT[90] = 0;
  isoBandNextOLT[80] = isoBandNextOLT[90] = 1;

  isoBandNextXBL[65] = isoBandNextXBL[105] = 0;
  isoBandNextYBL[65] = isoBandNextYBL[105] = 1;
  isoBandNextOBL[65] = isoBandNextOBL[105] = 0;
  isoBandNextXTL[65] = isoBandNextXTL[105] = 0;
  isoBandNextYTL[65] = isoBandNextYTL[105] = -1;
  isoBandNextOTL[65] = isoBandNextOTL[105] = 0;

  isoBandNextXRT[160] = isoBandNextXRT[10] = -1;
  isoBandNextYRT[160] = isoBandNextYRT[10] = 0;
  isoBandNextORT[160] = isoBandNextORT[10] = 1;
  isoBandNextXRB[160] = isoBandNextXRB[10] = -1;
  isoBandNextYRB[160] = isoBandNextYRB[10] = 0;
  isoBandNextORB[160] = isoBandNextORB[10] = 0;
  isoBandNextXLB[160] = isoBandNextXLB[10] = 1;
  isoBandNextYLB[160] = isoBandNextYLB[10] = 0;
  isoBandNextOLB[160] = isoBandNextOLB[10] = 0;
  isoBandNextXLT[160] = isoBandNextXLT[10] = 1;
  isoBandNextYLT[160] = isoBandNextYLT[10] = 0;
  isoBandNextOLT[160] = isoBandNextOLT[10] = 1;

  isoBandNextXBR[130] = isoBandNextXBR[40] = 0;
  isoBandNextYBR[130] = isoBandNextYBR[40] = 1;
  isoBandNextOBR[130] = isoBandNextOBR[40] = 1;
  isoBandNextXBL[130] = isoBandNextXBL[40] = 0;
  isoBandNextYBL[130] = isoBandNextYBL[40] = 1;
  isoBandNextOBL[130] = isoBandNextOBL[40] = 0;
  isoBandNextXTL[130] = isoBandNextXTL[40] = 0;
  isoBandNextYTL[130] = isoBandNextYTL[40] = -1;
  isoBandNextOTL[130] = isoBandNextOTL[40] = 0;
  isoBandNextXTR[130] = isoBandNextXTR[40] = 0;
  isoBandNextYTR[130] = isoBandNextYTR[40] = -1;
  isoBandNextOTR[130] = isoBandNextOTR[40] = 1;

  /* single hexagon cases */
  isoBandNextXRB[37] = isoBandNextXRB[133] = 0;
  isoBandNextYRB[37] = isoBandNextYRB[133] = 1;
  isoBandNextORB[37] = isoBandNextORB[133] = 1;
  isoBandNextXLB[37] = isoBandNextXLB[133] = 0;
  isoBandNextYLB[37] = isoBandNextYLB[133] = 1;
  isoBandNextOLB[37] = isoBandNextOLB[133] = 0;
  isoBandNextXTL[37] = isoBandNextXTL[133] = -1;
  isoBandNextYTL[37] = isoBandNextYTL[133] = 0;
  isoBandNextOTL[37] = isoBandNextOTL[133] = 0;
  isoBandNextXTR[37] = isoBandNextXTR[133] = 1;
  isoBandNextYTR[37] = isoBandNextYTR[133] = 0;
  isoBandNextOTR[37] = isoBandNextOTR[133] = 0;

  isoBandNextXBR[148] = isoBandNextXBR[22] = -1;
  isoBandNextYBR[148] = isoBandNextYBR[22] = 0;
  isoBandNextOBR[148] = isoBandNextOBR[22] = 0;
  isoBandNextXLB[148] = isoBandNextXLB[22] = 0;
  isoBandNextYLB[148] = isoBandNextYLB[22] = -1;
  isoBandNextOLB[148] = isoBandNextOLB[22] = 1;
  isoBandNextXLT[148] = isoBandNextXLT[22] = 0;
  isoBandNextYLT[148] = isoBandNextYLT[22] = 1;
  isoBandNextOLT[148] = isoBandNextOLT[22] = 1;
  isoBandNextXTR[148] = isoBandNextXTR[22] = -1;
  isoBandNextYTR[148] = isoBandNextYTR[22] = 0;
  isoBandNextOTR[148] = isoBandNextOTR[22] = 1;

  isoBandNextXRT[82] = isoBandNextXRT[88] = 0;
  isoBandNextYRT[82] = isoBandNextYRT[88] = -1;
  isoBandNextORT[82] = isoBandNextORT[88] = 1;
  isoBandNextXBR[82] = isoBandNextXBR[88] = 1;
  isoBandNextYBR[82] = isoBandNextYBR[88] = 0;
  isoBandNextOBR[82] = isoBandNextOBR[88] = 1;
  isoBandNextXBL[82] = isoBandNextXBL[88] = -1;
  isoBandNextYBL[82] = isoBandNextYBL[88] = 0;
  isoBandNextOBL[82] = isoBandNextOBL[88] = 1;
  isoBandNextXLT[82] = isoBandNextXLT[88] = 0;
  isoBandNextYLT[82] = isoBandNextYLT[88] = -1;
  isoBandNextOLT[82] = isoBandNextOLT[88] = 0;

  isoBandNextXRT[73] = isoBandNextXRT[97] = 0;
  isoBandNextYRT[73] = isoBandNextYRT[97] = 1;
  isoBandNextORT[73] = isoBandNextORT[97] = 0;
  isoBandNextXRB[73] = isoBandNextXRB[97] = 0;
  isoBandNextYRB[73] = isoBandNextYRB[97] = -1;
  isoBandNextORB[73] = isoBandNextORB[97] = 0;
  isoBandNextXBL[73] = isoBandNextXBL[97] = 1;
  isoBandNextYBL[73] = isoBandNextYBL[97] = 0;
  isoBandNextOBL[73] = isoBandNextOBL[97] = 0;
  isoBandNextXTL[73] = isoBandNextXTL[97] = 1;
  isoBandNextYTL[73] = isoBandNextYTL[97] = 0;
  isoBandNextOTL[73] = isoBandNextOTL[97] = 1;

  isoBandNextXRT[145] = isoBandNextXRT[25] = 0;
  isoBandNextYRT[145] = isoBandNextYRT[25] = -1;
  isoBandNextORT[145] = isoBandNextORT[25] = 0;
  isoBandNextXBL[145] = isoBandNextXBL[25] = 1;
  isoBandNextYBL[145] = isoBandNextYBL[25] = 0;
  isoBandNextOBL[145] = isoBandNextOBL[25] = 1;
  isoBandNextXLB[145] = isoBandNextXLB[25] = 0;
  isoBandNextYLB[145] = isoBandNextYLB[25] = 1;
  isoBandNextOLB[145] = isoBandNextOLB[25] = 1;
  isoBandNextXTR[145] = isoBandNextXTR[25] = -1;
  isoBandNextYTR[145] = isoBandNextYTR[25] = 0;
  isoBandNextOTR[145] = isoBandNextOTR[25] = 0;

  isoBandNextXRB[70] = isoBandNextXRB[100] = 0;
  isoBandNextYRB[70] = isoBandNextYRB[100] = 1;
  isoBandNextORB[70] = isoBandNextORB[100] = 0;
  isoBandNextXBR[70] = isoBandNextXBR[100] = -1;
  isoBandNextYBR[70] = isoBandNextYBR[100] = 0;
  isoBandNextOBR[70] = isoBandNextOBR[100] = 1;
  isoBandNextXLT[70] = isoBandNextXLT[100] = 0;
  isoBandNextYLT[70] = isoBandNextYLT[100] = -1;
  isoBandNextOLT[70] = isoBandNextOLT[100] = 1;
  isoBandNextXTL[70] = isoBandNextXTL[100] = 1;
  isoBandNextYTL[70] = isoBandNextYTL[100] = 0;
  isoBandNextOTL[70] = isoBandNextOTL[100] = 0;

  /* single pentagon cases */
  isoBandNextXRB[101] = isoBandNextXRB[69] = 0;
  isoBandNextYRB[101] = isoBandNextYRB[69] = 1;
  isoBandNextORB[101] = isoBandNextORB[69] = 0;
  isoBandNextXTL[101] = isoBandNextXTL[69] = 1;
  isoBandNextYTL[101] = isoBandNextYTL[69] = 0;
  isoBandNextOTL[101] = isoBandNextOTL[69] = 0;

  isoBandNextXLB[149] = isoBandNextXLB[21] = 0;
  isoBandNextYLB[149] = isoBandNextYLB[21] = 1;
  isoBandNextOLB[149] = isoBandNextOLB[21] = 1;
  isoBandNextXTR[149] = isoBandNextXTR[21] = -1;
  isoBandNextYTR[149] = isoBandNextYTR[21] = 0;
  isoBandNextOTR[149] = isoBandNextOTR[21] = 0;

  isoBandNextXBR[86] = isoBandNextXBR[84] = -1;
  isoBandNextYBR[86] = isoBandNextYBR[84] = 0;
  isoBandNextOBR[86] = isoBandNextOBR[84] = 1;
  isoBandNextXLT[86] = isoBandNextXLT[84] = 0;
  isoBandNextYLT[86] = isoBandNextYLT[84] = -1;
  isoBandNextOLT[86] = isoBandNextOLT[84] = 1;

  isoBandNextXRT[89] = isoBandNextXRT[81] = 0;
  isoBandNextYRT[89] = isoBandNextYRT[81] = -1;
  isoBandNextORT[89] = isoBandNextORT[81] = 0;
  isoBandNextXBL[89] = isoBandNextXBL[81] = 1;
  isoBandNextYBL[89] = isoBandNextYBL[81] = 0;
  isoBandNextOBL[89] = isoBandNextOBL[81] = 1;

  isoBandNextXRT[96] = isoBandNextXRT[74] = 0;
  isoBandNextYRT[96] = isoBandNextYRT[74] = 1;
  isoBandNextORT[96] = isoBandNextORT[74] = 0;
  isoBandNextXRB[96] = isoBandNextXRB[74] = -1;
  isoBandNextYRB[96] = isoBandNextYRB[74] = 0;
  isoBandNextORB[96] = isoBandNextORB[74] = 1;
  isoBandNextXLT[96] = isoBandNextXLT[74] = 1;
  isoBandNextYLT[96] = isoBandNextYLT[74] = 0;
  isoBandNextOLT[96] = isoBandNextOLT[74] = 0;
  isoBandNextXTL[96] = isoBandNextXTL[74] = 1;
  isoBandNextYTL[96] = isoBandNextYTL[74] = 0;
  isoBandNextOTL[96] = isoBandNextOTL[74] = 1;

  isoBandNextXRT[24] = isoBandNextXRT[146] = 0;
  isoBandNextYRT[24] = isoBandNextYRT[146] = -1;
  isoBandNextORT[24] = isoBandNextORT[146] = 1;
  isoBandNextXBR[24] = isoBandNextXBR[146] = 1;
  isoBandNextYBR[24] = isoBandNextYBR[146] = 0;
  isoBandNextOBR[24] = isoBandNextOBR[146] = 1;
  isoBandNextXBL[24] = isoBandNextXBL[146] = 0;
  isoBandNextYBL[24] = isoBandNextYBL[146] = 1;
  isoBandNextOBL[24] = isoBandNextOBL[146] = 1;
  isoBandNextXTR[24] = isoBandNextXTR[146] = 0;
  isoBandNextYTR[24] = isoBandNextYTR[146] = -1;
  isoBandNextOTR[24] = isoBandNextOTR[146] = 0;

  isoBandNextXRB[6] = isoBandNextXRB[164] = -1;
  isoBandNextYRB[6] = isoBandNextYRB[164] = 0;
  isoBandNextORB[6] = isoBandNextORB[164] = 1;
  isoBandNextXBR[6] = isoBandNextXBR[164] = -1;
  isoBandNextYBR[6] = isoBandNextYBR[164] = 0;
  isoBandNextOBR[6] = isoBandNextOBR[164] = 0;
  isoBandNextXLB[6] = isoBandNextXLB[164] = 0;
  isoBandNextYLB[6] = isoBandNextYLB[164] = -1;
  isoBandNextOLB[6] = isoBandNextOLB[164] = 1;
  isoBandNextXLT[6] = isoBandNextXLT[164] = 1;
  isoBandNextYLT[6] = isoBandNextYLT[164] = 0;
  isoBandNextOLT[6] = isoBandNextOLT[164] = 0;

  isoBandNextXBL[129] = isoBandNextXBL[41] = 0;
  isoBandNextYBL[129] = isoBandNextYBL[41] = 1;
  isoBandNextOBL[129] = isoBandNextOBL[41] = 1;
  isoBandNextXLB[129] = isoBandNextXLB[41] = 0;
  isoBandNextYLB[129] = isoBandNextYLB[41] = 1;
  isoBandNextOLB[129] = isoBandNextOLB[41] = 0;
  isoBandNextXTL[129] = isoBandNextXTL[41] = -1;
  isoBandNextYTL[129] = isoBandNextYTL[41] = 0;
  isoBandNextOTL[129] = isoBandNextOTL[41] = 0;
  isoBandNextXTR[129] = isoBandNextXTR[41] = 0;
  isoBandNextYTR[129] = isoBandNextYTR[41] = -1;
  isoBandNextOTR[129] = isoBandNextOTR[41] = 0;

  isoBandNextXBR[66] = isoBandNextXBR[104] = 0;
  isoBandNextYBR[66] = isoBandNextYBR[104] = 1;
  isoBandNextOBR[66] = isoBandNextOBR[104] = 0;
  isoBandNextXBL[66] = isoBandNextXBL[104] = -1;
  isoBandNextYBL[66] = isoBandNextYBL[104] = 0;
  isoBandNextOBL[66] = isoBandNextOBL[104] = 1;
  isoBandNextXLT[66] = isoBandNextXLT[104] = 0;
  isoBandNextYLT[66] = isoBandNextYLT[104] = -1;
  isoBandNextOLT[66] = isoBandNextOLT[104] = 0;
  isoBandNextXTL[66] = isoBandNextXTL[104] = 0;
  isoBandNextYTL[66] = isoBandNextYTL[104] = -1;
  isoBandNextOTL[66] = isoBandNextOTL[104] = 1;

  isoBandNextXRT[144] = isoBandNextXRT[26] = -1;
  isoBandNextYRT[144] = isoBandNextYRT[26] = 0;
  isoBandNextORT[144] = isoBandNextORT[26] = 0;
  isoBandNextXLB[144] = isoBandNextXLB[26] = 1;
  isoBandNextYLB[144] = isoBandNextYLB[26] = 0;
  isoBandNextOLB[144] = isoBandNextOLB[26] = 1;
  isoBandNextXLT[144] = isoBandNextXLT[26] = 0;
  isoBandNextYLT[144] = isoBandNextYLT[26] = 1;
  isoBandNextOLT[144] = isoBandNextOLT[26] = 1;
  isoBandNextXTR[144] = isoBandNextXTR[26] = -1;
  isoBandNextYTR[144] = isoBandNextYTR[26] = 0;
  isoBandNextOTR[144] = isoBandNextOTR[26] = 1;

  isoBandNextXRB[36] = isoBandNextXRB[134] = 0;
  isoBandNextYRB[36] = isoBandNextYRB[134] = 1;
  isoBandNextORB[36] = isoBandNextORB[134] = 1;
  isoBandNextXBR[36] = isoBandNextXBR[134] = 0;
  isoBandNextYBR[36] = isoBandNextYBR[134] = 1;
  isoBandNextOBR[36] = isoBandNextOBR[134] = 0;
  isoBandNextXTL[36] = isoBandNextXTL[134] = 0;
  isoBandNextYTL[36] = isoBandNextYTL[134] = -1;
  isoBandNextOTL[36] = isoBandNextOTL[134] = 1;
  isoBandNextXTR[36] = isoBandNextXTR[134] = 1;
  isoBandNextYTR[36] = isoBandNextYTR[134] = 0;
  isoBandNextOTR[36] = isoBandNextOTR[134] = 0;

  isoBandNextXRT[9] = isoBandNextXRT[161] = -1;
  isoBandNextYRT[9] = isoBandNextYRT[161] = 0;
  isoBandNextORT[9] = isoBandNextORT[161] = 0;
  isoBandNextXRB[9] = isoBandNextXRB[161] = 0;
  isoBandNextYRB[9] = isoBandNextYRB[161] = -1;
  isoBandNextORB[9] = isoBandNextORB[161] = 0;
  isoBandNextXBL[9] = isoBandNextXBL[161] = 1;
  isoBandNextYBL[9] = isoBandNextYBL[161] = 0;
  isoBandNextOBL[9] = isoBandNextOBL[161] = 0;
  isoBandNextXLB[9] = isoBandNextXLB[161] = 1;
  isoBandNextYLB[9] = isoBandNextYLB[161] = 0;
  isoBandNextOLB[9] = isoBandNextOLB[161] = 1;

  /* 8-sided cases */
  isoBandNextXRT[136] = 0;
  isoBandNextYRT[136] = 1;
  isoBandNextORT[136] = 1;
  isoBandNextXRB[136] = 0;
  isoBandNextYRB[136] = 1;
  isoBandNextORB[136] = 0;
  isoBandNextXBR[136] = -1;
  isoBandNextYBR[136] = 0;
  isoBandNextOBR[136] = 1;
  isoBandNextXBL[136] = -1;
  isoBandNextYBL[136] = 0;
  isoBandNextOBL[136] = 0;
  isoBandNextXLB[136] = 0;
  isoBandNextYLB[136] = -1;
  isoBandNextOLB[136] = 0;
  isoBandNextXLT[136] = 0;
  isoBandNextYLT[136] = -1;
  isoBandNextOLT[136] = 1;
  isoBandNextXTL[136] = 1;
  isoBandNextYTL[136] = 0;
  isoBandNextOTL[136] = 0;
  isoBandNextXTR[136] = 1;
  isoBandNextYTR[136] = 0;
  isoBandNextOTR[136] = 1;

  isoBandNextXRT[34] = 0;
  isoBandNextYRT[34] = -1;
  isoBandNextORT[34] = 0;
  isoBandNextXRB[34] = 0;
  isoBandNextYRB[34] = -1;
  isoBandNextORB[34] = 1;
  isoBandNextXBR[34] = 1;
  isoBandNextYBR[34] = 0;
  isoBandNextOBR[34] = 0;
  isoBandNextXBL[34] = 1;
  isoBandNextYBL[34] = 0;
  isoBandNextOBL[34] = 1;
  isoBandNextXLB[34] = 0;
  isoBandNextYLB[34] = 1;
  isoBandNextOLB[34] = 1;
  isoBandNextXLT[34] = 0;
  isoBandNextYLT[34] = 1;
  isoBandNextOLT[34] = 0;
  isoBandNextXTL[34] = -1;
  isoBandNextYTL[34] = 0;
  isoBandNextOTL[34] = 1;
  isoBandNextXTR[34] = -1;
  isoBandNextYTR[34] = 0;
  isoBandNextOTR[34] = 0;

  isoBandNextXRT[35] = 0;
  isoBandNextYRT[35] = 1;
  isoBandNextORT[35] = 1;
  isoBandNextXRB[35] = 0;
  isoBandNextYRB[35] = -1;
  isoBandNextORB[35] = 1;
  isoBandNextXBR[35] = 1;
  isoBandNextYBR[35] = 0;
  isoBandNextOBR[35] = 0;
  isoBandNextXBL[35] = -1;
  isoBandNextYBL[35] = 0;
  isoBandNextOBL[35] = 0;
  isoBandNextXLB[35] = 0;
  isoBandNextYLB[35] = -1;
  isoBandNextOLB[35] = 0;
  isoBandNextXLT[35] = 0;
  isoBandNextYLT[35] = 1;
  isoBandNextOLT[35] = 0;
  isoBandNextXTL[35] = -1;
  isoBandNextYTL[35] = 0;
  isoBandNextOTL[35] = 1;
  isoBandNextXTR[35] = 1;
  isoBandNextYTR[35] = 0;
  isoBandNextOTR[35] = 1;

  /* 6-sided cases */
  isoBandNextXRT[153] = 0;
  isoBandNextYRT[153] = 1;
  isoBandNextORT[153] = 1;
  isoBandNextXBL[153] = -1;
  isoBandNextYBL[153] = 0;
  isoBandNextOBL[153] = 0;
  isoBandNextXLB[153] = 0;
  isoBandNextYLB[153] = -1;
  isoBandNextOLB[153] = 0;
  isoBandNextXTR[153] = 1;
  isoBandNextYTR[153] = 0;
  isoBandNextOTR[153] = 1;

  isoBandNextXRB[102] = 0;
  isoBandNextYRB[102] = -1;
  isoBandNextORB[102] = 1;
  isoBandNextXBR[102] = 1;
  isoBandNextYBR[102] = 0;
  isoBandNextOBR[102] = 0;
  isoBandNextXLT[102] = 0;
  isoBandNextYLT[102] = 1;
  isoBandNextOLT[102] = 0;
  isoBandNextXTL[102] = -1;
  isoBandNextYTL[102] = 0;
  isoBandNextOTL[102] = 1;

  isoBandNextXRT[155] = 0;
  isoBandNextYRT[155] = -1;
  isoBandNextORT[155] = 0;
  isoBandNextXBL[155] = 1;
  isoBandNextYBL[155] = 0;
  isoBandNextOBL[155] = 1;
  isoBandNextXLB[155] = 0;
  isoBandNextYLB[155] = 1;
  isoBandNextOLB[155] = 1;
  isoBandNextXTR[155] = -1;
  isoBandNextYTR[155] = 0;
  isoBandNextOTR[155] = 0;

  isoBandNextXRB[103] = 0;
  isoBandNextYRB[103] = 1;
  isoBandNextORB[103] = 0;
  isoBandNextXBR[103] = -1;
  isoBandNextYBR[103] = 0;
  isoBandNextOBR[103] = 1;
  isoBandNextXLT[103] = 0;
  isoBandNextYLT[103] = -1;
  isoBandNextOLT[103] = 1;
  isoBandNextXTL[103] = 1;
  isoBandNextYTL[103] = 0;
  isoBandNextOTL[103] = 0;

  /* 7-sided cases */
  isoBandNextXRT[152] = 0;
  isoBandNextYRT[152] = 1;
  isoBandNextORT[152] = 1;
  isoBandNextXBR[152] = -1;
  isoBandNextYBR[152] = 0;
  isoBandNextOBR[152] = 1;
  isoBandNextXBL[152] = -1;
  isoBandNextYBL[152] = 0;
  isoBandNextOBL[152] = 0;
  isoBandNextXLB[152] = 0;
  isoBandNextYLB[152] = -1;
  isoBandNextOLB[152] = 0;
  isoBandNextXLT[152] = 0;
  isoBandNextYLT[152] = -1;
  isoBandNextOLT[152] = 1;
  isoBandNextXTR[152] = 1;
  isoBandNextYTR[152] = 0;
  isoBandNextOTR[152] = 1;

  isoBandNextXRT[156] = 0;
  isoBandNextYRT[156] = -1;
  isoBandNextORT[156] = 1;
  isoBandNextXBR[156] = 1;
  isoBandNextYBR[156] = 0;
  isoBandNextOBR[156] = 1;
  isoBandNextXBL[156] = -1;
  isoBandNextYBL[156] = 0;
  isoBandNextOBL[156] = 0;
  isoBandNextXLB[156] = 0;
  isoBandNextYLB[156] = -1;
  isoBandNextOLB[156] = 0;
  isoBandNextXLT[156] = 0;
  isoBandNextYLT[156] = 1;
  isoBandNextOLT[156] = 1;
  isoBandNextXTR[156] = -1;
  isoBandNextYTR[156] = 0;
  isoBandNextOTR[156] = 1;

  isoBandNextXRT[137] = 0;
  isoBandNextYRT[137] = 1;
  isoBandNextORT[137] = 1;
  isoBandNextXRB[137] = 0;
  isoBandNextYRB[137] = 1;
  isoBandNextORB[137] = 0;
  isoBandNextXBL[137] = -1;
  isoBandNextYBL[137] = 0;
  isoBandNextOBL[137] = 0;
  isoBandNextXLB[137] = 0;
  isoBandNextYLB[137] = -1;
  isoBandNextOLB[137] = 0;
  isoBandNextXTL[137] = 1;
  isoBandNextYTL[137] = 0;
  isoBandNextOTL[137] = 0;
  isoBandNextXTR[137] = 1;
  isoBandNextYTR[137] = 0;
  isoBandNextOTR[137] = 1;

  isoBandNextXRT[139] = 0;
  isoBandNextYRT[139] = 1;
  isoBandNextORT[139] = 1;
  isoBandNextXRB[139] = 0;
  isoBandNextYRB[139] = -1;
  isoBandNextORB[139] = 0;
  isoBandNextXBL[139] = 1;
  isoBandNextYBL[139] = 0;
  isoBandNextOBL[139] = 0;
  isoBandNextXLB[139] = 0;
  isoBandNextYLB[139] = 1;
  isoBandNextOLB[139] = 0;
  isoBandNextXTL[139] = -1;
  isoBandNextYTL[139] = 0;
  isoBandNextOTL[139] = 0;
  isoBandNextXTR[139] = 1;
  isoBandNextYTR[139] = 0;
  isoBandNextOTR[139] = 1;

  isoBandNextXRT[98] = 0;
  isoBandNextYRT[98] = -1;
  isoBandNextORT[98] = 0;
  isoBandNextXRB[98] = 0;
  isoBandNextYRB[98] = -1;
  isoBandNextORB[98] = 1;
  isoBandNextXBR[98] = 1;
  isoBandNextYBR[98] = 0;
  isoBandNextOBR[98] = 0;
  isoBandNextXBL[98] = 1;
  isoBandNextYBL[98] = 0;
  isoBandNextOBL[98] = 1;
  isoBandNextXLT[98] = 0;
  isoBandNextYLT[98] = 1;
  isoBandNextOLT[98] = 0;
  isoBandNextXTL[98] = -1;
  isoBandNextYTL[98] = 0;
  isoBandNextOTL[98] = 1;

  isoBandNextXRT[99] = 0;
  isoBandNextYRT[99] = 1;
  isoBandNextORT[99] = 0;
  isoBandNextXRB[99] = 0;
  isoBandNextYRB[99] = -1;
  isoBandNextORB[99] = 1;
  isoBandNextXBR[99] = 1;
  isoBandNextYBR[99] = 0;
  isoBandNextOBR[99] = 0;
  isoBandNextXBL[99] = -1;
  isoBandNextYBL[99] = 0;
  isoBandNextOBL[99] = 1;
  isoBandNextXLT[99] = 0;
  isoBandNextYLT[99] = -1;
  isoBandNextOLT[99] = 0;
  isoBandNextXTL[99] = 1;
  isoBandNextYTL[99] = 0;
  isoBandNextOTL[99] = 1;

  isoBandNextXRB[38] = 0;
  isoBandNextYRB[38] = -1;
  isoBandNextORB[38] = 1;
  isoBandNextXBR[38] = 1;
  isoBandNextYBR[38] = 0;
  isoBandNextOBR[38] = 0;
  isoBandNextXLB[38] = 0;
  isoBandNextYLB[38] = 1;
  isoBandNextOLB[38] = 1;
  isoBandNextXLT[38] = 0;
  isoBandNextYLT[38] = 1;
  isoBandNextOLT[38] = 0;
  isoBandNextXTL[38] = -1;
  isoBandNextYTL[38] = 0;
  isoBandNextOTL[38] = 1;
  isoBandNextXTR[38] = -1;
  isoBandNextYTR[38] = 0;
  isoBandNextOTR[38] = 0;

  isoBandNextXRB[39] = 0;
  isoBandNextYRB[39] = 1;
  isoBandNextORB[39] = 1;
  isoBandNextXBR[39] = -1;
  isoBandNextYBR[39] = 0;
  isoBandNextOBR[39] = 0;
  isoBandNextXLB[39] = 0;
  isoBandNextYLB[39] = -1;
  isoBandNextOLB[39] = 1;
  isoBandNextXLT[39] = 0;
  isoBandNextYLT[39] = 1;
  isoBandNextOLT[39] = 0;
  isoBandNextXTL[39] = -1;
  isoBandNextYTL[39] = 0;
  isoBandNextOTL[39] = 1;
  isoBandNextXTR[39] = 1;
  isoBandNextYTR[39] = 0;
  isoBandNextOTR[39] = 0;


  /*
   Define helper functions for the polygon_table
   */

  /* triangle cases */
  var p00 = function (cell) {
    return [[cell.bottomleft, 0], [0, 0], [0, cell.leftbottom]];
  };
  var p01 = function (cell) {
    return [[1, cell.rightbottom], [1, 0], [cell.bottomright, 0]];
  };
  var p02 = function (cell) {
    return [[cell.topright, 1], [1, 1], [1, cell.righttop]];
  };
  var p03 = function (cell) {
    return [[0, cell.lefttop], [0, 1], [cell.topleft, 1]];
  };
  /* trapezoid cases */
  var p04 = function (cell) {
    return [[cell.bottomright, 0], [cell.bottomleft, 0], [0, cell.leftbottom], [0, cell.lefttop]];
  };
  var p05 = function (cell) {
    return [[cell.bottomright, 0], [cell.bottomleft, 0], [1, cell.righttop], [1, cell.rightbottom]];
  };
  var p06 = function (cell) {
    return [[1, cell.righttop], [1, cell.rightbottom], [cell.topleft, 1], [cell.topright, 1]];
  };
  var p07 = function (cell) {
    return [[0, cell.leftbottom], [0, cell.lefttop], [cell.topleft, 1], [cell.topright, 1]];
  };
  /* rectangle cases */
  var p08 = function (cell) {
    return [[0, 0], [0, cell.leftbottom], [1, cell.rightbottom], [1, 0]];
  };
  var p09 = function (cell) {
    return [[1, 0], [cell.bottomright, 0], [cell.topright, 1], [1, 1]];
  };
  var p10 = function (cell) {
    return [[1, 1], [1, cell.righttop], [0, cell.lefttop], [0, 1]];
  };
  var p11 = function (cell) {
    return [[cell.bottomleft, 0], [0, 0], [0, 1], [cell.topleft, 1]];
  };
  var p12 = function (cell) {
    return [[1, cell.righttop], [1, cell.rightbottom], [0, cell.leftbottom], [0, cell.lefttop]];
  };
  var p13 = function (cell) {
    return [[cell.topleft, 1], [cell.topright, 1], [cell.bottomright, 0], [cell.bottomleft, 0]];
  };
  /* square case */
  var p14 = function () {
    return [[0, 0], [0, 1], [1, 1], [1, 0]];
  };
  /* pentagon cases */
  var p15 = function (cell) {
    return [[1, cell.rightbottom], [1, 0], [0, 0], [0, 1], [cell.topleft, 1]];
  };
  /* 1211 || 1011 */
  var p16 = function (cell) {
    return [[cell.topright, 1], [1, 1], [1, 0], [0, 0], [0, cell.leftbottom]];
  };
  /* 2111 || 0111 */
  var p17 = function (cell) {
    return [[1, 0], [cell.bottomright, 0], [0, cell.lefttop], [0, 1], [1, 1]];
  };
  /* 1112 || 1110 */
  var p18 = function (cell) {
    return [[1, 1], [1, cell.righttop], [cell.bottomleft, 0], [0, 0], [0, 1]];
  };
  /* 1121 || 1101 */
  var p19 = function (cell) {
    return [[1, cell.righttop], [1, cell.rightbottom], [0, cell.lefttop], [0, 1], [cell.topleft, 1]];
  };
  /* 1200 || 1022 */
  var p20 = function (cell) {
    return [[1, 1], [1, cell.righttop], [cell.bottomright, 0], [cell.bottomleft, 0], [cell.topright, 1]];
  };
  /* 0120 || 2102 */
  var p21 = function (cell) {
    return [[1, cell.rightbottom], [1, 0], [cell.bottomright, 0], [0, cell.leftbottom], [0, cell.lefttop]];
  };
  /* 0012 || 2210 */
  var p22 = function (cell) {
    return [[cell.topright, 1], [cell.bottomleft, 0], [0, 0], [0, cell.leftbottom], [cell.topleft, 1]];
  };
  /* 2001 || 0221 */
  var p23 = function (cell) {
    return [[cell.bottomright, 0], [cell.bottomleft, 0], [0, cell.lefttop], [0, 1], [cell.topleft, 1]];
  };
  /* 1002 || 1220 */
  var p24 = function (cell) {
    return [[1, 1], [1, cell.righttop], [0, cell.leftbottom], [0, cell.lefttop], [cell.topright, 1]];
  };
  /* 2100 || 0122 */
  var p25 = function (cell) {
    return [[1, cell.rightbottom], [1, 0], [cell.bottomright, 0], [cell.topleft, 1], [cell.topright, 1]];
  };
  /* 0210 || 2012 */
  var p26 = function (cell) {
    return [[1, cell.righttop], [1, cell.rightbottom], [cell.bottomleft, 0], [0, 0], [0, cell.leftbottom]];
  };
  /* 0021 || 2201 */
  /*hexagon cases */
  var p27 = function (cell) {
    return [[1, cell.rightbottom], [1, 0], [0, 0], [0, cell.leftbottom], [cell.topleft, 1], [cell.topright, 1]];
  };
  /* 0211 || 2011 */
  var p28 = function (cell) {
    return [[1, 1], [1, 0], [cell.bottomright, 0], [0, cell.leftbottom], [0, cell.lefttop], [cell.topright, 1]];
  };
  /* 2110 || 0112 */
  var p29 = function (cell) {
    return [[1, 1], [1, cell.righttop], [cell.bottomright, 0], [cell.bottomleft, 0], [0, cell.lefttop], [0, 1]];
  };
  /* 1102 || 1120 */
  var p30 = function (cell) {
    return [[1, cell.righttop], [1, cell.rightbottom], [cell.bottomleft, 0], [0, 0], [0, 1], [cell.topleft, 1]];
  };
  /* 1021 || 1201 */
  var p31 = function (cell) {
    return [[1, 1], [1, cell.righttop], [cell.bottomleft, 0], [0, 0], [0, cell.leftbottom], [cell.topright, 1]];
  };
  /* 2101 || 0121 */
  var p32 = function (cell) {
    return [[1, cell.rightbottom], [1, 0], [cell.bottomright, 0], [0, cell.lefttop], [0, 1], [cell.topleft, 1]];
  };
  /* 1012 || 1210 */
  /* 8-sided cases */
  var p33 = function (cell) {
    return [[1, cell.righttop], [1, cell.rightbottom], [cell.bottomright, 0], [cell.bottomleft, 0], [0, cell.leftbottom], [0, cell.lefttop], [cell.topleft, 1], [cell.topright, 1]];
  };
  /* flipped == 1 state for 0202 and 2020 */
  /* 6-sided cases */
  var p34 = function (cell) {
    return [[1, 1], [1, cell.righttop], [cell.bottomleft, 0], [0, 0], [0, cell.leftbottom], [cell.topright, 1]];
  };
  /* 0101 with flipped == 1 || 2121 with flipped == 1 */
  var p35 = function (cell) {
    return [[1, cell.rightbottom], [1, 0], [cell.bottomright, 0], [0, cell.lefttop], [0, 1], [cell.topleft, 1]];
  };
  /* 1010 with flipped == 1 || 1212 with flipped == 1 */
  /* 7-sided cases */
  var p36 = function (cell) {
    return [[1, 1], [1, cell.righttop], [cell.bottomright, 0], [cell.bottomleft, 0], [0, cell.leftbottom], [0, cell.lefttop], [cell.topright, 1]];
  };
  /* 2120 with flipped == 1 || 0102 with flipped == 1 */
  var p37 = function (cell) {
    return [[1, cell.righttop], [1, cell.rightbottom], [cell.bottomleft, 0], [0, 0], [0, cell.leftbottom], [cell.topleft, 1], [cell.topright, 1]];
  };
  /* 2021 with flipped == 1 || 0201 with flipped == 1 */
  var p38 = function (cell) {
    return [[1, cell.righttop], [1, cell.rightbottom], [cell.bottomright, 0], [cell.bottomleft, 0], [0, cell.lefttop], [0, 1], [cell.topleft, 1]];
  };
  /* 1202 with flipped == 1 || 1020 with flipped == 1 */
  var p39 = function (cell) {
    return [[1, cell.rightbottom], [1, 0], [cell.bottomright, 0], [0, cell.leftbottom], [0, cell.lefttop], [cell.topleft, 1], [cell.topright, 1]];
  };
  /* 0212 with flipped == 1 || 2010 with flipped == 1 */



  /*
    The lookup tables for edge number given the polygon
    is entered at a specific location
  */

  var isoBandEdgeRT = [];
  var isoBandEdgeRB = [];
  var isoBandEdgeBR = [];
  var isoBandEdgeBL = [];
  var isoBandEdgeLB = [];
  var isoBandEdgeLT = [];
  var isoBandEdgeTL = [];
  var isoBandEdgeTR = [];

  /* triangle cases */
  isoBandEdgeBL[1]    = isoBandEdgeLB[1]    = 18;
  isoBandEdgeBL[169]  = isoBandEdgeLB[169]  = 18;
  isoBandEdgeBR[4]    = isoBandEdgeRB[4]    = 12;
  isoBandEdgeBR[166]  = isoBandEdgeRB[166]  = 12;
  isoBandEdgeRT[16]   = isoBandEdgeTR[16]   = 4;
  isoBandEdgeRT[154]  = isoBandEdgeTR[154]  = 4;
  isoBandEdgeLT[64]   = isoBandEdgeTL[64]   = 22;
  isoBandEdgeLT[106]  = isoBandEdgeTL[106]  = 22;

  /* trapezoid cases */
  isoBandEdgeBR[2]    = isoBandEdgeLT[2]    = 17;
  isoBandEdgeBL[2]    = isoBandEdgeLB[2]    = 18;
  isoBandEdgeBR[168]  = isoBandEdgeLT[168]  = 17;
  isoBandEdgeBL[168]  = isoBandEdgeLB[168]  = 18;
  isoBandEdgeRT[8]    = isoBandEdgeBL[8]    = 9;
  isoBandEdgeRB[8]    = isoBandEdgeBR[8]    = 12;
  isoBandEdgeRT[162]  = isoBandEdgeBL[162]  = 9;
  isoBandEdgeRB[162]  = isoBandEdgeBR[162]  = 12;
  isoBandEdgeRT[32]   = isoBandEdgeTR[32]   = 4;
  isoBandEdgeRB[32]   = isoBandEdgeTL[32]   = 1;
  isoBandEdgeRT[138]  = isoBandEdgeTR[138]  = 4;
  isoBandEdgeRB[138]  = isoBandEdgeTL[138]  = 1;
  isoBandEdgeLB[128]  = isoBandEdgeTR[128]  = 21;
  isoBandEdgeLT[128]  = isoBandEdgeTL[128]  = 22;
  isoBandEdgeLB[42]   = isoBandEdgeTR[42]   = 21;
  isoBandEdgeLT[42]   = isoBandEdgeTL[42]   = 22;

  /* rectangle cases */
  isoBandEdgeRB[5] = isoBandEdgeLB[5] = 14;
  isoBandEdgeRB[165] = isoBandEdgeLB[165] = 14;
  isoBandEdgeBR[20] = isoBandEdgeTR[20] = 6;
  isoBandEdgeBR[150] = isoBandEdgeTR[150] = 6;
  isoBandEdgeRT[80] = isoBandEdgeLT[80] = 11;
  isoBandEdgeRT[90] = isoBandEdgeLT[90] = 11;
  isoBandEdgeBL[65] = isoBandEdgeTL[65] = 3;
  isoBandEdgeBL[105] = isoBandEdgeTL[105] = 3;
  isoBandEdgeRT[160] = isoBandEdgeLT[160] = 11;
  isoBandEdgeRB[160] = isoBandEdgeLB[160] = 14;
  isoBandEdgeRT[10] = isoBandEdgeLT[10] = 11;
  isoBandEdgeRB[10] = isoBandEdgeLB[10] = 14;
  isoBandEdgeBR[130] = isoBandEdgeTR[130] = 6;
  isoBandEdgeBL[130] = isoBandEdgeTL[130] = 3;
  isoBandEdgeBR[40] = isoBandEdgeTR[40] = 6;
  isoBandEdgeBL[40] = isoBandEdgeTL[40] = 3;

  /* pentagon cases */
  isoBandEdgeRB[101] = isoBandEdgeTL[101] = 1;
  isoBandEdgeRB[69] = isoBandEdgeTL[69] = 1;
  isoBandEdgeLB[149] = isoBandEdgeTR[149] = 21;
  isoBandEdgeLB[21] = isoBandEdgeTR[21] = 21;
  isoBandEdgeBR[86] = isoBandEdgeLT[86] = 17;
  isoBandEdgeBR[84] = isoBandEdgeLT[84] = 17;
  isoBandEdgeRT[89] = isoBandEdgeBL[89] = 9;
  isoBandEdgeRT[81] = isoBandEdgeBL[81] = 9;
  isoBandEdgeRT[96] = isoBandEdgeTL[96] = 0;
  isoBandEdgeRB[96] = isoBandEdgeLT[96] = 15;
  isoBandEdgeRT[74] = isoBandEdgeTL[74] = 0;
  isoBandEdgeRB[74] = isoBandEdgeLT[74] = 15;
  isoBandEdgeRT[24] = isoBandEdgeBR[24] = 8;
  isoBandEdgeBL[24] = isoBandEdgeTR[24] = 7;
  isoBandEdgeRT[146] = isoBandEdgeBR[146] = 8;
  isoBandEdgeBL[146] = isoBandEdgeTR[146] = 7;
  isoBandEdgeRB[6] = isoBandEdgeLT[6] = 15;
  isoBandEdgeBR[6] = isoBandEdgeLB[6] = 16;
  isoBandEdgeRB[164] = isoBandEdgeLT[164] = 15;
  isoBandEdgeBR[164] = isoBandEdgeLB[164] = 16;
  isoBandEdgeBL[129] = isoBandEdgeTR[129] = 7;
  isoBandEdgeLB[129] = isoBandEdgeTL[129] = 20;
  isoBandEdgeBL[41] = isoBandEdgeTR[41] = 7;
  isoBandEdgeLB[41] = isoBandEdgeTL[41] = 20;
  isoBandEdgeBR[66] = isoBandEdgeTL[66] = 2;
  isoBandEdgeBL[66] = isoBandEdgeLT[66] = 19;
  isoBandEdgeBR[104] = isoBandEdgeTL[104] = 2;
  isoBandEdgeBL[104] = isoBandEdgeLT[104] = 19;
  isoBandEdgeRT[144] = isoBandEdgeLB[144] = 10;
  isoBandEdgeLT[144] = isoBandEdgeTR[144] = 23;
  isoBandEdgeRT[26] = isoBandEdgeLB[26] = 10;
  isoBandEdgeLT[26] = isoBandEdgeTR[26] = 23;
  isoBandEdgeRB[36] = isoBandEdgeTR[36] = 5;
  isoBandEdgeBR[36] = isoBandEdgeTL[36] = 2;
  isoBandEdgeRB[134] = isoBandEdgeTR[134] = 5;
  isoBandEdgeBR[134] = isoBandEdgeTL[134] = 2;
  isoBandEdgeRT[9] = isoBandEdgeLB[9] = 10;
  isoBandEdgeRB[9] = isoBandEdgeBL[9] = 13;
  isoBandEdgeRT[161] = isoBandEdgeLB[161] = 10;
  isoBandEdgeRB[161] = isoBandEdgeBL[161] = 13;

  /* hexagon cases */
  isoBandEdgeRB[37] = isoBandEdgeTR[37] = 5;
  isoBandEdgeLB[37] = isoBandEdgeTL[37] = 20;
  isoBandEdgeRB[133] = isoBandEdgeTR[133] = 5;
  isoBandEdgeLB[133] = isoBandEdgeTL[133] = 20;
  isoBandEdgeBR[148] = isoBandEdgeLB[148] = 16;
  isoBandEdgeLT[148] = isoBandEdgeTR[148] = 23;
  isoBandEdgeBR[22] = isoBandEdgeLB[22] = 16;
  isoBandEdgeLT[22] = isoBandEdgeTR[22] = 23;
  isoBandEdgeRT[82] = isoBandEdgeBR[82] = 8;
  isoBandEdgeBL[82] = isoBandEdgeLT[82] = 19;
  isoBandEdgeRT[88] = isoBandEdgeBR[88] = 8;
  isoBandEdgeBL[88] = isoBandEdgeLT[88] = 19;
  isoBandEdgeRT[73] = isoBandEdgeTL[73] = 0;
  isoBandEdgeRB[73] = isoBandEdgeBL[73] = 13;
  isoBandEdgeRT[97] = isoBandEdgeTL[97] = 0;
  isoBandEdgeRB[97] = isoBandEdgeBL[97] = 13;
  isoBandEdgeRT[145] = isoBandEdgeBL[145] = 9;
  isoBandEdgeLB[145] = isoBandEdgeTR[145] = 21;
  isoBandEdgeRT[25] = isoBandEdgeBL[25] = 9;
  isoBandEdgeLB[25] = isoBandEdgeTR[25] = 21;
  isoBandEdgeRB[70] = isoBandEdgeTL[70] = 1;
  isoBandEdgeBR[70] = isoBandEdgeLT[70] = 17;
  isoBandEdgeRB[100] = isoBandEdgeTL[100] = 1;
  isoBandEdgeBR[100] = isoBandEdgeLT[100] = 17;

  /* 8-sided cases */
  isoBandEdgeRT[34] = isoBandEdgeBL[34] = 9;
  isoBandEdgeRB[34] = isoBandEdgeBR[34] = 12;
  isoBandEdgeLB[34] = isoBandEdgeTR[34] = 21;
  isoBandEdgeLT[34] = isoBandEdgeTL[34] = 22;
  isoBandEdgeRT[136] = isoBandEdgeTR[136] = 4;
  isoBandEdgeRB[136] = isoBandEdgeTL[136] = 1;
  isoBandEdgeBR[136] = isoBandEdgeLT[136] = 17;
  isoBandEdgeBL[136] = isoBandEdgeLB[136] = 18;
  isoBandEdgeRT[35] = isoBandEdgeTR[35] = 4;
  isoBandEdgeRB[35] = isoBandEdgeBR[35] = 12;
  isoBandEdgeBL[35] = isoBandEdgeLB[35] = 18;
  isoBandEdgeLT[35] = isoBandEdgeTL[35] = 22;

  /* 6-sided cases */
  isoBandEdgeRT[153] = isoBandEdgeTR[153] = 4;
  isoBandEdgeBL[153] = isoBandEdgeLB[153] = 18;
  isoBandEdgeRB[102] = isoBandEdgeBR[102] = 12;
  isoBandEdgeLT[102] = isoBandEdgeTL[102] = 22;
  isoBandEdgeRT[155] = isoBandEdgeBL[155] = 9;
  isoBandEdgeLB[155] = isoBandEdgeTR[155] = 23;
  isoBandEdgeRB[103] = isoBandEdgeTL[103] = 1;
  isoBandEdgeBR[103] = isoBandEdgeLT[103] = 17;

  /* 7-sided cases */
  isoBandEdgeRT[152] = isoBandEdgeTR[152] = 4;
  isoBandEdgeBR[152] = isoBandEdgeLT[152] = 17;
  isoBandEdgeBL[152] = isoBandEdgeLB[152] = 18;
  isoBandEdgeRT[156] = isoBandEdgeBR[156] = 8;
  isoBandEdgeBL[156] = isoBandEdgeLB[156] = 18;
  isoBandEdgeLT[156] = isoBandEdgeTR[156] = 23;
  isoBandEdgeRT[137] = isoBandEdgeTR[137] = 4;
  isoBandEdgeRB[137] = isoBandEdgeTL[137] = 1;
  isoBandEdgeBL[137] = isoBandEdgeLB[137] = 18;
  isoBandEdgeRT[139] = isoBandEdgeTR[139] = 4;
  isoBandEdgeRB[139] = isoBandEdgeBL[139] = 13;
  isoBandEdgeLB[139] = isoBandEdgeTL[139] = 20;
  isoBandEdgeRT[98] = isoBandEdgeBL[98] = 9;
  isoBandEdgeRB[98] = isoBandEdgeBR[98] = 12;
  isoBandEdgeLT[98] = isoBandEdgeTL[98] = 22;
  isoBandEdgeRT[99] = isoBandEdgeTL[99] = 0;
  isoBandEdgeRB[99] = isoBandEdgeBR[99] = 12;
  isoBandEdgeBL[99] = isoBandEdgeLT[99] = 19;
  isoBandEdgeRB[38] = isoBandEdgeBR[38] = 12;
  isoBandEdgeLB[38] = isoBandEdgeTR[38] = 21;
  isoBandEdgeLT[38] = isoBandEdgeTL[38] = 22;
  isoBandEdgeRB[39] = isoBandEdgeTR[39] = 5;
  isoBandEdgeBR[39] = isoBandEdgeLB[39] = 16;
  isoBandEdgeLT[39] = isoBandEdgeTL[39] = 22;

  /*
    The lookup tables for all different polygons that
    may appear within a grid cell
  */

  var polygon_table = [];

  /* triangle cases */
  polygon_table[1] = polygon_table[169] = p00; /* 2221 || 0001 */
  polygon_table[4] = polygon_table[166] = p01; /* 2212 || 0010 */
  polygon_table[16] = polygon_table[154] = p02; /* 2122 || 0100 */
  polygon_table[64] = polygon_table[106] = p03; /* 1222 || 1000 */

  /* trapezoid cases */
  polygon_table[168] = polygon_table[2] = p04; /* 2220 || 0002 */
  polygon_table[162] = polygon_table[8] = p05; /* 2202 || 0020 */
  polygon_table[138] = polygon_table[32] = p06; /* 2022 || 0200 */
  polygon_table[42] = polygon_table[128] = p07; /* 0222 || 2000 */

  /* rectangle cases */
  polygon_table[5] = polygon_table[165] = p08; /* 0011 || 2211 */
  polygon_table[20] = polygon_table[150] = p09; /* 0110 || 2112 */
  polygon_table[80] = polygon_table[90] = p10; /* 1100 || 1122 */
  polygon_table[65] = polygon_table[105] = p11; /* 1001 || 1221 */
  polygon_table[160] = polygon_table[10] = p12; /* 2200 || 0022 */
  polygon_table[130] = polygon_table[40] = p13; /* 2002 || 0220 */

  /* square case */
  polygon_table[85] = p14; /* 1111 */

  /* pentagon cases */
  polygon_table[101] = polygon_table[69] = p15; /* 1211 || 1011 */
  polygon_table[149] = polygon_table[21] = p16; /* 2111 || 0111 */
  polygon_table[86] = polygon_table[84] = p17; /* 1112 || 1110 */
  polygon_table[89] = polygon_table[81] = p18; /* 1121 || 1101 */
  polygon_table[96] = polygon_table[74] = p19; /* 1200 || 1022 */
  polygon_table[24] = polygon_table[146] = p20; /* 0120 || 2102 */
  polygon_table[6] = polygon_table[164] = p21; /* 0012 || 2210 */
  polygon_table[129] = polygon_table[41] = p22; /* 2001 || 0221 */
  polygon_table[66] = polygon_table[104] = p23; /* 1002 || 1220 */
  polygon_table[144] = polygon_table[26] = p24; /* 2100 || 0122 */
  polygon_table[36] = polygon_table[134] = p25; /* 0210 || 2012 */
  polygon_table[9] = polygon_table[161] = p26; /* 0021 || 2201 */

  /* hexagon cases */
  polygon_table[37] = polygon_table[133] = p27; /* 0211 || 2011 */
  polygon_table[148] = polygon_table[22] = p28; /* 2110 || 0112 */
  polygon_table[82] = polygon_table[88] = p29; /* 1102 || 1120 */
  polygon_table[73] = polygon_table[97] = p30; /* 1021 || 1201 */
  polygon_table[145] = polygon_table[25] = p31; /* 2101 || 0121 */
  polygon_table[70] = polygon_table[100] = p32; /* 1012 || 1210 */

  /* 8-sided cases */
  polygon_table[34] = function(c){ return [ p07(c), p05(c) ];}; /* 0202 || 2020 with flipped == 0 */
  polygon_table[35] = p33; /* flipped == 1 state for 0202 and 2020 */
  polygon_table[136] = function(c){ return [ p06(c), p04(c) ];}; /* 2020 || 0202 with flipped == 0 */

  /* 6-sided cases */
  polygon_table[153] = function(c){ return [ p02(c), p00(c) ];}; /* 0101 with flipped == 0 || 2121 with flipped == 2 */
  polygon_table[102] = function(c){ return [ p01(c), p03(c) ];}; /* 1010 with flipped == 0 || 1212 with flipped == 2 */
  polygon_table[155] = p34; /* 0101 with flipped == 1 || 2121 with flipped == 1 */
  polygon_table[103] = p35; /* 1010 with flipped == 1 || 1212 with flipped == 1 */

  /* 7-sided cases */
  polygon_table[152] = function(c){ return [ p02(c), p04(c) ];}; /* 2120 with flipped == 2 || 0102 with flipped == 0 */
  polygon_table[156] = p36; /* 2120 with flipped == 1 || 0102 with flipped == 1 */
  polygon_table[137] = function(c){ return [ p06(c), p00(c) ];}; /* 2021 with flipped == 2 || 0201 with flipped == 0 */
  polygon_table[139] = p37; /* 2021 with flipped == 1 || 0201 with flipped == 1 */
  polygon_table[98] = function(c){ return [ p05(c), p03(c) ];}; /* 1202 with flipped == 2 || 1020 with flipped == 0 */
  polygon_table[99] = p38; /* 1202 with flipped == 1 || 1020 with flipped == 1 */
  polygon_table[38] = function(c){ return [ p01(c), p07(c) ];}; /* 0212 with flipped == 2 || 2010 with flipped == 0 */
  polygon_table[39] = p39; /* 0212 with flipped == 1 || 2010 with flipped == 1 */
  
  
  /*
  ####################################
  Some small helper functions
  ####################################
  */

  /* assume that x1 == 1 &&  x0 == 0 */
  function interpolateX(y, y0, y1){
    return (y - y0) / (y1 - y0);
  }

  function isArray(myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;
  }

  /*
  ####################################
  Below is the actual Marching Squares implementation
  ####################################
  */

  function computeBandGrid(data, minV, bandwidth){
    var rows = data.length - 1;
    var cols = data[0].length - 1;
    var BandGrid = { rows: rows, cols: cols, cells: [] };

    var maxV = minV + Math.abs(bandwidth);

    for(var j = 0; j < rows; ++j){
      BandGrid.cells[j] = [];
      for(var i = 0; i < cols; ++i){
        /*  compose the 4-trit corner representation */
        var cval = 0;

        var tl = data[j+1][i];
        var tr = data[j+1][i+1];
        var br = data[j][i+1];
        var bl = data[j][i];

        if(isNaN(tl) || isNaN(tr) || isNaN(br) || isNaN(bl)){
          continue;
        }

        cval |= (tl < minV) ? 0 : (tl > maxV) ? 128 : 64;
        cval |= (tr < minV) ? 0 : (tr > maxV) ? 32 : 16;
        cval |= (br < minV) ? 0 : (br > maxV) ? 8 : 4;
        cval |= (bl < minV) ? 0 : (bl > maxV) ? 2 : 1;

        var cval_real = +cval;

        /* resolve ambiguity via averaging */
        var flipped = 0;
        if(     (cval === 17) /* 0101 */
            ||  (cval === 18) /* 0102 */
            ||  (cval === 33) /* 0201 */
            ||  (cval === 34) /* 0202 */
            ||  (cval === 38) /* 0212 */
            ||  (cval === 68) /* 1010 */
            ||  (cval === 72) /* 1020 */
            ||  (cval === 98) /* 1202 */
            ||  (cval === 102) /* 1212 */
            ||  (cval === 132) /* 2010 */
            ||  (cval === 136) /* 2020 */
            ||  (cval === 137) /* 2021 */
            ||  (cval === 152) /* 2120 */
            ||  (cval === 153) /* 2121 */
        ){
          var average = (tl + tr + br + bl) / 4;
          /* set flipped state */
          flipped = (average > maxV) ? 2 : (average < minV) ? 0 : 1;

          /* adjust cval for flipped cases */

          /* 8-sided cases */
          if(cval === 34){
            if(flipped === 1){
              cval = 35;
            } else if(flipped === 0){
              cval = 136;
            }
          } else if(cval === 136){
            if(flipped === 1){
              cval = 35;
              flipped = 4;
            } else if(flipped === 0){
              cval = 34;
            }
          }

          /* 6-sided polygon cases */
          else if(cval === 17){
            if(flipped === 1){
              cval = 155;
              flipped = 4;
            } else if(flipped === 0){
              cval = 153;
            }
          } else if(cval === 68){
            if(flipped === 1){
              cval = 103;
              flipped = 4;
            } else if(flipped === 0){
              cval = 102;
            }
          } else if(cval === 153){
            if(flipped === 1)
              cval = 155;
          } else if(cval === 102){
            if(flipped === 1)
              cval = 103;
          }

          /* 7-sided polygon cases */
          else if(cval === 152){
            if(flipped < 2){
              cval    = 156;
              flipped = 1;
            }
          } else if(cval === 137){
            if(flipped < 2){
              cval = 139;
              flipped = 1;
            }
          } else if(cval === 98){
            if(flipped < 2){
              cval    = 99;
              flipped = 1;
            }
          } else if(cval === 38){
            if(flipped < 2){
              cval    = 39;
              flipped = 1;
            }
          } else if(cval === 18){
            if(flipped > 0){
              cval = 156;
              flipped = 4;
            } else {
              cval = 152;
            }
          } else if(cval === 33){
            if(flipped > 0){
              cval = 139;
              flipped = 4;
            } else {
              cval = 137;
            }
          } else if(cval === 72){
            if(flipped > 0){
              cval = 99;
              flipped = 4;
            } else {
              cval = 98;
            }
          } else if(cval === 132){
            if(flipped > 0){
              cval = 39;
              flipped = 4;
            } else {
              cval = 38;
            }
          }
        }

        /* add cell to BandGrid if it contains at least one polygon-side */
        if((cval != 0) && (cval != 170)){
          var topleft, topright, bottomleft, bottomright,
              righttop, rightbottom, lefttop, leftbottom;

          topleft = topright = bottomleft = bottomright = righttop
                  = rightbottom = lefttop = leftbottom = 0.5;

          var edges = [];

          /* do interpolation here */
          /* 1st Triangles */
          if(cval === 1){ /* 0001 */
            bottomleft = 1 - interpolateX(minV, br, bl);
            leftbottom = 1 - interpolateX(minV, tl, bl);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 169){ /* 2221 */
            bottomleft = interpolateX(maxV, bl, br);
            leftbottom = interpolateX(maxV, bl, tl);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 4){ /* 0010 */
            rightbottom = 1 - interpolateX(minV, tr, br);
            bottomright = interpolateX(minV, bl, br);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 166){ /* 2212 */
            rightbottom = interpolateX(maxV, br, tr);
            bottomright = 1 - interpolateX(maxV, br, bl);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 16){ /* 0100 */
            righttop = interpolateX(minV, br, tr);
            topright = interpolateX(minV, tl, tr);
            edges.push(isoBandEdgeRT[cval]);
          } else if(cval === 154){ /* 2122 */
            righttop = 1 - interpolateX(maxV, tr, br);
            topright = 1 - interpolateX(maxV, tr, tl);
            edges.push(isoBandEdgeRT[cval]);
          } else if(cval === 64){ /* 1000 */
            lefttop = interpolateX(minV, bl, tl);
            topleft = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 106){ /* 1222 */
            lefttop = 1 - interpolateX(maxV, tl, bl);
            topleft = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeLT[cval]);
          }
          /* 2nd Trapezoids */
          else if(cval === 168){ /* 2220 */
            bottomright = interpolateX(maxV, bl, br);
            bottomleft = interpolateX(minV, bl, br);
            leftbottom = interpolateX(minV, bl, tl);
            lefttop = interpolateX(maxV, bl, tl);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 2){ /* 0002 */
            bottomright = 1 - interpolateX(minV, br, bl);
            bottomleft = 1 - interpolateX(maxV, br, bl);
            leftbottom = 1 - interpolateX(maxV, tl, bl);
            lefttop = 1 - interpolateX(minV, tl, bl);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 162){ /* 2202 */
            righttop = interpolateX(maxV, br, tr);
            rightbottom = interpolateX(minV, br, tr);
            bottomright = 1 - interpolateX(minV, br, bl);
            bottomleft = 1 - interpolateX(maxV, br, bl);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 8){ /* 0020 */
            righttop = 1 - interpolateX(minV, tr, br);
            rightbottom = 1 - interpolateX(maxV, tr, br);
            bottomright = interpolateX(maxV, bl, br);
            bottomleft = interpolateX(minV, bl, br);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 138){ /* 2022 */
            righttop = 1 - interpolateX(minV, tr, br);
            rightbottom = 1 - interpolateX(maxV, tr, br);
            topleft = 1 - interpolateX(maxV, tr, tl);
            topright = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 32){ /* 0200 */
            righttop = interpolateX(maxV, br, tr);
            rightbottom = interpolateX(minV, br, tr);
            topleft = interpolateX(minV, tl, tr);
            topright = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 42){ /* 0222 */
            leftbottom = 1 - interpolateX(maxV, tl, bl);
            lefttop = 1 - interpolateX(minV, tl, bl);
            topleft = interpolateX(minV, tl, tr);
            topright = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeLB[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 128){ /* 2000 */
            leftbottom = interpolateX(minV, bl, tl);
            lefttop = interpolateX(maxV, bl, tl);
            topleft = 1 - interpolateX(maxV, tr, tl);
            topright = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeLB[cval]);
            edges.push(isoBandEdgeLT[cval]);
          }

          /* 3rd rectangle cases */
          if(cval === 5){ /* 0011 */
            rightbottom = 1 - interpolateX(minV, tr, br);
            leftbottom = 1 - interpolateX(minV, tl, bl);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 165){ /* 2211 */
            rightbottom = interpolateX(maxV, br, tr);
            leftbottom = interpolateX(maxV, bl, tl);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 20){ /* 0110 */
            bottomright = interpolateX(minV, bl, br);
            topright = interpolateX(minV, tl, tr);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 150){ /* 2112 */
            bottomright = 1 - interpolateX(maxV, br, bl);
            topright = 1 - interpolateX(maxV, tr, tl);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 80){ /* 1100 */
            righttop = interpolateX(minV, br, tr);
            lefttop = interpolateX(minV, bl, tl);
            edges.push(isoBandEdgeRT[cval]);
          } else if(cval === 90){ /* 1122 */
            righttop = 1 - interpolateX(maxV, tr, br);
            lefttop = 1 - interpolateX(maxV, tl, bl);
            edges.push(isoBandEdgeRT[cval]);
          } else if(cval === 65){ /* 1001 */
            bottomleft = 1 - interpolateX(minV, br, bl);
            topleft = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 105){ /* 1221 */
            bottomleft = interpolateX(maxV, bl, br);
            topleft = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 160){ /* 2200 */
            righttop = interpolateX(maxV, br, tr);
            rightbottom = interpolateX(minV, br, tr);
            leftbottom = interpolateX(minV, bl, tl);
            lefttop = interpolateX(maxV, bl, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 10){ /* 0022 */
            righttop = 1 - interpolateX(minV, tr, br);
            rightbottom = 1 - interpolateX(maxV, tr, br);
            leftbottom = 1 - interpolateX(maxV, tl, bl);
            lefttop = 1 - interpolateX(minV, tl, bl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 130){ /* 2002 */
            bottomright = 1 - interpolateX(minV, br, bl);
            bottomleft = 1 - interpolateX(maxV, br, bl);
            topleft = 1 - interpolateX(maxV, tr, tl);
            topright = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 40){ /* 0220 */
            bottomright = interpolateX(maxV, bl, br);
            bottomleft = interpolateX(minV, bl, br);
            topleft = interpolateX(minV, tl, tr);
            topright = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeBL[cval]);
          }

          /* 4th single pentagon cases */
          else if(cval === 101){ /* 1211 */
            rightbottom = interpolateX(maxV, br, tr);
            topleft = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 69){ /* 1011 */
            rightbottom = 1 - interpolateX(minV, tr, br);
            topleft = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 149){ /* 2111 */
            leftbottom = interpolateX(maxV, bl, tl);
            topright = 1 - interpolateX(maxV, tr, tl);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 21){ /* 0111 */
            leftbottom = 1 - interpolateX(minV, tl, bl);
            topright = interpolateX(minV, tl, tr);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 86){ /* 1112 */
            bottomright = 1 - interpolateX(maxV, br, bl);
            lefttop = 1 - interpolateX(maxV, tl, bl);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 84){ /* 1110 */
            bottomright = interpolateX(minV, bl, br);
            lefttop = interpolateX(minV, bl, tl);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 89){ /* 1121 */
            righttop = 1 - interpolateX(maxV, tr, br);
            bottomleft = interpolateX(maxV, bl, br);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 81){ /* 1101 */
            righttop = interpolateX(minV, br, tr);
            bottomleft = 1 - interpolateX(minV, br, bl);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 96){ /* 1200 */
            righttop = interpolateX(maxV, br, tr);
            rightbottom = interpolateX(minV, br, tr);
            lefttop = interpolateX(minV, bl, tl);
            topleft = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 74){ /* 1022 */
            righttop = 1 - interpolateX(minV, tr, br);
            rightbottom = 1- interpolateX(maxV, tr, br);
            lefttop = 1 - interpolateX(maxV, tl, bl);
            topleft = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 24){ /* 0120 */
            righttop = 1 - interpolateX(maxV, tr, br);
            bottomright = interpolateX(maxV, bl, br);
            bottomleft = interpolateX(minV, bl, br);
            topright = interpolateX(minV, tl, tr);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 146){ /* 2102 */
            righttop = interpolateX(minV, br, tr);
            bottomright = 1 - interpolateX(minV, br, bl);
            bottomleft = 1 - interpolateX(maxV, br, bl);
            topright = 1 - interpolateX(maxV, tr, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 6){ /* 0012 */
            rightbottom = 1 - interpolateX(minV, tr, br);
            bottomright = 1 - interpolateX(maxV, br, bl);
            leftbottom = 1 - interpolateX(maxV, tl, bl);
            lefttop = 1 - interpolateX(minV, tl, bl);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 164){ /* 2210 */
            rightbottom = interpolateX(maxV, br, tr);
            bottomright = interpolateX(minV, bl, br);
            leftbottom = interpolateX(minV, bl, tl);
            lefttop = interpolateX(maxV, bl, tl);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 129){ /* 2001 */
            bottomleft = 1 - interpolateX(minV, br, bl);
            leftbottom = interpolateX(maxV, bl, tl);
            topleft = 1 - interpolateX(maxV, tr, tl);
            topright = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeBL[cval]);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 41){ /* 0221 */
            bottomleft = interpolateX(maxV, bl, br);
            leftbottom = 1 - interpolateX(minV, tl, bl);
            topleft = interpolateX(minV, tl, tr);
            topright = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeBL[cval]);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 66){ /* 1002 */
            bottomright = 1 - interpolateX(minV, br, bl);
            bottomleft = 1 - interpolateX(maxV, br, bl);
            lefttop = 1 - interpolateX(maxV, tl, bl);
            topleft = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 104){ /* 1220 */
            bottomright = interpolateX(maxV, bl, br);
            bottomleft = interpolateX(minV, bl, br);
            lefttop = interpolateX(minV, bl, tl);
            topleft = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeBL[cval]);
            edges.push(isoBandEdgeTL[cval]);
          } else if(cval === 144){ /* 2100 */
            righttop = interpolateX(minV, br, tr);
            leftbottom = interpolateX(minV, bl, tl);
            lefttop = interpolateX(maxV, bl, tl);
            topright = 1 - interpolateX(maxV, tr, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 26){ /* 0122 */
            righttop = 1 - interpolateX(maxV, tr, br);
            leftbottom = 1 - interpolateX(maxV, tl, bl);
            lefttop = 1 - interpolateX(minV, tl, bl);
            topright = interpolateX(minV, tl, tr);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 36){ /* 0210 */
            rightbottom = interpolateX(maxV, br, tr);
            bottomright = interpolateX(minV, bl, br);
            topleft = interpolateX(minV, tl, tr);
            topright = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 134){ /* 2012 */
            rightbottom = 1 - interpolateX(minV, tr, br);
            bottomright = 1 - interpolateX(maxV, br, bl);
            topleft = 1 - interpolateX(maxV, tr, tl);
            topright = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 9){ /* 0021 */
            righttop = 1 - interpolateX(minV, tr, br);
            rightbottom = 1 - interpolateX(maxV, tr, br);
            bottomleft = interpolateX(maxV, bl, br);
            leftbottom = 1 - interpolateX(minV, tl, bl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 161){ /* 2201 */
            righttop = interpolateX(maxV, br, tr);
            rightbottom = interpolateX(minV, br, tr);
            bottomleft = 1 - interpolateX(minV, br, bl);
            leftbottom = interpolateX(maxV, bl, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          }

          /* 5th single hexagon cases */
          else if(cval === 37){ /* 0211 */
            rightbottom = interpolateX(maxV, br, tr);
            leftbottom = 1- interpolateX(minV, tl, bl);
            topleft = interpolateX(minV, tl, tr);
            topright = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 133){ /* 2011 */
            rightbottom = 1 - interpolateX(minV, tr, br);
            leftbottom = interpolateX(maxV, bl, tl);
            topleft = 1 - interpolateX(maxV, tr, tl);
            topright = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 148){ /* 2110 */
            bottomright = interpolateX(minV, bl, br);
            leftbottom = interpolateX(minV, bl, tl);
            lefttop = interpolateX(maxV, bl, tl);
            topright = 1 - interpolateX(maxV, tr, tl);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 22){ /* 0112 */
            bottomright = 1 - interpolateX(maxV, br, bl);
            leftbottom = 1 - interpolateX(maxV, tl, bl);
            lefttop = 1 - interpolateX(minV, tl, bl);
            topright = interpolateX(minV, tl, tr);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 82){ /* 1102 */
            righttop = interpolateX(minV, br, tr);
            bottomright = 1- interpolateX(minV, br, bl);
            bottomleft = 1 - interpolateX(maxV, br, bl);
            lefttop = 1 - interpolateX(maxV, tl, bl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 88){ /* 1120 */
            righttop = 1 - interpolateX(maxV, tr, br);
            bottomright = interpolateX(maxV, bl, br);
            bottomleft = interpolateX(minV, bl, br);
            lefttop = interpolateX(minV, bl, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 73){ /* 1021 */
            righttop = 1 - interpolateX(minV, tr, br);
            rightbottom = 1 - interpolateX(maxV, tr, br);
            bottomleft = interpolateX(maxV, bl, br);
            topleft = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 97){ /* 1201 */
            righttop = interpolateX(maxV, br, tr);
            rightbottom = interpolateX(minV, br, tr);
            bottomleft = 1 - interpolateX(minV, br, bl);
            topleft = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
          } else if(cval === 145){ /* 2101 */
            righttop = interpolateX(minV, br, tr);
            bottomleft = 1 - interpolateX(minV, br, bl);
            leftbottom = interpolateX(maxV, bl, tl);
            topright = 1 - interpolateX(maxV, tr, tl);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 25){ /* 0121 */
            righttop = 1 - interpolateX(maxV, tr, br);
            bottomleft = interpolateX(maxV, bl, br);
            leftbottom = 1 - interpolateX(minV, tl, bl);
            topright = interpolateX(minV, tl, tr);
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 70){ /* 1012 */
            rightbottom = 1 - interpolateX(minV, tr, br);
            bottomright = 1 - interpolateX(maxV, br, bl);
            lefttop = 1 - interpolateX(maxV, tl, bl);
            topleft = 1 - interpolateX(minV, tr, tl);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBR[cval]);
          } else if(cval === 100){ /* 1210 */
            rightbottom = interpolateX(maxV, br, tr);
            bottomright = interpolateX(minV, bl, br);
            lefttop = interpolateX(minV, bl, tl);
            topleft = interpolateX(maxV, tl, tr);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBR[cval]);
          }

          /* 8-sided cases */
          else if(cval === 34){ /* 0202 || 2020 with flipped == 0 */
            if(flipped === 0){
              righttop = 1 - interpolateX(minV, tr, br);
              rightbottom = 1 - interpolateX(maxV, tr, br);
              bottomright = interpolateX(maxV, bl, br);
              bottomleft = interpolateX(minV, bl, br);
              leftbottom = interpolateX(minV, bl, tl);
              lefttop = interpolateX(maxV, bl, tl);
              topleft = 1 - interpolateX(maxV, tr, tl);
              topright = 1 - interpolateX(minV, tr, tl);
            } else {
              righttop = interpolateX(maxV, br, tr);
              rightbottom = interpolateX(minV, br, tr);
              bottomright = 1 - interpolateX(minV, br, bl);
              bottomleft = 1 - interpolateX(maxV, br, bl);
              leftbottom = 1 - interpolateX(maxV, tl, bl);
              lefttop = 1 - interpolateX(minV, tl, bl);
              topleft = interpolateX(minV, tl, tr);
              topright = interpolateX(maxV, tl, tr);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeLB[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 35){ /* flipped == 1 state for 0202, and 2020 with flipped == 4*/
            if(flipped === 4){
              righttop = 1 - interpolateX(minV, tr, br);
              rightbottom = 1 - interpolateX(maxV, tr, br);
              bottomright = interpolateX(maxV, bl, br);
              bottomleft = interpolateX(minV, bl, br);
              leftbottom = interpolateX(minV, bl, tl);
              lefttop = interpolateX(maxV, bl, tl);
              topleft = 1 - interpolateX(maxV, tr, tl);
              topright = 1 - interpolateX(minV, tr, tl);
            } else {
              righttop = interpolateX(maxV, br, tr);
              rightbottom = interpolateX(minV, br, tr);
              bottomright = 1 - interpolateX(minV, br, bl);
              bottomleft = 1 - interpolateX(maxV, br, bl);
              leftbottom = 1 - interpolateX(maxV, tl, bl);
              lefttop = 1 - interpolateX(minV, tl, bl);
              topleft = interpolateX(minV, tl, tr);
              topright = interpolateX(maxV, tl, tr);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBL[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 136){ /* 2020 || 0202 with flipped == 0 */
            if(flipped === 0){
              righttop = interpolateX(maxV, br, tr);
              rightbottom = interpolateX(minV, br, tr);
              bottomright = 1 - interpolateX(minV, br, bl);
              bottomleft = 1 - interpolateX(maxV, br, bl);
              leftbottom = 1 - interpolateX(maxV, tl, bl);
              lefttop = 1 - interpolateX(minV, tl, bl);
              topleft = interpolateX(minV, tl, tr);
              topright = interpolateX(maxV, tl, tr);
            } else {
              righttop = 1 - interpolateX(minV, tr, br);
              rightbottom = 1 - interpolateX(maxV, tr, br);
              bottomright = interpolateX(maxV, bl, br);
              bottomleft = interpolateX(minV, bl, br);
              leftbottom = interpolateX(minV, bl, tl);
              lefttop = interpolateX(maxV, bl, tl);
              topleft = 1 - interpolateX(maxV, tr, tl);
              topright = 1 - interpolateX(minV, tr, tl);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeLB[cval]);
            edges.push(isoBandEdgeLT[cval]);
          }

          /* 6-sided polygon cases */
          else if(cval === 153){ /* 0101 with flipped == 0 || 2121 with flipped == 2 */
            if(flipped === 0){
              righttop = interpolateX(minV, br, tr);
              bottomleft = 1 - interpolateX(minV, br, bl);
              leftbottom = 1 - interpolateX(minV, tl, bl);
              topright = interpolateX(minV, tl, tr);
            } else {
              righttop = 1 - interpolateX(maxV, tr, br);
              bottomleft = interpolateX(maxV, bl, br);
              leftbottom = interpolateX(maxV, bl, tl);
              topright = 1 - interpolateX(maxV, tr, tl);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 102){ /* 1010 with flipped == 0 || 1212 with flipped == 2 */
            if(flipped === 0){
              rightbottom = 1 - interpolateX(minV, tr, br);
              bottomright = interpolateX(minV, bl, br);
              lefttop = interpolateX(minV, bl, tl);
              topleft = 1 - interpolateX(minV, tr, tl);
            } else {
              rightbottom = interpolateX(maxV, br, tr);
              bottomright = 1 - interpolateX(maxV, br, bl);
              lefttop = 1 - interpolateX(maxV, tl, bl);
              topleft = interpolateX(maxV, tl, tr);
            }
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 155){ /* 0101 with flipped == 4 || 2121 with flipped == 1 */
            if(flipped === 4){
              righttop = interpolateX(minV, br, tr);
              bottomleft = 1 - interpolateX(minV, br, bl);
              leftbottom = 1 - interpolateX(minV, tl, bl);
              topright = interpolateX(minV, tl, tr);
            } else {
              righttop = 1 - interpolateX(maxV, tr, br);
              bottomleft = interpolateX(maxV, bl, br);
              leftbottom = interpolateX(maxV, bl, tl);
              topright = 1 - interpolateX(maxV, tr, tl);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 103){ /* 1010 with flipped == 4 || 1212 with flipped == 1 */
            if(flipped === 4){
              rightbottom = 1 - interpolateX(minV, tr, br);
              bottomright = interpolateX(minV, bl, br);
              lefttop = interpolateX(minV, bl, tl);
              topleft = 1 - interpolateX(minV, tr, tl);
            } else {
              rightbottom = interpolateX(maxV, br, tr);
              bottomright = 1 - interpolateX(maxV, br, bl);
              lefttop = 1 - interpolateX(maxV, tl, bl);
              topleft = interpolateX(maxV, tl, tr);
            }
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBR[cval]);
          }

          /* 7-sided polygon cases */
          else if(cval === 152){ /* 2120 with flipped == 2 || 0102 with flipped == 0 */
            if(flipped === 0){
              righttop = interpolateX(minV, br, tr);
              bottomright = 1 - interpolateX(minV, br, bl);
              bottomleft = 1 - interpolateX(maxV, br, bl);
              leftbottom = 1 - interpolateX(maxV, tl, bl);
              lefttop = 1 - interpolateX(minV, tl, bl);
              topright = interpolateX(minV, tl, tr);
            } else {
              righttop = 1 - interpolateX(maxV, tr, br);
              bottomright = interpolateX(maxV, bl, br);
              bottomleft = interpolateX(minV, bl, br);
              leftbottom = interpolateX(minV, bl, tl);
              lefttop = interpolateX(maxV, bl, tl);
              topright = 1 - interpolateX(maxV, tr, tl);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 156){ /* 2120 with flipped == 1 || 0102 with flipped == 4 */
            if(flipped === 4){
              righttop = interpolateX(minV, br, tr);
              bottomright = 1 - interpolateX(minV, br, bl);
              bottomleft = 1 - interpolateX(maxV, br, bl);
              leftbottom = 1 - interpolateX(maxV, tl, bl);
              lefttop = 1 - interpolateX(minV, tl, bl);
              topright = interpolateX(minV, tl, tr);
            } else {
              righttop = 1 - interpolateX(maxV, tr, br);
              bottomright = interpolateX(maxV, bl, br);
              bottomleft = interpolateX(minV, bl, br);
              leftbottom = interpolateX(minV, bl, tl);
              lefttop = interpolateX(maxV, bl, tl);
              topright = 1 - interpolateX(maxV, tr, tl);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeBL[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 137){ /* 2021 with flipped == 2 || 0201 with flipped == 0 */
            if(flipped === 0){
              righttop = interpolateX(maxV, br, tr);
              rightbottom = interpolateX(minV, br, tr);
              bottomleft = 1 - interpolateX(minV, br, bl);
              leftbottom = 1 - interpolateX(minV, tl, bl);
              topleft = interpolateX(minV, tl, tr);
              topright = interpolateX(maxV, tl, tr);
            } else {
              righttop = 1 - interpolateX(minV, tr, br);
              rightbottom = 1 - interpolateX(maxV, tr, br);
              bottomleft = interpolateX(maxV, bl, br);
              leftbottom = interpolateX(maxV, bl, tl);
              topleft = 1 - interpolateX(maxV, tr, tl);
              topright = 1 - interpolateX(minV, tr, tl);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 139){ /* 2021 with flipped == 1 || 0201 with flipped == 4 */
            if(flipped === 4){
              righttop = interpolateX(maxV, br, tr);
              rightbottom = interpolateX(minV, br, tr);
              bottomleft = 1 - interpolateX(minV, br, bl);
              leftbottom = 1 - interpolateX(minV, tl, bl);
              topleft = interpolateX(minV, tl, tr);
              topright = interpolateX(maxV, tl, tr);
            } else {
              righttop = 1 - interpolateX(minV, tr, br);
              rightbottom = 1 - interpolateX(maxV, tr, br);
              bottomleft = interpolateX(maxV, bl, br);
              leftbottom = interpolateX(maxV, bl, tl);
              topleft = 1 - interpolateX(maxV, tr, tl);
              topright = 1 - interpolateX(minV, tr, tl);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeLB[cval]);
          } else if(cval === 98){ /* 1202 with flipped == 2 || 1020 with flipped == 0 */
            if(flipped === 0){
              righttop = 1 - interpolateX(minV, tr, br);
              rightbottom = 1 - interpolateX(maxV, tr, br);
              bottomright = interpolateX(maxV, bl, br);
              bottomleft = interpolateX(minV, bl, br);
              lefttop = interpolateX(minV, bl, tl);
              topleft = 1 - interpolateX(minV, tr, tl);
            } else {
              righttop = interpolateX(maxV, br, tr);
              rightbottom = interpolateX(minV, br, tr);
              bottomright = 1 - interpolateX(minV, br, bl);
              bottomleft = 1 - interpolateX(maxV, br, bl);
              lefttop = 1 - interpolateX(maxV, tl, bl);
              topleft = interpolateX(maxV, tl, tr);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 99){ /* 1202 with flipped == 1 || 1020 with flipped == 4 */
            if(flipped === 4){
              righttop = 1 - interpolateX(minV, tr, br);
              rightbottom = 1 - interpolateX(maxV, tr, br);
              bottomright = interpolateX(maxV, bl, br);
              bottomleft = interpolateX(minV, bl, br);
              lefttop = interpolateX(minV, bl, tl);
              topleft = 1 - interpolateX(minV, tr, tl);
            } else {
              righttop = interpolateX(maxV, br, tr);
              rightbottom = interpolateX(minV, br, tr);
              bottomright = 1 - interpolateX(minV, br, bl);
              bottomleft = 1 - interpolateX(maxV, br, bl);
              lefttop = 1 - interpolateX(maxV, tl, bl);
              topleft = interpolateX(maxV, tl, tr);
            }
            edges.push(isoBandEdgeRT[cval]);
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBL[cval]);
          } else if(cval === 38){ /* 0212 with flipped == 2 || 2010 with flipped == 0 */
            if(flipped === 0){
              rightbottom = 1 - interpolateX(minV, tr, br);
              bottomright = interpolateX(minV, bl, br);
              leftbottom = interpolateX(minV, bl, tl);
              lefttop = interpolateX(maxV, bl, tl);
              topleft = 1 - interpolateX(maxV, tr, tl);
              topright = 1 - interpolateX(minV, tr, tl);
            } else {
              rightbottom = interpolateX(maxV, br, tr);
              bottomright = 1 - interpolateX(maxV, br, bl);
              leftbottom = 1 - interpolateX(maxV, tl, bl);
              lefttop = 1 - interpolateX(minV, tl, bl);
              topleft = interpolateX(minV, tl, tr);
              topright = interpolateX(maxV, tl, tr);
            }
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeLB[cval]);
            edges.push(isoBandEdgeLT[cval]);
          } else if(cval === 39){ /* 0212 with flipped == 1 || 2010 with flipped == 4 */
            if(flipped === 4){
              rightbottom = 1 - interpolateX(minV, tr, br);
              bottomright = interpolateX(minV, bl, br);
              leftbottom = interpolateX(minV, bl, tl);
              lefttop = interpolateX(maxV, bl, tl);
              topleft = 1 - interpolateX(maxV, tr, tl);
              topright = 1 - interpolateX(minV, tr, tl);
            } else {
              rightbottom = interpolateX(maxV, br, tr);
              bottomright = 1 - interpolateX(maxV, br, bl);
              leftbottom = 1 - interpolateX(maxV, tl, bl);
              lefttop = 1 - interpolateX(minV, tl, bl);
              topleft = interpolateX(minV, tl, tr);
              topright = interpolateX(maxV, tl, tr);
            }
            edges.push(isoBandEdgeRB[cval]);
            edges.push(isoBandEdgeBR[cval]);
            edges.push(isoBandEdgeLT[cval]);
          }

          else if(cval === 85){
            righttop = 1;
            rightbottom = 0;
            bottomright = 1;
            bottomleft = 0;
            leftbottom = 0;
            lefttop = 1;
            topleft = 0;
            topright = 1;
          }

          if(topleft < 0 || topleft > 1 || topright < 0 || topright > 1 || righttop < 0 || righttop > 1 || bottomright < 0 || bottomright > 1 || leftbottom < 0 || leftbottom > 1 || lefttop < 0 || lefttop > 1){
            console.log("MarchingSquaresJS-isoBands: " + cval + " " + cval_real + " " + tl + "," + tr + "," + br + "," + bl + " " + flipped + " " + topleft + " " + topright + " " + righttop + " " + rightbottom + " " + bottomright + " " + bottomleft + " " + leftbottom + " " + lefttop);
          }

          BandGrid.cells[j][i] = {
                                    cval:         cval,
                                    cval_real:    cval_real,
                                    flipped:      flipped,
                                    topleft:      topleft,
                                    topright:     topright,
                                    righttop:     righttop,
                                    rightbottom:  rightbottom,
                                    bottomright:  bottomright,
                                    bottomleft:   bottomleft,
                                    leftbottom:   leftbottom,
                                    lefttop:      lefttop,
                                    edges:        edges
                                };
        }
      }
    }

    return BandGrid;
  }

  function BandGrid2AreaPaths(grid){
    var areas = [];
    var rows = grid.rows;
    var cols = grid.cols;
    var currentPolygon = [];

    for(var j = 0; j < rows; j++){
      for(var i = 0; i < cols; i++){
        if((typeof grid.cells[j][i] !== 'undefined') && (grid.cells[j][i].edges.length > 0)){
          /* trace back polygon path starting from this cell */

          var cell = grid.cells[j][i];

          /* get start coordinates */

          var prev  = getStartXY(cell),
              next  = null,
              p     = i,
              q     = j;

          if(prev !== null){
            currentPolygon.push([ prev.p[0] + p, prev.p[1] + q ]);
            //console.log(cell);
            //console.log("coords: " + (prev.p[0] + p) + " " + (prev.p[1] + q));
          }

          do{
            //console.log(p + "," + q);
            //console.log(grid.cells[q][p]);
            //console.log(grid.cells[q][p].edges);
            //console.log("from : " + prev.x + " " + prev.y + " " + prev.o);

            next = getExitXY(grid.cells[q][p], prev.x, prev.y, prev.o);
            if(next !== null){
              //console.log("coords: " + (next.p[0] + p) + " " + (next.p[1] + q));
              currentPolygon.push([ next.p[0] + p, next.p[1] + q ]);
              p += next.x;
              q += next.y;
              prev = next;
            } else {
              //console.log("getExitXY() returned null!");
              break;
            }
            //console.log("to : " + next.x + " " + next.y + " " + next.o);
            /* special case, where we've reached the grid boundaries */
            if((q < 0) || (q >= rows) || (p < 0) || (p >= cols) || (typeof grid.cells[q][p] === 'undefined')){
              /* to create a closed path, we need to trace our way
                  arround the missing data, until we find an entry
                  point again
              */

              /* set back coordinates of current cell */
              p -= next.x;
              q -= next.y;

              //console.log("reached boundary at " + p + " " + q);

              var missing = traceOutOfGridPath(grid, p, q, next.x, next.y, next.o);
              if(missing !== null){
                missing.path.forEach(function(pp){
                  //console.log("coords: " + (pp[0]) + " " + (pp[1]));
                  currentPolygon.push(pp);
                });
                p = missing.i;
                q = missing.j;
                prev = missing;
              } else {
                break;
              }
              //console.log(grid.cells[q][p]);
            }
          } while(    (typeof grid.cells[q][p] !== 'undefined')
                   && (grid.cells[q][p].edges.length > 0));

          areas.push(currentPolygon);
          //console.log("next polygon");
          //console.log(currentPolygon);
          currentPolygon = [];
          if(grid.cells[j][i].edges.length > 0)
            i--;
        }
      }
    }
    return areas;
  }

  function traceOutOfGridPath(grid, i, j, d_x, d_y, d_o){
    var cell = grid.cells[j][i];
    var cval = cell.cval_real;
    var p = i + d_x,
        q = j + d_y;
    var path = [];
    var closed = false;

    while(!closed){
      //console.log("processing cell " + p + "," + q + " " + d_x + " " + d_y + " " + d_o);
      if((typeof grid.cells[q] === 'undefined') || (typeof grid.cells[q][p] === 'undefined')){
        //console.log("which is undefined");
        /* we can't move on, so we have to change direction to proceed further */

        /* go back to previous cell */
        q -= d_y;
        p -= d_x;
        cell = grid.cells[q][p];
        cval = cell.cval_real;

        /* check where we've left defined cells of the grid... */
        if(d_y === -1){ /* we came from top */
          if(d_o === 0){  /* exit left */
            if(cval & Node3){ /* lower left node is within range, so we move left */
              path.push([p, q]);
              d_x = -1;
              d_y = 0;
              d_o = 0;
            } else if(cval & Node2){ /* lower right node is within range, so we move right */
              path.push([p + 1, q]);
              d_x = 1;
              d_y = 0;
              d_o = 0;
            } else { /* close the path */
              path.push([p + cell.bottomright, q]);
              d_x = 0;
              d_y = 1;
              d_o = 1;
              closed = true;
              break;
            }
          } else {
            if(cval & Node3){
              path.push([p, q]);
              d_x = -1;
              d_y = 0;
              d_o = 0;
            } else if(cval & Node2){
              path.push([p + cell.bottomright, q]);
              d_x = 0;
              d_y = 1;
              d_o = 1;
              closed = true;
              break;
            } else {
              path.push([p + cell.bottomleft, q]);
              d_x = 0;
              d_y = 1;
              d_o = 0;
              closed = true;
              break;
            }
          }
        } else if(d_y === 1){ /* we came from bottom */
          //console.log("we came from bottom and hit a non-existing cell " + (p + d_x) + "," + (q + d_y) + "!");
          if(d_o === 0){ /* exit left */
            if(cval & Node1){ /* top right node is within range, so we move right */
              path.push([p+1,q+1]);
              d_x = 1;
              d_y = 0;
              d_o = 1;
            } else if(!(cval & Node0)){ /* found entry within same cell */
              path.push([p + cell.topright, q + 1]);
              d_x = 0;
              d_y = -1;
              d_o = 1;
              closed = true;
              //console.log("found entry from bottom at " + p + "," + q);
              break;
            } else {
              path.push([p + cell.topleft, q + 1]);
              d_x = 0;
              d_y = -1;
              d_o = 0;
              closed = true;
              break;
            }
          } else {
            if(cval & Node1){
              path.push([p+1, q+1]);
              d_x = 1;
              d_y = 0;
              d_o = 1;
            } else { /* move right */
              path.push([p+1, q+1]);
              d_x = 1;
              d_y = 0;
              d_o = 1;
              //console.log("wtf");
              //break;
            }
          }
        } else if(d_x === -1){ /* we came from right */
          //console.log("we came from right and hit a non-existing cell at " + (p + d_x) + "," + (q + d_y) + "!");
          if(d_o === 0){
            //console.log("continue at bottom");
            if(cval & Node0){
              path.push([p,q+1]);
              d_x = 0;
              d_y = 1;
              d_o = 0;
              //console.log("moving upwards to " + (p + d_x) + "," + (q + d_y) + "!");
            } else if(!(cval & Node3)){ /* there has to be an entry into the regular grid again! */
              //console.log("exiting top");
              path.push([p, q + cell.lefttop]);
              d_x = 1;
              d_y = 0;
              d_o = 1;
              closed = true;
              break;
            } else {
              //console.log("exiting bottom");
              path.push([p, q + cell.leftbottom]);
              d_x = 1;
              d_y = 0;
              d_o = 0;
              closed = true;
              break;
            }
          } else {
            //console.log("continue at top");
            if(cval & Node0){
              path.push([p,q+1]);
              d_x = 0;
              d_y = 1;
              d_o = 0;
              //console.log("moving upwards to " + (p + d_x) + "," + (q + d_y) + "!");
            } else { /* */
              console.log("MarchingSquaresJS-isoBands: wtf");
              break;
            }
          }
        } else if(d_x === 1){ /* we came from left */
          //console.log("we came from left and hit a non-existing cell " + (p + d_x) + "," + (q + d_y) + "!");
          if(d_o === 0){ /* exit bottom */
            if(cval & Node2){
              path.push([p+1,q]);
              d_x = 0;
              d_y = -1;
              d_o = 1;
            } else {
              path.push([p+1,q+cell.rightbottom]);
              d_x = -1;
              d_y = 0;
              d_o = 0;
              closed = true;
              break;
            }
          } else { /* exit top */
            if(cval & Node2){
              path.push([p+1,q]);
              d_x = 0;
              d_y = -1;
              d_o = 1;
            } else if(!(cval & Node1)){
              path.push([p + 1, q + cell.rightbottom]);
              d_x = -1;
              d_y = 0;
              d_o = 0;
              closed = true;
              break;
            } else {
              path.push([p+1,q+cell.righttop]);
              d_x = -1;
              d_y = 0;
              d_o = 1;
              break;
            }
          }
        } else { /* we came from the same cell */
          console.log("MarchingSquaresJS-isoBands: we came from nowhere!");
          break;
        }

      } else { /* try to find an entry into the regular grid again! */
        cell = grid.cells[q][p];
        cval = cell.cval_real;
        //console.log("which is defined");

        if(d_x === -1){
          if(d_o === 0){
            /* try to go downwards */
            if((typeof grid.cells[q - 1] !== 'undefined') && (typeof grid.cells[q - 1][p] !== 'undefined')){
              d_x = 0;
              d_y = -1;
              d_o = 1;
            } else if(cval & Node3){ /* proceed searching in x-direction */
              //console.log("proceeding in x-direction!");
              path.push([p, q]);
            } else { /* we must have found an entry into the regular grid */
              path.push([p + cell.bottomright, q]);
              d_x = 0;
              d_y = 1;
              d_o = 1;
              closed = true;
              //console.log("found entry from bottom at " + p + "," + q);
              break;
            }
          } else {
            if(cval & Node0) { /* proceed searchin in x-direction */
              console.log("MarchingSquaresJS-isoBands: proceeding in x-direction!");
            } else { /* we must have found an entry into the regular grid */
              console.log("MarchingSquaresJS-isoBands: found entry from top at " + p + "," + q);
              break;
            }
          }
        } else if(d_x === 1){
          if(d_o === 0){
            console.log("MarchingSquaresJS-isoBands: wtf");
            break;
          } else {
            /* try to go upwards */
            if((typeof grid.cells[q+1] !== 'undefined') && (typeof grid.cells[q+1][p] !== 'undefined')){
              d_x = 0;
              d_y = 1;
              d_o = 0;
            } else if(cval & Node1){
              path.push([p+1,q+1]);
              d_x = 1;
              d_y = 0;
              d_o = 1;
            } else { /* found an entry point into regular grid! */
              path.push([p+cell.topleft, q + 1]);
              d_x = 0;
              d_y = -1;
              d_o = 0;
              closed = true;
              //console.log("found entry from bottom at " + p + "," + q);
              break;
            }
          }
        } else if(d_y === -1){
          if(d_o === 1){
            /* try to go right */
            if(typeof grid.cells[q][p+1] !== 'undefined'){
              d_x = 1;
              d_y = 0;
              d_o = 1;
            } else if(cval & Node2){
              path.push([p+1,q]);
              d_x = 0;
              d_y = -1;
              d_o = 1;
            } else { /* found entry into regular grid! */
              path.push([p+1, q + cell.righttop]);
              d_x = -1;
              d_y = 0;
              d_o = 1;
              closed = true;
              //console.log("found entry from top at " + p + "," + q);
              break;
            }
          } else {
            console.log("MarchingSquaresJS-isoBands: wtf");
            break;
          }
        } else if(d_y === 1){
          if(d_o === 0){
            //console.log("we came from bottom left and proceed to the left");
            /* try to go left */
            if(typeof grid.cells[q][p - 1] !== 'undefined'){
              d_x = -1;
              d_y = 0;
              d_o = 0;
            } else if(cval & Node0){
              path.push([p,q+1]);
              d_x = 0;
              d_y = 1;
              d_o = 0;
            } else { /* found an entry point into regular grid! */
              path.push([p, q + cell.leftbottom]);
              d_x = 1;
              d_y = 0;
              d_o = 0;
              closed = true;
              //console.log("found entry from bottom at " + p + "," + q);
              break;
            }
          } else {
            //console.log("we came from bottom right and proceed to the right");
            console.log("MarchingSquaresJS-isoBands: wtf");
            break;
          }
        } else {
          console.log("MarchingSquaresJS-isoBands: where did we came from???");
          break;
        }

      }

      p += d_x;
      q += d_y;
      //console.log("going on to  " + p + "," + q + " via " + d_x + " " + d_y + " " + d_o);

      if((p === i) && (q === j)){ /* bail out, once we've closed a circle path */
        break;
      }

    }

    //console.log("exit with " + p + "," + q + " " + d_x + " " + d_y + " " + d_o);
    return { path: path, i: p, j: q, x: d_x, y: d_y, o: d_o };
  }

  function deleteEdge(cell, edgeIdx){
    delete cell.edges[edgeIdx];
    for(var k = edgeIdx + 1; k < cell.edges.length; k++){
      cell.edges[k-1] = cell.edges[k];
    }
    cell.edges.pop();
  }

  function getStartXY(cell){

    if(cell.edges.length > 0){
      var e = cell.edges[cell.edges.length - 1];
      //console.log("starting with edge " + e);
      var cval = cell.cval_real;
      switch(e){
        case 0:   if(cval & Node1){ /* node 1 within range */
                    return {p: [1, cell.righttop], x: -1, y: 0, o: 1};
                  } else { /* node 1 below or above threshold */
                    return {p: [cell.topleft, 1], x: 0, y: -1, o: 0};
                  }
        case 1:   if(cval & Node2){
                    return {p: [cell.topleft, 1], x: 0, y: -1, o: 0};
                  } else {
                    return {p: [1, cell.rightbottom], x: -1, y: 0, o: 0};
                  }
        case 2:   if(cval & Node2){
                    return {p: [cell.bottomright, 0], x: 0, y: 1, o: 1};
                  } else {
                    return {p: [cell.topleft, 1], x: 0, y: -1, o: 0};
                  }
        case 3:   if(cval & Node3){
                    return {p: [cell.topleft, 1], x: 0, y: -1, o: 0};
                  } else {
                    return {p: [cell.bottomleft, 0], x: 0, y: 1, o: 0};
                  }
        case 4:   if(cval & Node1){
                    return {p: [1, cell.righttop], x: -1, y: 0, o: 1};
                  } else {
                    return {p: [cell.topright, 1], x: 0, y: -1, o: 1};
                  }
        case 5:   if(cval & Node2){
                    return {p: [cell.topright, 1], x: 0, y: -1, o: 1};
                  } else {
                    return {p: [1, cell.rightbottom], x: -1, y: 0, o: 0};
                  }
        case 6:   if(cval & Node2){
                    return {p: [cell.bottomright, 0], x: 0, y: 1, o: 1};
                  } else {
                    return {p: [cell.topright, 1], x: 0, y: -1, o: 1};
                  }
        case 7:   if(cval & Node3){
                    return {p: [cell.topright, 1], x: 0, y: -1, o: 1};
                  } else {
                    return {p: [cell.bottomleft, 0], x: 0, y: 1, o: 0};
                  }
        case 8:   if(cval & Node2){
                    return {p: [cell.bottomright, 0], x: 0, y: 1, o: 1};
                  } else {
                    return {p: [1, cell.righttop], x: -1, y: 0, o: 1};
                  }
        case 9:   if(cval & Node3){
                    return {p: [1, cell.righttop], x: -1, y: 0, o: 1};
                  } else {
                    return {p: [cell.bottomleft, 0], x: 0, y: 1, o: 0};
                  }
        case 10:  if(cval & Node3){
                    return {p: [0, cell.leftbottom], x: 1, y: 0, o: 0};
                  } else {
                    return {p: [1, cell.righttop], x: -1, y: 0, o: 1};
                  }
        case 11:  if(cval & Node0){
                    return {p: [1, cell.righttop], x: -1, y: 0, o: 1};
                  } else {
                    return {p: [0, cell.lefttop], x: 1, y: 0, o: 1};
                  }
        case 12:  if(cval & Node2){
                    return {p: [cell.bottomright, 0], x: 0, y: 1, o: 1};
                  } else {
                    return {p: [1, cell.rightbottom], x: -1, y: 0, o: 0};
                  }
        case 13:  if(cval & Node3){
                    return {p: [1, cell.rightbottom], x: -1, y: 0, o: 0};
                  } else {
                    return {p: [cell.bottomleft, 0], x: 0, y: 1, o: 0};
                  }
        case 14:  if(cval & Node3){
                    return {p: [0, cell.leftbottom], x: 1, y: 0, o: 0};
                  } else {
                    return {p: [1, cell.rightbottom], x: -1, y: 0, o: 0};
                  }
        case 15:  if(cval & Node0){
                    return {p: [1, cell.rightbottom], x: -1, y: 0, o: 0};
                  } else {
                    return {p: [0, cell.lefttop], x: 1, y: 0, o: 1};
                  }
        case 16:  if(cval & Node2){
                    return {p: [cell.bottomright, 0], x: 0, y: 1, o: 1};
                  } else {
                    return {p: [0, cell.leftbottom], x: 1, y: 0, o: 0};
                  }
        case 17:  if(cval & Node0){
                    return {p: [cell.bottomright, 0], x: 0, y: 1, o: 1};
                  } else {
                    return {p: [0, cell.lefttop], x: 1, y: 0, o: 1};
                  }
        case 18:  if(cval & Node3){
                    return {p: [0, cell.leftbottom], x: 1, y: 0, o: 0};
                  } else {
                    return {p: [cell.bottomleft, 0], x: 0, y: 1, o: 0};
                  }
        case 19:  if(cval & Node0){
                    return {p: [cell.bottomleft, 0], x: 0, y: 1, o: 0};
                  } else {
                    return {p: [0, cell.lefttop], x: 1, y: 0, o: 1};
                  }
        case 20:  if(cval & Node0){
                    return {p: [cell.topleft, 1], x: 0, y: -1, o: 0};
                  } else {
                    return {p: [0, cell.leftbottom], x: 1, y: 0, o: 0};
                  }
        case 21:  if(cval & Node1){
                    return {p: [0, cell.leftbottom], x: 1, y: 0, o: 0};
                  } else {
                    return {p: [cell.topright, 1], x: 0, y: -1, o: 1};
                  }
        case 22:  if(cval & Node0){
                    return {p: [cell.topleft, 1], x: 0, y: -1, o: 0};
                  } else {
                    return {p: [0, cell.lefttop], x: 1, y: 0, o: 1};
                  }
        case 23:  if(cval & Node1){
                    return {p: [0, cell.lefttop], x: 1, y: 0, o: 1};
                  } else {
                    return {p: [cell.topright, 1], x: 0, y: -1, o: 1};
                  }
        default:  console.log("MarchingSquaresJS-isoBands: edge index out of range!");
                  console.log(cell);
                  break;
      }
    }

    return null;
  }

  function getExitXY(cell, x, y, o){

    var e, id_x, d_x, d_y, cval = cell.cval;
    var d_o;

    switch(x){
      case -1:  switch(o){
                  case 0:   e = isoBandEdgeRB[cval];
                            d_x = isoBandNextXRB[cval];
                            d_y = isoBandNextYRB[cval];
                            d_o = isoBandNextORB[cval];
                            break;
                  default:  e = isoBandEdgeRT[cval];
                            d_x = isoBandNextXRT[cval];
                            d_y = isoBandNextYRT[cval];
                            d_o = isoBandNextORT[cval];
                            break;
                }
                break;
      case 1:   switch(o){
                  case 0:   e = isoBandEdgeLB[cval];
                            d_x = isoBandNextXLB[cval];
                            d_y = isoBandNextYLB[cval];
                            d_o = isoBandNextOLB[cval];
                            break;
                  default:  e = isoBandEdgeLT[cval];
                            d_x = isoBandNextXLT[cval];
                            d_y = isoBandNextYLT[cval];
                            d_o = isoBandNextOLT[cval];
                            break;
                }
                break;
      default:  switch(y){
                  case -1:  switch(o){
                              case 0:   e = isoBandEdgeTL[cval];
                                        d_x = isoBandNextXTL[cval];
                                        d_y = isoBandNextYTL[cval];
                                        d_o = isoBandNextOTL[cval];
                                        break;
                              default:  e = isoBandEdgeTR[cval];
                                        d_x = isoBandNextXTR[cval];
                                        d_y = isoBandNextYTR[cval];
                                        d_o = isoBandNextOTR[cval];
                                        break;
                            }
                            break;
                  case 1:   switch(o){
                              case 0:   e = isoBandEdgeBL[cval];
                                        d_x = isoBandNextXBL[cval];
                                        d_y = isoBandNextYBL[cval];
                                        d_o = isoBandNextOBL[cval];
                                        break;
                              default:  e = isoBandEdgeBR[cval];
                                        d_x = isoBandNextXBR[cval];
                                        d_y = isoBandNextYBR[cval];
                                        d_o = isoBandNextOBR[cval];
                                        break;
                            }
                            break;
                  default:  break;
                }
                break;
    }

    id_x = cell.edges.indexOf(e);
    if(typeof cell.edges[id_x] !== 'undefined'){
      deleteEdge(cell, id_x);
    } else {
      //console.log("wrong edges...");
      //console.log(x + " " + y + " " + o);
      //console.log(cell);
      return null;
    }

    cval = cell.cval_real;

    switch(e){
        case 0:   if(cval & Node1){ /* node 1 within range */
                    x = cell.topleft;
                    y = 1;
                  } else { /* node 1 below or above threshold */
                    x = 1;
                    y = cell.righttop;
                  }
                  break;
        case 1:   if(cval & Node2){
                    x = 1;
                    y = cell.rightbottom;
                  } else {
                    x = cell.topleft;
                    y = 1;
                  }
                  break;
        case 2:   if(cval & Node2){
                    x = cell.topleft;
                    y = 1;
                  } else {
                    x = cell.bottomright;
                    y = 0;
                  }
                  break;
        case 3:   if(cval & Node3){
                    x = cell.bottomleft;
                    y = 0;
                  } else {
                    x = cell.topleft;
                    y = 1;
                  }
                  break;
        case 4:   if(cval & Node1){
                    x = cell.topright;
                    y = 1;
                  } else {
                    x = 1;
                    y = cell.righttop;
                  }
                  break;
        case 5:   if(cval & Node2){
                    x = 1;
                    y = cell.rightbottom;
                  } else {
                    x = cell.topright;
                    y = 1;
                  }
                  break;
        case 6:   if(cval & Node2){
                    x = cell.topright;
                    y = 1;
                  } else {
                    x = cell.bottomright;
                    y = 0;
                  }
                  break;
        case 7:   if(cval & Node3){
                    x = cell.bottomleft;
                    y = 0;
                  } else {
                    x = cell.topright;
                    y = 1;
                  }
                  break;
        case 8:   if(cval & Node2){
                    x = 1;
                    y = cell.righttop;
                  } else {
                    x = cell.bottomright;
                    y = 0;
                  }
                  break;
        case 9:   if(cval & Node3){
                    x = cell.bottomleft;
                    y = 0;
                  } else {
                    x = 1;
                    y = cell.righttop;
                  }
                  break;
        case 10:  if(cval & Node3){
                    x = 1;
                    y = cell.righttop;
                  } else {
                    x = 0;
                    y = cell.leftbottom;
                  }
                  break;
        case 11:  if(cval & Node0){
                    x = 0;
                    y = cell.lefttop;
                  } else {
                    x = 1;
                    y = cell.righttop;
                  }
                  break;
        case 12:  if(cval & Node2){
                    x = 1;
                    y = cell.rightbottom;
                  } else {
                    x = cell.bottomright;
                    y = 0;
                  }
                  break;
        case 13:  if(cval & Node3){
                    x = cell.bottomleft;
                    y = 0;
                  } else {
                    x = 1;
                    y = cell.rightbottom;
                  }
                  break;
        case 14:  if(cval & Node3){
                    x = 1;
                    y = cell.rightbottom;
                  } else {
                    x = 0;
                    y = cell.leftbottom;
                  }
                  break;
        case 15:  if(cval & Node0){
                    x = 0;
                    y = cell.lefttop;
                  } else {
                    x = 1;
                    y = cell.rightbottom;
                  }
                  break;
        case 16:  if(cval & Node2){
                    x = 0;
                    y = cell.leftbottom;
                  } else {
                    x = cell.bottomright;
                    y = 0;
                  }
                  break;
        case 17:  if(cval & Node0){
                    x = 0;
                    y = cell.lefttop;
                  } else {
                    x = cell.bottomright;
                    y = 0;
                  }
                  break;
        case 18:  if(cval & Node3){
                    x = cell.bottomleft;
                    y = 0;
                  } else {
                    x = 0;
                    y = cell.leftbottom;
                  }
                  break;
        case 19:  if(cval & Node0){
                    x = 0;
                    y = cell.lefttop;
                  } else {
                    x = cell.bottomleft;
                    y = 0;
                  }
                  break;
        case 20:  if(cval & Node0){
                    x = 0;
                    y = cell.leftbottom;
                  } else {
                    x = cell.topleft;
                    y = 1;
                  }
                  break;
        case 21:  if(cval & Node1){
                    x = cell.topright;
                    y = 1;
                  } else {
                    x = 0;
                    y = cell.leftbottom;
                  }
                  break;
        case 22:  if(cval & Node0){
                    x = 0;
                    y = cell.lefttop;
                  } else {
                    x = cell.topleft;
                    y = 1;
                  }
                  break;
        case 23:  if(cval & Node1){
                    x = cell.topright;
                    y = 1;
                  } else {
                    x = 0;
                    y = cell.lefttop;
                  }
                  break;
        default:  console.log("MarchingSquaresJS-isoBands: edge index out of range!");
                  console.log(cell);
                  return null;
    }

    if((typeof x === 'undefined') || (typeof y === 'undefined') ||
        (typeof d_x === 'undefined') || (typeof d_y === 'undefined') ||
        (typeof d_o === 'undefined')){
      console.log("MarchingSquaresJS-isoBands: undefined value!");
      console.log(cell);
      console.log(x + " " + y + " " + d_x + " " + d_y + " " + d_o);
    }
    return {p: [x, y], x: d_x, y: d_y, o: d_o};
  }

  function BandGrid2Areas(grid){
    var areas = [];
    var area_idx = 0;

    grid.cells.forEach(function(g, j){
      g.forEach(function(gg, i){
        if(typeof gg !== 'undefined'){
          var a = polygon_table[gg.cval](gg);
          if((typeof a === 'object') && isArray(a)){
            if((typeof a[0] === 'object') && isArray(a[0])){
              if((typeof a[0][0] === 'object') && isArray(a[0][0])){
                a.forEach(function(aa){
                  aa.forEach(function(aaa){
                    aaa[0] += i;
                    aaa[1] += j;
                  });
                  areas[area_idx++] = aa;
                });
              } else {
                a.forEach(function(aa){
                  aa[0] += i;
                  aa[1] += j;
                });
                areas[area_idx++] = a;
              }
            } else {
              console.log("MarchingSquaresJS-isoBands: bandcell polygon with malformed coordinates");
            }
          } else {
            console.log("MarchingSquaresJS-isoBands: bandcell polygon with null coordinates");
          }
        }
      });
    });

    return areas;
  }

  return isoBands;

}));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
* @license GNU Affero General Public License.
* Copyright (c) 2015, 2015 Ronny Lorenz <ronny@tbi.univie.ac.at>
* v. 1.2.0
* https://github.com/RaumZeit/MarchingSquares.js
*/

(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return { isoContours : factory() }; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = { isoContours : factory() };
    } else {
        // Browser globals (root is window)
        root.MarchingSquaresJS = {
                                    isoContours : factory(),
                                    isoBands : (root.MarchingSquaresJS) ? root.MarchingSquaresJS.isoBands : null
                                 };
    }
}(this, function () {

  /*
    Compute the isocontour(s) of a scalar 2D field given
    a certain threshold by applying the Marching Squares
    Algorithm. The function returns a list of path coordinates
  */
  var defaultSettings = {
    successCallback:  null,
    verbose:          false
  };

  var settings = {};

  function isoContours(data, threshold, options){
    /* process options */
    options = options ? options : {};

    var optionKeys = Object.keys(defaultSettings);

    for(var i = 0; i < optionKeys.length; i++){
      var key = optionKeys[i];
      var val = options[key];
      val = ((typeof val !== 'undefined') && (val !== null)) ? val : defaultSettings[key];

      settings[key] = val;
    }

    if(settings.verbose)
      console.log("MarchingSquaresJS-isoContours: computing isocontour for " + threshold);

    var ret = ContourGrid2Paths(computeContourGrid(data, threshold));

    if(typeof settings.successCallback === 'function')
      settings.successCallback(ret);

    return ret;
  }

  /*
    Thats all for the public interface, below follows the actual
    implementation
  */

  /*
  ################################
  Isocontour implementation below
  ################################
  */

  /* assume that x1 == 1 &&  x0 == 0 */
  function interpolateX(y, y0, y1){
    return (y - y0) / (y1 - y0);
  }

  /* compute the isocontour 4-bit grid */
  function computeContourGrid(data, threshold){
    var rows = data.length - 1;
    var cols = data[0].length - 1;
    var ContourGrid = { rows: rows, cols: cols, cells: [] };

    for(var j = 0; j < rows; ++j){
      ContourGrid.cells[j] = [];
      for(var i = 0; i < cols; ++i){
        /* compose the 4-bit corner representation */
        var cval = 0;

        var tl = data[j+1][i];
        var tr = data[j+1][i+1];
        var br = data[j][i+1];
        var bl = data[j][i];

        if(isNaN(tl) || isNaN(tr) || isNaN(br) || isNaN(bl)){
          continue;
        }
        cval |= ((tl >= threshold) ? 8 : 0);
        cval |= ((tr >= threshold) ? 4 : 0);
        cval |= ((br >= threshold) ? 2 : 0);
        cval |= ((bl >= threshold) ? 1 : 0);

        /* resolve ambiguity for cval == 5 || 10 via averaging */
        var flipped = false;
        if(cval === 5 || cval === 10){
          var average = (tl + tr + br + bl) / 4;
          if(cval === 5 && (average < threshold)){
            cval = 10;
            flipped = true;
          } else if(cval === 10 && (average < threshold)){
            cval = 5;
            flipped = true;
          }
        }

        /* add cell to ContourGrid if it contains edges */
        if(cval != 0 && cval != 15){
          var top, bottom, left, right;
          top = bottom = left = right = 0.5;
          /* interpolate edges of cell */
          if(cval === 1){
            left    = 1 - interpolateX(threshold, tl, bl);
            bottom  = 1 - interpolateX(threshold, br, bl);
          } else if(cval === 2){
            bottom  = interpolateX(threshold, bl, br);
            right   = 1 - interpolateX(threshold, tr, br);
          } else if(cval === 3){
            left    = 1 - interpolateX(threshold, tl, bl);
            right   = 1 - interpolateX(threshold, tr, br);
          } else if(cval === 4){
            top     = interpolateX(threshold, tl, tr);
            right   = interpolateX(threshold, br, tr);
          } else if(cval === 5){
            top     = interpolateX(threshold, tl, tr);
            right   = interpolateX(threshold, br, tr);
            bottom  = 1 - interpolateX(threshold, br, bl);
            left    = 1 - interpolateX(threshold, tl, bl);
          } else if(cval === 6){
            bottom  = interpolateX(threshold, bl, br);
            top     = interpolateX(threshold, tl, tr);
          } else if(cval === 7){
            left    = 1 - interpolateX(threshold, tl, bl);
            top     = interpolateX(threshold, tl, tr);
          } else if(cval === 8){
            left    = interpolateX(threshold, bl, tl);
            top     = 1 - interpolateX(threshold, tr, tl);
          } else if(cval === 9){
            bottom  = 1 - interpolateX(threshold, br, bl);
            top     = 1 - interpolateX(threshold, tr, tl);
          } else if(cval === 10){
            top     = 1 - interpolateX(threshold, tr, tl);
            right   = 1 - interpolateX(threshold, tr, br);
            bottom  = interpolateX(threshold, bl, br);
            left    = interpolateX(threshold, bl, tl);
          } else if(cval === 11){
            top     = 1 - interpolateX(threshold, tr, tl);
            right   = 1 - interpolateX(threshold, tr, br);
          } else if(cval === 12){
            left    = interpolateX(threshold, bl, tl);
            right   = interpolateX(threshold, br, tr);
          } else if(cval === 13){
            bottom  = 1 - interpolateX(threshold, br, bl);
            right   = interpolateX(threshold, br, tr);
          } else if(cval === 14){
            left    = interpolateX(threshold, bl, tl);
            bottom  = interpolateX(threshold, bl, br);
          } else {
            console.log("MarchingSquaresJS-isoContours: Illegal cval detected: " + cval);
          }
          ContourGrid.cells[j][i] = {
                                      cval:     cval,
                                      flipped:  flipped,
                                      top:      top,
                                      right:    right,
                                      bottom:   bottom,
                                      left:     left
                                    };
        }

      }
    }

    return ContourGrid;
  }

  function isSaddle(cell){
    return cell.cval === 5 || cell.cval === 10;
  }

  function isTrivial(cell){
    return cell.cval === 0 || cell.cval === 15;
  }

  function clearCell(cell){
    if((!isTrivial(cell)) && (cell.cval !== 5) && (cell.cval !== 10)){
      cell.cval = 15;
    }
  }

  function getXY(cell, edge){
    if(edge === "top"){
      return [cell.top, 1.0];
    } else if(edge === "bottom"){
      return [cell.bottom, 0.0];
    } else if(edge === "right"){
      return [1.0, cell.right];
    } else if(edge === "left"){
      return [0.0, cell.left];
    }
  }

  function ContourGrid2Paths(grid){
    var paths = [];
    var path_idx = 0;
    var rows = grid.rows;
    var cols = grid.cols;
    var epsilon = 1e-7;

    grid.cells.forEach(function(g, j){
      g.forEach(function(gg, i){
        if((typeof gg !== 'undefined') && (!isSaddle(gg)) && (!isTrivial(gg))){
          var p = tracePath(grid.cells, j, i);
          var merged = false;
          /* we may try to merge paths at this point */
          if(p.info === "mergeable"){
            /*
              search backwards through the path array to find an entry
              that starts with where the current path ends...
            */
            var x = p.path[p.path.length - 1][0],
                y = p.path[p.path.length - 1][1];

            for(var k = path_idx - 1; k >= 0; k--){
              if((Math.abs(paths[k][0][0] - x) <= epsilon) && (Math.abs(paths[k][0][1] - y) <= epsilon)){
                for(var l = p.path.length - 2; l >= 0; --l){
                  paths[k].unshift(p.path[l]);
                }
                merged = true;
                break;
              }
            }
          }
          if(!merged)
            paths[path_idx++] = p.path;
        }
      });
    });

    return paths;
  }

  /*
    construct consecutive line segments from starting cell by
    walking arround the enclosed area clock-wise
   */
  function tracePath(grid, j, i){
    var maxj = grid.length;
    var p = [];
    var dxContour = [0, 0, 1, 1, 0, 0, 0, 0, -1, 0, 1, 1, -1, 0, -1, 0];
    var dyContour = [0, -1, 0, 0, 1, 1, 1, 1, 0, -1, 0, 0, 0, -1, 0, 0];
    var dx, dy;
    var startEdge = ["none", "left", "bottom", "left", "right", "none", "bottom", "left", "top", "top", "none", "top", "right", "right", "bottom", "none"];
    var nextEdge  = ["none", "bottom", "right", "right", "top", "top", "top", "top", "left", "bottom", "right", "right", "left", "bottom", "left", "none"];
    var edge;

    var startCell   = grid[j][i];
    var currentCell = grid[j][i];

    var cval = currentCell.cval;
    var edge = startEdge[cval];

    var pt = getXY(currentCell, edge);

    /* push initial segment */
    p.push([i + pt[0], j + pt[1]]);
    edge = nextEdge[cval];
    pt = getXY(currentCell, edge);
    p.push([i + pt[0], j + pt[1]]);
    clearCell(currentCell);

    /* now walk arround the enclosed area in clockwise-direction */
    var k = i + dxContour[cval];
    var l = j + dyContour[cval];
    var prev_cval = cval;

    while((k >= 0) && (l >= 0) && (l < maxj) && ((k != i) || (l != j))){
      currentCell = grid[l][k];
      if(typeof currentCell === 'undefined'){ /* path ends here */
        //console.log(k + " " + l + " is undefined, stopping path!");
        break;
      }
      cval = currentCell.cval;
      if((cval === 0) || (cval === 15)){
        return { path: p, info: "mergeable" };
      }
      edge  = nextEdge[cval];
      dx    = dxContour[cval];
      dy    = dyContour[cval];
      if((cval === 5) || (cval === 10)){
        /* select upper or lower band, depending on previous cells cval */
        if(cval === 5){
          if(currentCell.flipped){ /* this is actually a flipped case 10 */
            if(dyContour[prev_cval] === -1){
              edge  = "left";
              dx    = -1;
              dy    = 0;
            } else {
              edge  = "right";
              dx    = 1;
              dy    = 0;
            }
          } else { /* real case 5 */
            if(dxContour[prev_cval] === -1){
              edge  = "bottom";
              dx    = 0;
              dy    = -1;
            }
          }
        } else if(cval === 10){
          if(currentCell.flipped){ /* this is actually a flipped case 5 */
            if(dxContour[prev_cval] === -1){
              edge  = "top";
              dx    = 0;
              dy    = 1;
            } else {
              edge  = "bottom";
              dx    = 0;
              dy    = -1;
            }
          } else {  /* real case 10 */
            if(dyContour[prev_cval] === 1){
              edge  = "left";
              dx    = -1;
              dy    = 0;
            }
          }
        }
      }
      pt = getXY(currentCell, edge);
      p.push([k + pt[0], l + pt[1]]);
      clearCell(currentCell);
      k += dx;
      l += dy;
      prev_cval = cval;
    }

    return { path: p, info: "closed" };
  }

  return isoContours;

}));


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__kernel__ = __webpack_require__(3);
// Internal dependencies



class GaussianKernel extends __WEBPACK_IMPORTED_MODULE_1__kernel__["a" /* default */] {
  constructor(sigmaSquared = 0.5) {
    super();

    this.sigmaSquared = sigmaSquared;
  }

  apply(x, y) {
    // Gaussian
    const diff = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].sum(x, __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].scale(y, -1));
    return Math.exp(-__WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].dot(diff, diff) / (2 * this.sigmaSquared));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GaussianKernel);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classifier_binaryclassifier__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classifier_binaryperceptron__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classifier_binarysvm__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classifier_classifier__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classifier_knn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classifier_svm__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classifier_perceptron__ = __webpack_require__(22);








/* harmony default export */ __webpack_exports__["a"] = ({
  BinaryClassifier: __WEBPACK_IMPORTED_MODULE_0__classifier_binaryclassifier__["a" /* default */],
  BinaryPerceptron: __WEBPACK_IMPORTED_MODULE_1__classifier_binaryperceptron__["a" /* default */],
  BinarySVM: __WEBPACK_IMPORTED_MODULE_2__classifier_binarysvm__["a" /* default */],
  Classifier: __WEBPACK_IMPORTED_MODULE_3__classifier_classifier__["a" /* default */],
  KNN: __WEBPACK_IMPORTED_MODULE_4__classifier_knn__["a" /* default */],
  SVM: __WEBPACK_IMPORTED_MODULE_5__classifier_svm__["a" /* default */],
  Perceptron: __WEBPACK_IMPORTED_MODULE_6__classifier_perceptron__["a" /* default */],
});


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classifier__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_arrays__ = __webpack_require__(1);
// Internal dependencies




/**
 * k-nearest neighbours learner. Classifies points based on the (possibly weighted) vote
 * of its k nearest neighbours (euclidian distance)
 */
class KNN extends __WEBPACK_IMPORTED_MODULE_0__classifier__["a" /* default */] {
  constructor(numNeighbours = 3) {
    super();

    /**
     * Object to store training data
     *
     * @var dict
     */
    this.training = {
      features: [],
      labels: []
    };

    /**
     * Number of nearest neighbours to consider for the majority vote
     *
     * @var int
     */
    this.numNeighbours = numNeighbours;
  }

  /**
   * Train the KNN algorithm on a dataset
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */
  train(features, labels) {
    if (features.length !== labels.length) {
      throw new Error('Number of data points should match number of labels.');
    }

    // Store data points
    this.training.features = features;
    this.training.labels = labels;
  }

  /**
   * Make a prediction for a data set
   *
   * @param Array[Array[mixed]] Features for each data point
   * @return Array[mixed] Predictions. Label of class with highest prevalence among k nearest
   *   neighbours for each sample
   */
  predict(features) {
    if (this.training.features.length === 0) {
      throw new Error('Model has to be trained in order to make predictions.');
    }

    if (features[0].length !== this.training.features[0].length) {
      throw new Error('Number of features of test data should match number of features of training data.');
    }

    // Make prediction for each data point
    const predictions = features.map(x => this.predictSample(x));

    return predictions;
  }

  /**
   * Make a prediction for a single sample
   *
   * @param Array[mixed] Data point features
   * @return mixed Prediction. Label of class with highest prevalence among k nearest neighbours
   */
  predictSample(sampleFeatures) {
    // Calculate distances to all other data points
    const distances = __WEBPACK_IMPORTED_MODULE_2__util_arrays__["a" /* default */].zipWithIndex(
      this.training.features.map(
        x => __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].norm(__WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].sum(sampleFeatures, __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */].scale(x, -1)))
      )
    );

    // Sort training data points based on distance
    distances.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });

    // Number of nearest neighbours to consider
    const k = Math.min(this.numNeighbours, distances.length);

    // Take top k distances
    const distancesTopKClasses = distances.slice(0, k).map(x => this.training.labels[x[1]]);

    // Count the number of neighbours per class
    const votes = __WEBPACK_IMPORTED_MODULE_2__util_arrays__["a" /* default */].valueCounts(distancesTopKClasses);

    // Get class index with highest number of votes
    let highest = -1;
    let highestLabel = -1;

    votes.forEach((vote) => {
      if (vote[1] > highest) {
        highest = vote[1];
        highestLabel = vote[0];
      }
    });

    return highestLabel;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (KNN);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__onevsall__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__binarysvm__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_arrays__ = __webpack_require__(1);
// Internal dependencies





/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification
 */
class SVM extends __WEBPACK_IMPORTED_MODULE_0__onevsall__["a" /* default */] {
  /**
   * Constructor
   *
   * @see BinarySVM.constructor()
   *
   * @param dict optionsUser User-defined options for SVM. Options are passed to created BinarySVM
   *   objects. See BinarySVM.constructor() for more details
   */
  constructor(optionsUser = {}) {
    super();

    /**
     * Object to store training data
     *
     * @var dict
     */
    this.training = {
      features: [],
      labels: [],
    };

    /**
     * List of classifiers. One classifier per class label/index
     *
     * @var Array
     */
    this.classifiers = [];

    /**
     * Number of errors per iteration. Only used if accuracy tracking is enabled
     *
     * @var bool
     */
    this.numErrors = null;

    // Set options
    this.optionsUser = optionsUser;
  }

  /**
   * @see OneVsAll.createClassifier()
   */
  createClassifier(classIndex) {
    const useClassIndices = this.training.labels.map(x => ((x === classIndex) ? 1 : 0));

    const classifier = new __WEBPACK_IMPORTED_MODULE_1__binarysvm__["a" /* default */](this.optionsUser);
    classifier.loadTrainingData(this.training.features, useClassIndices, 1);

    return classifier;
  }

  /**
   * Train the multiclass SVM algorithm on a dataset
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */
  train(features, labels) {
    super.train(features, labels);

    this.trainBatch();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (SVM);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__onevsall__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__binaryperceptron__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_arrays__ = __webpack_require__(1);
// Internal dependencies





/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification
 */
class Perceptron extends __WEBPACK_IMPORTED_MODULE_0__onevsall__["a" /* default */] {
  /**
   * Constructor
   *
   * @param dict optionsUser User-defined options for perceptron
   */
  constructor(optionsUser = {}) {
    super();

    /**
     * Object to store training data
     *
     * @var dict
     */
    this.training = {
      features: [],
      labels: [],
    };

    /**
     * List of classifiers. One classifier per class label/index
     *
     * @var Array
     */
    this.classifiers = [];

    /**
     * Number of errors per iteration. Only used if accuracy tracking is enabled
     *
     * @var bool
     */
    this.numErrors = null;

    // Parse options
    const optionsDefault = {
      trackAccuracy: true, // Whether the number of misclassified samples should be tracked
                            // at each iteration
    };

    const options = Object.assign({}, optionsDefault, optionsUser);

    // Set options
    this.trackAccuracy = options.trackAccuracy;

    // Accuracy tracking
    if (this.trackAccuracy) {
      this.addListener('iterationCompleted', () => this.calculateIntermediateAccuracy());
    }
  }

  /**
   * @see OneVsAll.createClassifier()
   */
  createClassifier(classIndex) {
    const useClassIndices = this.training.labels.map(x => ((x === classIndex) ? 1 : 0));

    const classifier = new __WEBPACK_IMPORTED_MODULE_1__binaryperceptron__["a" /* default */]();
    classifier.loadTrainingData(this.training.features, useClassIndices, 1);
    classifier.initializeWeights();

    return classifier;
  }

  /**
   * Train the multiclass Perceptron algorithm on a dataset
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */
  train(features, labels) {
    super.train(features, labels);

    if (this.trackAccuracy) {
      this.numErrors = [];
      this.trainIterative();
    } else {
      this.trainBatch();
    }
  }

  /**
   * Callback for calculating the accuracy of the classifier on the training set in intermediate
   * steps of training
   */
  calculateIntermediateAccuracy() {
    // Track number of errors
    const predictions = this.predict(this.training.features);
    this.numErrors.push(predictions.reduce((r, x, i) => r + (x !== this.training.labels[i]), 0));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Perceptron);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_datapoint__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_dataset__ = __webpack_require__(24);



/* harmony default export */ __webpack_exports__["a"] = ({
  Datapoint: __WEBPACK_IMPORTED_MODULE_0__data_datapoint__["a" /* default */],
  Dataset: __WEBPACK_IMPORTED_MODULE_1__data_dataset__["a" /* default */],
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datapoint__ = __webpack_require__(10);
// Internal dependencies


class Dataset {
  constructor() {
    this.numDimensions = 0;
    this.numDatapoints = 0;
    this.datapoints = [];
  }

  /**
   * Add a data point to the data set. Data point should be an array with the number of dimensions
   * used throughout the dataset.
   *
   * @param features Data point features array
   */
  addDatapoint(features) {
    // Set the dimensionality of the data if this is the first data point
    if (this.numDatapoints === 0) {
      this.numDimensions = features.length;
    }

    // Construct data point
    const datapoint = new __WEBPACK_IMPORTED_MODULE_0__datapoint__["a" /* default */](features);

    // Check data point validity
    if (!this.isValidDataPoint(datapoint)) {
      throw new Error('Invalid specification of data point.');
    }

    // Add data point
    this.datapoints.push(datapoint);
    this.numDatapoints += 1;

    return datapoint;
  }

  /**
   * Check whether a data point is valid. A valid data point is an array of the correct number
   * of dimensions.
   *
   * @param datapoint Data point to be checked
   * @return bool Whether the data point is valid
   */
  isValidDataPoint(datapoint) {
    return Array.isArray(datapoint.features) && datapoint.features.length === this.numDimensions;
  }

  /**
   * Get all data points from this dataset
   *
   * @return Array Data points. Array of datapoint objects
   */
  getDataPoints() {
    return this.datapoints;
  }

  /**
   * Get the number of data points in this dataset
   *
   * @return int Number of data points
   */
  numDataPoints() {
    return this.datapoints.length;
  }

  /**
   * Get the number of dimensions for the features of data points
   *
   * @return int Dimensionality
   */
  getNumDimensions() {
    return this.numDimensions;
  }

  /**
   * Extract the features from the datapoints and return them in an n x d array, where `n` is the
   * number of data points and `d` is the number of dimensions (number of features per datapoint).
   *
   * @return Array[Array[Number]] Features matrix
   */
  getFeaturesArray() {
    return this.datapoints.map(x => x.features);
  }

  /**
   * Extract the labels from the datapoints and return them in an array.
   *
   * @return Array[mixed] Labels array
   */
  getLabelsArray() {
    return this.datapoints.map(x => x.classIndex);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Dataset);


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_inputdevices__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_random__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_arrays__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = ({
  InputDevices: __WEBPACK_IMPORTED_MODULE_0__util_inputdevices__["a" /* default */],
  Random: __WEBPACK_IMPORTED_MODULE_1__util_random__["a" /* default */],
  Arrays: __WEBPACK_IMPORTED_MODULE_2__util_arrays__["a" /* default */],
});


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Get touch coordinate (x or y) from touchpad input
 *
 * @param object e Event
 * @param string coordinate Coordinate ("x" or "y", case insensitive)
 */
function getTouchCoordinate(e, coordinate) {
  const coordinateUc = coordinate.toUpperCase();

  return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0][`page${coordinateUc}`] : e[`page${coordinateUc}`];
}

/* harmony default export */ __webpack_exports__["a"] = ({
  getTouchCoordinate,
});


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_linalg__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
  LinAlg: __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */],
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_canvas__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_datapoint__ = __webpack_require__(11);



/* harmony default export */ __webpack_exports__["a"] = ({
  Canvas: __WEBPACK_IMPORTED_MODULE_0__ui_canvas__["a" /* default */],
  Datapoint: __WEBPACK_IMPORTED_MODULE_1__ui_datapoint__["a" /* default */],
});


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datapoint__ = __webpack_require__(11);
// Internal dependencies


/**
 * UI canvas for displaying machine learning results
 *
 * Listeners:
 *  This class supports event listeners, meaning that the outside world can bind functions to events
 *  triggered explicitly by this class. Listeners can be added using `addListener` and removed by
 * `removeListener`. The `emit` method is not intended for use by the outside world, and is used by
 *  this class to emit an event to the listeners bound to it.
 */
class Canvas {
  constructor(el, options) {
    // Settings for canvas
    this.canvas = {
      element: el,
      width: el.offsetWidth,
      height: el.offsetHeight,
      context: el.getContext('2d'),
    };

    // User-defined options
    const optionsDefault = {
      continuousClick: false,
      continuousClickInterval: 50,
    };
    this.options = jQuery.extend(true, {}, optionsDefault, options);

    // Event listeners bound to the canvas
    this.listeners = new Map();

    // Canvas elements to be drawn
    this.elements = [];

    // Class boundaries
    this.classesBoundaries = {};

    // Weights of classifiers
    this.weights = null;
    this.multiWeights = null;

    // Initialization
    this.handleMouseEvents();

    this.resize();
    window.requestAnimationFrame(() => this.refresh());

    // Temporary properties
    this.tmp = {};
    this.tmp.predFeatures = [];
    this.tmp.predLabels = [];
  }

  /**
   * Add an event listener for events of some type emitted from this object
   *
   * @param label Event
   * @param callback Callback function
   */
  addListener(label, callback) {
    if (!this.listeners.has(label)) {
      this.listeners.set(label, []);
    }

    this.listeners.get(label).push(callback);
  }

  /**
   * Remove a previously added event listener for events of some type emitted from this object
   *
   * @param label Event
   * @param callback Callback function
   */
  removeListener(label, callback) {
    const listeners = this.listeners.get(label);

    if (listeners) {
      this.listeners.set(label, listeners.filter(
        x => !(typeof x === 'function' && x === callback)
      ));
    }
  }

  /**
   * Emit an event, which triggers the listener callback functions bound to it
   *
   * @param label Event
   * @param ...args Remaining arguments contain arguments that should be passed to the
   *                callback functions
   */
  emit(label, ...args) {
    const listeners = this.listeners.get(label);

    if (listeners) {
      listeners.forEach((listener) => { listener(...args); });
      return true;
    }

    return false;
  }

  /**
   * Add a data point element to the canvas, using a dataset datapoint as its model
   *
   * @param jsml.Dataset.Datapoint datapoint Dataset datapoint (model)
   */
  addDatapoint(datapoint) {
    this.elements.push(new __WEBPACK_IMPORTED_MODULE_0__datapoint__["a" /* default */](this, datapoint));
  }

  /**
   * Handle mouse events on the canvas, e.g. for adding data points
   */
  handleMouseEvents() {
    if (this.options.continuousClick) {
      this.mouseStatus = 0;
      this.mouseX = 0;
      this.mouseY = 0;

      jQuery(this.canvas.element).on('mousedown', () => {
        this.mouseStatus = 1;
        this.continuousClickIntervalId = setInterval(
          () => this.click(),
          this.options.continuousClickInterval
        );
      });

      jQuery(document).on('mouseup', () => {
        this.mouseStatus = 0;
        clearInterval(this.continuousClickIntervalId);
      });

      jQuery(document).on('mousemove', (e) => {
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
      });
    }

    jQuery(this.canvas.element).on('mousedown', (e) => {
      this.click(e.pageX, e.pageY);
    });
  }

  /**
   * Trigger a click at some position in the canvas
   *
   * @param int x Optional. X-coordinate of the click. Defaults to stored mouse position from
   *                        mousemove event
   * @param int y Optional. Y-coordinate of the click. Defaults to stored mouse position from
   *                        mousemove event
   */
  click(x = -1, y = -1) {
    let clickX = x;
    let clickY = y;

    if (x === -1) {
      clickX = this.mouseX;
      clickY = this.mouseY;
    }

    // Calculate normalized coordinates with origin in canvas center
    const [px, py] = this.convertCanvasCoordinatesToFeatures(clickX, clickY);

    this.emit('click', px, py);
  }

  /**
   * Clear the canvas
   */
  clear() {
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Handle the canvas size for different device pixel ratios and on window resizes
   */
  resize() {
    this.canvas.element.width = this.canvas.width * window.devicePixelRatio;
    this.canvas.element.height = this.canvas.height * window.devicePixelRatio;
    this.canvas.element.style.width = `${this.canvas.width}px`;
    this.canvas.element.style.height = `${this.canvas.height}px`;
    this.canvas.context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  /**
   * Refresh (i.e. redraw) everything on the canvas
   */
  refresh() {
    // Clear canvas
    this.clear();

    // Basic canvas elements
    this.drawGrid();
    this.drawAxes();

    // Dynamic canvas elements
    this.elements.forEach((element) => {
      element.update();
      element.draw();
    });

    // Class boundaries
    this.drawClassBoundaries();

    // for (let i = 0; i < this.tmp.predFeatures.length; i++) {
    //  let [xx,yy] = this.convertFeaturesToCanvasCoordinates(
    //    this.tmp.predFeatures[i][0],
    //    this.tmp.predFeatures[i][1]
    //  );

    //  this.canvas.context.fillStyle = this.getClassColor(this.tmp.predLabels[i]);
    //  this.canvas.context.fillRect(xx - 2, yy - 2, 4, 4);
    // }

    // Draw the weight vector
    // this.drawWeightVector(this.weights);

    // if (Array.isArray(this.multiWeights)) {
    //  let i = 0;
    //  for (let weights of this.multiWeights) {
    //    context.strokeStyle = this.getClassColor(i);
    //    this.drawWeightVector(weights);
    //    i++;
    //  }
    // }

    // Refresh again
    window.requestAnimationFrame(() => this.refresh());
  }

  setWeightVector(weights) {
    this.weights = weights;
  }

  /**
   * Set the class boundaries used for drawing the decision regions on the canvas
   *
   * @param Map[string => Array[Array[Number]]] Class boundaries per class label
   */
  setClassBoundaries(classesBoundaries) {
    this.classesBoundaries = classesBoundaries;
  }

  drawWeightVector(weights) {
    if (weights) {
      let fromX;
      let fromY;
      let toX;
      let toY;

      // w0 + w1 * x + w2 * y = 0

      if (Math.abs(weights[1]) > Math.abs(weights[2])) {
        fromX = -1;
        fromY = -(weights[0] - weights[1]) / weights[2];
        toX = 1;
        toY = -(weights[0] + weights[1]) / weights[2];
      } else {
        fromY = -1;
        fromX = -(weights[0] - weights[2]) / weights[1];
        toY = 1;
        toX = -(weights[0] + weights[2]) / weights[1];
      }

      const canvas = this.canvas;
      const context = canvas.context;

      fromX = (fromX + 1) / 2;
      fromY = 1 - (fromY + 1) / 2;
      toX = (toX + 1) / 2;
      toY = 1 - (toY + 1) / 2;

      context.beginPath();
      context.moveTo(fromX * canvas.width, fromY * canvas.height);
      context.lineTo(toX * canvas.width, toY * canvas.height);
      context.lineWidth = 3;
      // context.strokeStyle = '#BBB';
      context.stroke();
    }
  }

  /**
   * Calculate normalized canvas coordinates, i.e. transform mouse coordinates (relative to the
   * canvas origin = top left) to feature space in the range [-1,1] for both x and y. The origin at
   * (0,0) corresponds to the center of the canvas
   *
   * @param int x x-coordinate in canvas
   * @param int y y-coordinate in canvas
   * @return Array[double] Corresponding point in feature space (first element corresponds to x,
   *                       second element corresponds to y)
   */
  convertCanvasCoordinatesToFeatures(x, y) {
    let f1 = (x - jQuery(this.canvas.element).position().left) / this.canvas.width;
    let f2 = (y - jQuery(this.canvas.element).position().top) / this.canvas.height;

    f1 = -1 + f1 * 2;
    f2 = 1 - f2 * 2;

    return [f1, f2];
  }

  /**
   * Calculate canvas coordinates (origin at (0,0)) for a 2-dimensional data point's features
   *
   * @param double x0 First feature
   * @param double x1 Second feature
   * @return Array[int] Corresponding point in the canvas (first element corresponds to x, second
   *                    element corresponds to y)
   */
  convertFeaturesToCanvasCoordinates(x0, x1) {
    const x = (x0 + 1) / 2 * this.canvas.width;
    const y = -(x1 - 1) / 2 * this.canvas.height;

    return [x, y];
  }

  /**
   * Draw a grid on the canvas
   */
  drawGrid() {
    const canvas = this.canvas;
    const context = canvas.context;

    // Loop over all line offsets
    for (let i = 1; i < 10; i += 1) {
      // Horizontal
      context.beginPath();
      context.moveTo(0, i / 10 * canvas.height);
      context.lineTo(canvas.width, i / 10 * canvas.height);
      context.lineWidth = 1;
      context.strokeStyle = '#EAEAEA';
      context.stroke();

      // Vertical
      context.beginPath();
      context.moveTo(i / 10 * canvas.width, 0);
      context.lineTo(i / 10 * canvas.width, canvas.height);
      context.lineWidth = 1;
      context.strokeStyle = '#EAEAEA';
      context.stroke();
    }
  }

  /**
   * Draw the axes on the canvas
   */
  drawAxes() {
    const canvas = this.canvas;
    const context = canvas.context;

    // Origin coordinates
    const [originX, originY] = this.convertFeaturesToCanvasCoordinates(0, 0);

    // Horizontal
    context.beginPath();
    context.moveTo(0, originY);
    context.lineTo(canvas.width, originY);
    context.lineWidth = 2;
    context.strokeStyle = '#CCC';
    context.stroke();

    // Vertical
    context.beginPath();
    context.moveTo(originX, 0);
    context.lineTo(originX, canvas.height);
    context.lineWidth = 2;
    context.strokeStyle = '#CCC';
    context.stroke();
  }

  /**
   * Draw class boundaries
   */
  drawClassBoundaries() {
    const context = this.canvas.context;

    Object.keys(this.classesBoundaries).forEach((classLabel) => {
      const classBoundaries = this.classesBoundaries[classLabel];

      // The path delineates the decision region for this class
      context.beginPath();

      classBoundaries.forEach((classBoundary) => {
        let firstpoint = true;

        classBoundary.forEach((boundaryPoint) => {
          const [xx, yy] = this.convertFeaturesToCanvasCoordinates(
            boundaryPoint[0],
            boundaryPoint[1]
          );

          if (firstpoint) {
            firstpoint = false;
            context.moveTo(xx, yy);
          } else {
            context.lineTo(xx, yy);
          }

          if (Math.abs(boundaryPoint[0]) !== 1 && Math.abs(boundaryPoint[1]) !== 1) {
            context.fillStyle = this.getClassColor(classLabel);
            context.fillStyle = '#000';
            context.globalAlpha = 0.25;
            // context.fillRect(xx - 1, yy - 1, 2, 2);
            context.globalAlpha = 1;
          }

          // context.lineTo(x2, y2);
          // context.strokeStyle = this.getClassColor(contours[i].k);
        });

        context.closePath();
      });

      context.fillStyle = '#5DA5DA';
      context.strokeStyle = '#5DA5DA';
      context.fillStyle = this.getClassColor(classLabel);
      context.strokeStyle = this.getClassColor(classLabel);
      context.globalAlpha = 0.5;
      context.fill();
      context.globalAlpha = 1;
      // context.stroke();
    });
  }

  /**
   * Get drawing color for a class index
   *
   * @param int classIndex Class index
   * @return string Color in HEX with '#' prefix
   */
  getClassColor(classIndex) {
    const colors = this.getColors();
    return colors[Object.keys(colors)[parseInt(classIndex, 10)]];
  }

  /**
   * Get available drawing colors
   *
   * @return Array[string] Colors in HEX with '#' prefix; array keys are color names.
   */
  getColors() {
    return {
      blue: '#5DA5DA',
      orange: '#FAA43A',
      green: '#60BD68',
      pink: '#F17CB0',
      brown: '#B2912F',
      purple: '#B276B2',
      yellow: '#DECF3F',
      red: '#F15854',
      gray: '#4D4D4D',
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Canvas);


/***/ })
/******/ ]);