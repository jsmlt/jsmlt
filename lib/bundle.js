var jsml =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
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

/* harmony default export */ __webpack_exports__["a"] = {
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
};


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

/* harmony default export */ __webpack_exports__["a"] = {
  wrapSlice,
  zipWithIndex,
  valueCounts,
  argMax,
};


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

/* harmony default export */ __webpack_exports__["a"] = Classifier;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Kernel {
}

/* harmony default export */ __webpack_exports__["a"] = Kernel;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classifier__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);



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

/* harmony default export */ __webpack_exports__["a"] = BinaryClassifier;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binaryclassifier__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);



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

/* harmony default export */ __webpack_exports__["a"] = BinaryPerceptron;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__kernel__ = __webpack_require__(3);



class LinearKernel extends __WEBPACK_IMPORTED_MODULE_1__kernel__["a" /* default */] {
  apply(x, y) {
    return __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].dot(x, y);
  }
}

/* harmony default export */ __webpack_exports__["a"] = LinearKernel;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__binaryclassifier__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_random__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classification_linearkernel__ = __webpack_require__(6);





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

/* harmony default export */ __webpack_exports__["a"] = BinarySVM;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classifier__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_arrays__ = __webpack_require__(1);




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

/* harmony default export */ __webpack_exports__["a"] = OneVsAll;


/***/ }),
/* 9 */
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

/* harmony default export */ __webpack_exports__["a"] = Datapoint;


/***/ }),
/* 10 */
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

/* harmony default export */ __webpack_exports__["a"] = Datapoint;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function randint(a, b) {
  return a + Math.floor((b - a) * Math.random());
}

/* harmony default export */ __webpack_exports__["a"] = {
  randint,
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classification_boundaries__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classification_gaussiankernel__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classification_linearkernel__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classification_kernel__ = __webpack_require__(3);





/* harmony default export */ __webpack_exports__["a"] = {
  Boundaries: __WEBPACK_IMPORTED_MODULE_0__classification_boundaries__["a" /* default */],
  GaussianKernel: __WEBPACK_IMPORTED_MODULE_1__classification_gaussiankernel__["a" /* default */],
  LinearKernel: __WEBPACK_IMPORTED_MODULE_2__classification_linearkernel__["a" /* default */],
  Kernel: __WEBPACK_IMPORTED_MODULE_3__classification_kernel__["a" /* default */],
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classifier_binaryclassifier__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classifier_binaryperceptron__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classifier_binarysvm__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__classifier_classifier__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__classifier_knn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__classifier_svm__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__classifier_perceptron__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__classifier_perceptronold__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__classifier_perceptronold___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__classifier_perceptronold__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__classifier_svmjs__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__classifier_svmjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__classifier_svmjs__);










/* harmony default export */ __webpack_exports__["a"] = {
  BinaryClassifier: __WEBPACK_IMPORTED_MODULE_0__classifier_binaryclassifier__["a" /* default */],
  BinaryPerceptron: __WEBPACK_IMPORTED_MODULE_1__classifier_binaryperceptron__["a" /* default */],
  BinarySVM: __WEBPACK_IMPORTED_MODULE_2__classifier_binarysvm__["a" /* default */],
  Classifier: __WEBPACK_IMPORTED_MODULE_3__classifier_classifier__["a" /* default */],
  KNN: __WEBPACK_IMPORTED_MODULE_4__classifier_knn__["a" /* default */],
  SVM: __WEBPACK_IMPORTED_MODULE_5__classifier_svm__["a" /* default */],
  Perceptron: __WEBPACK_IMPORTED_MODULE_6__classifier_perceptron__["a" /* default */],
  PerceptronOld: __WEBPACK_IMPORTED_MODULE_7__classifier_perceptronold__["default"],
  SVMJS: __WEBPACK_IMPORTED_MODULE_8__classifier_svmjs__["default"],
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_datapoint__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_dataset__ = __webpack_require__(25);



/* harmony default export */ __webpack_exports__["a"] = {
  Datapoint: __WEBPACK_IMPORTED_MODULE_0__data_datapoint__["a" /* default */],
  Dataset: __WEBPACK_IMPORTED_MODULE_1__data_dataset__["a" /* default */],
};


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_geometry__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);



/* harmony default export */ __webpack_exports__["a"] = {
  Geometry: __WEBPACK_IMPORTED_MODULE_0__math_geometry__["a" /* default */],
  LinAlg: __WEBPACK_IMPORTED_MODULE_1__math_linalg__["a" /* default */],
};


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_canvas__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_datapoint__ = __webpack_require__(10);



/* harmony default export */ __webpack_exports__["a"] = {
  Canvas: __WEBPACK_IMPORTED_MODULE_0__ui_canvas__["a" /* default */],
  Datapoint: __WEBPACK_IMPORTED_MODULE_1__ui_datapoint__["a" /* default */],
};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_inputdevices__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_random__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_arrays__ = __webpack_require__(1);




/* harmony default export */ __webpack_exports__["a"] = {
  InputDevices: __WEBPACK_IMPORTED_MODULE_0__util_inputdevices__["a" /* default */],
  Random: __WEBPACK_IMPORTED_MODULE_1__util_random__["a" /* default */],
  Arrays: __WEBPACK_IMPORTED_MODULE_2__util_arrays__["a" /* default */],
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_arrays__ = __webpack_require__(1);



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
    const predictionsGrid = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].reshape(predictions, [resolutionX, resolutionY]);

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
    const levels = Array.from(new Set(__WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].flatten(grid)));

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
      gridLocal = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].pad(gridLocal, [1, 1], [-1, -1]);
    }

    // Calculate contours
    const contours = MarchingSquaresJS.IsoBands(gridLocal, -2, 0.5);

    // Reshape contours to fit square centered around 0. This has to be done because IsoBands
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

          let points = __WEBPACK_IMPORTED_MODULE_1__util_arrays__["a" /* default */].wrapSlice(levelContours[i], j - degree, j + degree);

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

          const pointsX = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].subBlock(points, [0, 0], [points.length, 1]));
          const pointsY = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].flatten(__WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].subBlock(points, [0, 1], [points.length, 1]));

          levelContoursSmoothed[i][j][0] = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].internalSum(pointsX) / pointsX.length;
          levelContoursSmoothed[i][j][1] = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].internalSum(pointsY) / pointsY.length;
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
    const linspaceX = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].linspace(boundsX[0], boundsX[1], pointsX);
    const linspaceY = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].linspace(boundsY[0], boundsY[1], pointsY);

    // Create mesh grid with coordinates for each point in the grid
    const [gridX, gridY] = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].meshGrid(linspaceX, linspaceY);

    // Generate corresponding vectors of coordinate components
    const gridXVec = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].flatten(gridX);
    const gridYVec = __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].flatten(gridY);

    // Join coordinate components per data point, yielding the feature vector
    return __WEBPACK_IMPORTED_MODULE_0__math_linalg__["a" /* default */].concatenate(1, gridXVec, gridYVec);
  }

}

/* harmony default export */ __webpack_exports__["a"] = Boundaries;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__kernel__ = __webpack_require__(3);



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

/* harmony default export */ __webpack_exports__["a"] = GaussianKernel;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classifier__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_arrays__ = __webpack_require__(1);




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

/* harmony default export */ __webpack_exports__["a"] = KNN;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__onevsall__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__binaryperceptron__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_arrays__ = __webpack_require__(1);





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

/* harmony default export */ __webpack_exports__["a"] = Perceptron;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/jespervanengelen/Documents/Projects/Personal/Other/VisualML/jsml/jsml/src/classifier/perceptronold.js'\n    at Error (native)");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__onevsall__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__binarysvm__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_linalg__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_arrays__ = __webpack_require__(1);





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

/* harmony default export */ __webpack_exports__["a"] = SVM;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/jespervanengelen/Documents/Projects/Personal/Other/VisualML/jsml/jsml/src/classifier/svmjs.js'\n    at Error (native)");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datapoint__ = __webpack_require__(9);


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

/* harmony default export */ __webpack_exports__["a"] = Dataset;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function polygonArea(path) {
  // Convert points to common format
  const points = [];

  for (let i = 0; i < path.length; i += 1) {
    const pointRaw = path[i];

    // Accept both arrays and objects with property 'x' and 'y' as input for a point
    if (Array.isArray(pointRaw)) {
      points.push(pointRaw.slice());
    } else {
      points.push([pointRaw.x, pointRaw.y]);
    }
  }

  // Calculate area
  let area = 0;

  // Closed path
  let pointPrevious = points[points.length - 1].slice();

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    area += (pointPrevious[0] + point[0]) * (pointPrevious[1] - point[1]);
    pointPrevious = point;
  }

  return area;
}

/* harmony default export */ __webpack_exports__["a"] = {
  polygonArea,
};


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datapoint__ = __webpack_require__(10);


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

/* harmony default export */ __webpack_exports__["a"] = Canvas;


/***/ }),
/* 28 */
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

/* harmony default export */ __webpack_exports__["a"] = {
  getTouchCoordinate,
};


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classification__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classifier__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__math__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ui__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Classification", function() { return __WEBPACK_IMPORTED_MODULE_0__classification__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Classifier", function() { return __WEBPACK_IMPORTED_MODULE_1__classifier__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return __WEBPACK_IMPORTED_MODULE_2__data__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return __WEBPACK_IMPORTED_MODULE_3__util__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Math", function() { return __WEBPACK_IMPORTED_MODULE_4__math__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "UI", function() { return __WEBPACK_IMPORTED_MODULE_5__ui__["a"]; });










/***/ })
/******/ ]);