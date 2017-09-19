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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

  var B = getShape(A[0]);
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
  var r = [];

  for (var i = 0; i < n; i += 1) {
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
  return [].concat(_toConsumableArray(Array(n))).map(function () {
    return value;
  });
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

  return [].concat(_toConsumableArray(Array(shape[0]))).map(function () {
    return full(shape.slice(1), value);
  });
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
  return A.map(function (B) {
    return Array.isArray(B) ? fill(B, value) : value;
  });
}

/**
 * Concatenate two or more n-dimensional arrays.
 *
 * @param Integer axis Axis to perform concatenation on
 * @param Array[...[mixed]] ...S  Arrays to concatenate. They must have the same shape, except
 *                  in the dimension corresponding to axis (the first, by default)
 * @return Array Concatenated array
 */
function concatenate(axis) {
  for (var _len = arguments.length, S = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    S[_key - 1] = arguments[_key];
  }

  if (axis === 0) {
    var _ref;

    return (_ref = []).concat.apply(_ref, S);
  }

  var A = [];

  var _loop = function _loop(i) {
    A.push(concatenate.apply(undefined, [axis - 1].concat(_toConsumableArray(S.map(function (APrime) {
      return APrime[i];
    })))));
  };

  for (var i = 0; i < S[0].length; i += 1) {
    _loop(i);
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
  var R = A.slice();

  for (var i = 0; i < numRepeats - 1; i += 1) {
    R = concatenate(axis, R, A);
  }

  return R;
}

/**
 * Pad an array along one or multiple axes
 *
 * @param Array[...[mixed]] A Array to be padded
 */
function pad(A) {
  var paddingLengths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [[1, 1]];
  var paddingValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [[0, 0]];
  var axes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var B = A.slice();

  // Use default axes to padded (first n axes where n is the number of axes used in paddingLenghts
  // and paddingValues)
  if (!axes.length) {
    for (var i = 0; i < paddingLengths.length; i += 1) {
      axes.push(i);
    }
  }

  // Pad all specified axes
  for (var _i = 0; _i < axes.length; _i += 1) {
    var axis = axes[_i];
    var currentShape = getShape(B);

    // Determine padding lengths
    var lengthFront = 0;
    var lengthBack = 0;

    if (Array.isArray(paddingLengths[_i])) {
      lengthFront = paddingLengths[_i][0];
      lengthBack = paddingLengths[_i][1];
    } else {
      lengthFront = paddingLengths[_i];
      lengthBack = paddingLengths[_i];
    }

    // Determine padding values
    var valueFront = 0;
    var valueBack = 0;

    if (Array.isArray(paddingValues[_i])) {
      valueFront = paddingValues[_i][0];
      valueBack = paddingValues[_i][1];
    } else {
      valueFront = paddingValues[_i];
      valueBack = paddingValues[_i];
    }

    // Shape of padding for front and back
    var shapeFront = currentShape.slice();
    var shapeBack = currentShape.slice();

    shapeFront[axis] = lengthFront;
    shapeBack[axis] = lengthBack;

    // Create padding blocks
    var paddingFront = full(shapeFront, valueFront);
    var paddingBack = full(shapeBack, valueBack);

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
  return x.reduce(function (r, a, i) {
    return r + a * y[i];
  }, 0);
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
  return x.map(function (a, i) {
    return a + y[i];
  });
}

/**
 * Multiply a vector by a scalar (i.e. scale the vector)
 *
 * @param Array[Number] x Vector
 * @param Number c Scalar
 * @return Array[Number] Scaled vector
 */
function scale(x, c) {
  return x.map(function (a) {
    return c * a;
  });
}

/**
 * Sum all elements of an array
 *
 * @param Array[...[Number]] x Array
 * @return Number Sum of all vector elements
 */
function internalSum(A) {
  return A.reduce(function (r, B) {
    return r + (Array.isArray(B) ? internalSum(B) : B);
  }, 0);
}

/**
 * Get a copy of an array with absolute values of the original array entries
 *
 * @param Array[...[Number]] A Array to get absolute values array from
 * @return Array[...[Number]] Array with absolute values
 */
function abs(A) {
  return A.map(function (B) {
    return Array.isArray(B) ? abs(B) : Math.abs(B);
  });
}

/**
 * Randomly permute the rows of a matrix
 *
 * @param Array[Array[mixed]] S Matrix
 * @param Array[Array[mixed]] ... Other matrices to permute in the same way
 * @param Array[Array]
 * @return Array[Array[mixed]] Permuted matrix
 */
function permuteRows() {
  for (var _len2 = arguments.length, S = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    S[_key2] = arguments[_key2];
  }

  // Copy matrices
  var SPermutated = S.map(function (A) {
    return A.slice();
  });

  // Number of remaining rows
  var remainingRows = SPermutated[0].length;

  while (remainingRows > 0) {
    // Select a random element from the remaining rows and swap it with the first element that has
    // not yet been assigned
    var swapIndex = Math.floor(Math.random() * remainingRows);

    for (var i = 0; i < SPermutated.length; i += 1) {
      var tmpRow = SPermutated[i][remainingRows - 1];

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
  var _ref2;

  return (_ref2 = []).concat.apply(_ref2, _toConsumableArray(A.map(function (x) {
    return Array.isArray(x) ? flatten(x) : x;
  })));
}

/**
 * Get the transpose of a matrix or vector
 *
 * @param Array[Array[Number]] A Matrix or vector
 * @return Array[Array[Number]] Transpose of the matrix
 */
function transpose(A) {
  var ATranspose = zeros([A[0].length, A.length]);

  for (var i = 0; i < A.length; i += 1) {
    for (var j = 0; j < A[0].length; j += 1) {
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
  var gridX = transpose(repeat(1, y.length, x));
  var gridY = repeat(1, x.length, y);

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
  var B = A.slice();

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
  var AValues = flatten(A);

  var B = zeros(shape);

  var counters = zeroVector(shape.length);
  var counterIndex = counters.length - 1;

  var counterTotal = 0;

  var done = false;

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

  var subblock = [];

  for (var i = offset[0]; i < offset[0] + shape[0]; i += 1) {
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

exports.default = {
  linspace: linspace,
  zeroVector: zeroVector,
  valueVector: valueVector,
  zeros: zeros,
  full: full,
  fill: fill,
  pad: pad,
  getShape: getShape,
  dot: dot,
  norm: norm,
  sum: sum,
  scale: scale,
  internalSum: internalSum,
  abs: abs,
  permuteRows: permuteRows,
  flatten: flatten,
  concatenate: concatenate,
  transpose: transpose,
  meshGrid: meshGrid,
  repeat: repeat,
  reshape: reshape,
  subBlock: subBlock,
  setArrayElement: setArrayElement,
  getArrayElement: getArrayElement
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  var result = [];

  for (var i = begin; i <= end; i += 1) {
    var index = (i % array.length + array.length) % array.length;
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
  return array.map(function (x, i) {
    return [x, i];
  });
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
  var counts = [];
  var valuesIndex = {};
  var numUniqueValues = 0;

  array.forEach(function (x) {
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

  return zipWithIndex(array).reduce(function (r, x) {
    return x[0] > r[0] ? x : r;
  })[1];
}

exports.default = {
  wrapSlice: wrapSlice,
  zipWithIndex: zipWithIndex,
  valueCounts: valueCounts,
  argMax: argMax
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Classifier = function () {
  function Classifier() {
    _classCallCheck(this, Classifier);

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


  _createClass(Classifier, [{
    key: 'resetLabelsClassIndex',
    value: function resetLabelsClassIndex() {
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

  }, {
    key: 'getOrCreateLabelClassIndex',
    value: function getOrCreateLabelClassIndex(label) {
      var labelString = label.toString();

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

  }, {
    key: 'getLabelClassIndex',
    value: function getLabelClassIndex(label) {
      var labelString = label.toString();

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

  }, {
    key: 'getClassIndexLabel',
    value: function getClassIndexLabel(classIndex) {
      return typeof this.classIndicesLabel[classIndex] === 'undefined' ? -1 : this.classIndicesLabel[classIndex];
    }
  }]);

  return Classifier;
}();

exports.default = Classifier;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Kernel = function Kernel() {
  _classCallCheck(this, Kernel);
};

exports.default = Kernel;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classifier = __webpack_require__(2);

var _classifier2 = _interopRequireDefault(_classifier);

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


/**
 * Binary classifier base class, intended to be extended by binary classifiers that support
 * callback via a OneVsAll classifier.
 */
var BinaryClassifier = function (_Classifier) {
  _inherits(BinaryClassifier, _Classifier);

  function BinaryClassifier() {
    _classCallCheck(this, BinaryClassifier);

    /**
     * Object to store training data
     *
     * @var dict
     */
    var _this = _possibleConstructorReturn(this, (BinaryClassifier.__proto__ || Object.getPrototypeOf(BinaryClassifier)).call(this));

    _this.training = {
      features: [],
      labels: []
    };
    return _this;
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


  _createClass(BinaryClassifier, [{
    key: 'loadTrainingData',
    value: function loadTrainingData(features, labels) {
      var _this2 = this;

      var positiveClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      // Check to make sure number of labels matches number of feature sets
      if (features.length !== labels.length) {
        throw new Error('Number of data points should match number of labels.');
      }

      // Format labels
      var uniqueLabels = Array.from(new Set(labels));

      if (uniqueLabels.length > 2) {
        throw new Error('No more than 2 unique class labels should be passed to a BinaryClassifier. Two class labels are distinct if their string representations are inequal.');
      }

      if (positiveClass !== null && uniqueLabels.includes(positiveClass) && uniqueLabels.length === 2) {
        this.getOrCreateLabelClassIndex(uniqueLabels[1 - uniqueLabels.indexOf(positiveClass)]);
      }

      // Store data points
      this.training.features = features;
      this.training.labels = labels.map(function (x) {
        return _this2.getOrCreateLabelClassIndex(x);
      });
    }
  }]);

  return BinaryClassifier;
}(_classifier2.default);

exports.default = BinaryClassifier;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

var _kernel = __webpack_require__(3);

var _kernel2 = _interopRequireDefault(_kernel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


var LinearKernel = function (_Kernel) {
  _inherits(LinearKernel, _Kernel);

  function LinearKernel() {
    _classCallCheck(this, LinearKernel);

    return _possibleConstructorReturn(this, (LinearKernel.__proto__ || Object.getPrototypeOf(LinearKernel)).apply(this, arguments));
  }

  _createClass(LinearKernel, [{
    key: 'apply',
    value: function apply(x, y) {
      return _linalg2.default.dot(x, y);
    }
  }]);

  return LinearKernel;
}(_kernel2.default);

exports.default = LinearKernel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binaryclassifier = __webpack_require__(4);

var _binaryclassifier2 = _interopRequireDefault(_binaryclassifier);

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


/**
 * Perceptron learner for binary classification problem.
 */
var BinaryPerceptron = function (_BinaryClassifier) {
  _inherits(BinaryPerceptron, _BinaryClassifier);

  function BinaryPerceptron() {
    _classCallCheck(this, BinaryPerceptron);

    var _this = _possibleConstructorReturn(this, (BinaryPerceptron.__proto__ || Object.getPrototypeOf(BinaryPerceptron)).call(this));

    _this.weights = null;
    return _this;
  }

  /**
   * Initialize weights vector to zero. Here, the number of weights equals one plus the number of
   * features, where the first weight (w0) is the weight used for the bias.
   */


  _createClass(BinaryPerceptron, [{
    key: 'initializeWeights',
    value: function initializeWeights() {
      this.weights = _linalg2.default.zeroVector(1 + this.training.features[0].length);
    }

    /**
     * Get the signed value of the class index. Returns -1 for class index 0, 1 for class index 1
     *
     * @param int classIndex Class index
     * @return int Sign corresponding to class index
     */

  }, {
    key: 'getClassIndexSign',
    value: function getClassIndexSign(classIndex) {
      return classIndex * 2 - 1;
    }

    /**
     * Get the class index corresponding to a sign
     *
     * @param int sign Sign
     * @return int Class index corresponding to sign
     */

  }, {
    key: 'getSignClassIndex',
    value: function getSignClassIndex(sign) {
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

  }, {
    key: 'train',
    value: function train() {
      var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var positiveClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (features !== null && labels !== null) {
        // Load training data
        this.loadTrainingData(features, labels, positiveClass);
      }

      // Weights increment to check for convergence
      this.weightsIncrement = Infinity;

      // Initialize weights vector to zero
      this.initializeWeights();

      // Store historic errors
      var epochNumErrors = [];

      // Iteration index
      var epoch = 0;

      // A single iteration of this loop corresponds to a single iteration of training all data
      // points in the data set
      while (true) {
        var _trainIteration = this.trainIteration(),
            _trainIteration2 = _slicedToArray(_trainIteration, 2),
            numErrors = _trainIteration2[0],
            weightsIncrement = _trainIteration2[1];

        epochNumErrors.push(numErrors);

        if (weightsIncrement.reduce(function (r, a) {
          return r + Math.abs(a);
        }, 0) < 0.0001 || epoch > 100) {
          break;
        }

        epoch += 1;
      }
    }

    /**
     * Train the classifier for a single iteration on the stored training data
     */

  }, {
    key: 'trainIteration',
    value: function trainIteration() {
      // Initialize the weights increment vector, which is used to increment the weights in each
      // iteration after the calculations are done.
      var weightsIncrement = _linalg2.default.zeroVector(this.weights.length);

      // Initialize number of misclassified points
      var numErrors = 0;

      // Shuffle data points

      var _LinAlg$permuteRows = _linalg2.default.permuteRows(this.training.features, this.training.labels),
          _LinAlg$permuteRows2 = _slicedToArray(_LinAlg$permuteRows, 2),
          features = _LinAlg$permuteRows2[0],
          labels = _LinAlg$permuteRows2[1];

      // Loop over all datapoints


      for (var i = 0; i < this.training.features.length; i += 1) {
        // Transform binary class index to class sign (0 becomes -1 and 1 remains 1)
        var classSign = this.getClassIndexSign(labels[i]);

        // Copy features vector so it is not changed in the datapoint
        var augmentedFeatures = features[i].slice();

        // Add feature with value 1 at the beginning of the feature vector to correpond with the
        // bias weight
        augmentedFeatures.unshift(1);

        // Calculate output
        var output = _linalg2.default.dot(augmentedFeatures, this.weights);

        // Check whether the point was correctly classified
        if (classSign * output <= 0) {
          // Increase the number of errors
          numErrors += 1;

          // Update the weights change to be used at the end of this epoch
          weightsIncrement = _linalg2.default.sum(weightsIncrement, _linalg2.default.scale(augmentedFeatures, classSign));
        }
      }

      // Take average of all weight increments
      this.weightsIncrement = _linalg2.default.scale(weightsIncrement, 0.01 / this.training.features.length);
      this.weights = _linalg2.default.sum(this.weights, this.weightsIncrement);

      return [numErrors, weightsIncrement];
    }

    /**
     * Check whether training has convergence when using iterative training using trainIteration
     *
     * @return bool Whether the algorithm has converged
     */

  }, {
    key: 'checkConvergence',
    value: function checkConvergence() {
      return _linalg2.default.internalSum(_linalg2.default.abs(this.weightsIncrement)) < 0.0001;
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

  }, {
    key: 'predict',
    value: function predict(features) {
      var optionsUser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Options
      var optionsDefault = {
        output: 'classLabels' // 'classLabels', 'normalized' or 'raw'
      };

      var options = Object.assign({}, optionsDefault, optionsUser);

      // Predictions
      var predictions = [];

      // Normalization factor for normalized output
      var weightsMagnitude = Math.sqrt(_linalg2.default.dot(this.weights, this.weights));

      // Loop over all datapoints
      for (var i = 0; i < features.length; i += 1) {
        // Copy features vector so it is not changed in the datapoint
        var augmentedFeatures = features[i].slice();

        // Add feature with value 1 at the beginning of the feature vector to correpond with the
        // bias weight
        augmentedFeatures.unshift(1);

        // Calculate output
        var output = _linalg2.default.dot(augmentedFeatures, this.weights);

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
  }]);

  return BinaryPerceptron;
}(_binaryclassifier2.default);

exports.default = BinaryPerceptron;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _binaryclassifier = __webpack_require__(4);

var _binaryclassifier2 = _interopRequireDefault(_binaryclassifier);

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

var _random = __webpack_require__(8);

var _random2 = _interopRequireDefault(_random);

var _linearkernel = __webpack_require__(5);

var _linearkernel2 = _interopRequireDefault(_linearkernel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


/**
 * SVM learner for binary classification problem
 */
var BinarySVM = function (_BinaryClassifier) {
  _inherits(BinarySVM, _BinaryClassifier);

  /**
   * Constructor
   *
   * @param dict optionsUser User-defined options for SVM. See method implementation for details
   */
  function BinarySVM() {
    var optionsUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BinarySVM);

    // Parse options
    var _this = _possibleConstructorReturn(this, (BinarySVM.__proto__ || Object.getPrototypeOf(BinarySVM)).call(this));

    var optionsDefault = {
      // Regularization (i.e. penalty for slack variables)
      C: 100.0,

      // Kernel. Defaults to null (which is checked to instantiate the linear kernel)
      kernel: null,

      // Number of passes without alphas changing to treat the algorithm as converged
      convergenceNumPasses: 10,

      // Numerical tolerance for a value in the to be equal to another SMO algorithm to be equal to
      // another value
      numericalTolerance: 1e-4
    };

    var options = Object.assign({}, optionsDefault, optionsUser);

    // Set options
    _this.C = options.C;
    _this.kernel = options.kernel === null ? new _linearkernel2.default() : options.kernel;
    _this.numericalTolerance = options.numericalTolerance;
    _this.convergenceNumPasses = options.convergenceNumPasses;

    _this.supportVectors = [];
    _this.kernelCache = null;
    _this.kernelCacheStatus = null;
    return _this;
  }

  /**
   * Get the signed value of the class index. Returns -1 for class index 0, 1 for class index 1
   *
   * @param int classIndex Class index
   * @return int Sign corresponding to class index
   */


  _createClass(BinarySVM, [{
    key: 'getClassIndexSign',
    value: function getClassIndexSign(classIndex) {
      return classIndex * 2 - 1;
    }

    /**
     * Get the class index corresponding to a sign
     *
     * @param int sign Sign
     * @return int Class index corresponding to sign
     */

  }, {
    key: 'getSignClassIndex',
    value: function getSignClassIndex(sign) {
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

  }, {
    key: 'train',
    value: function train() {
      var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var _this2 = this;

      var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var positiveClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (features !== null || labels !== null) {
        // Load training data
        this.loadTrainingData(features, labels, positiveClass);
      }

      // Number of training samples
      var numSamples = this.training.features.length;

      // Alphas (Lagrange multipliers)
      this.alphas = _linalg2.default.zeroVector(numSamples);

      // Bias term
      this.b = 0.0;

      // Kernel cache
      this.kernelCache = _linalg2.default.full([numSamples, numSamples], 0.0);
      this.kernelCacheStatus = _linalg2.default.full([numSamples, numSamples], false);

      // Number of passes of the algorithm without any alphas changing
      var numPasses = 0;

      // Shorthand notation for features and labels
      var X = this.training.features;
      var Y = this.training.labels.map(function (x) {
        return _this2.getClassIndexSign(x);
      });

      while (numPasses < this.convergenceNumPasses) {
        var alphasChanged = 0;

        // Loop over all training samples
        for (var i = 0; i < numSamples; i += 1) {
          // Calculate offset to the 1-margin of sample i
          var ei = this.sampleMargin(X[i]) - Y[i];

          // Check whether the KKT constraints were violated
          if (Y[i] * ei < -this.numericalTolerance && this.alphas[i] < this.C || Y[i] * ei > this.numericalTolerance && this.alphas[i] > 0) {
            /* Now, we need to update \alpha_i as it violates the KKT constraints */

            // Thus, we pick a random \alpha_j such that j does not equal i
            var j = _random2.default.randint(0, numSamples - 1);
            if (j >= i) j += 1;

            // Calculate offset to the 1-margin of sample j
            var ej = this.sampleMargin(X[j]) - Y[j];

            // Calculate lower and upper bounds for \alpha_j

            var _calculateAlphaBounds = this.calculateAlphaBounds(i, j),
                _calculateAlphaBounds2 = _slicedToArray(_calculateAlphaBounds, 2),
                boundL = _calculateAlphaBounds2[0],
                boundH = _calculateAlphaBounds2[1];

            if (Math.abs(boundH - boundL) < this.numericalTolerance) {
              // Difference between bounds is practically zero, so there's not much to optimize.
              // Continue to next sample.
              continue;
            }

            // Calculate second derivative of cost function from Lagrange dual problem. Note
            // that a_i = (g - a_j * y_j) / y_i, where g is the negative sum of all a_k * y_k where
            // k is not equal to i or j
            var Kij = this.applyKernel(i, j);
            var Kii = this.applyKernel(i, i);
            var Kjj = this.applyKernel(j, j);
            var eta = 2 * Kij - Kii - Kjj;

            if (eta >= 0) {
              continue;
            }

            // Compute new \alpha_j
            var oldAlphaJ = this.alphas[j];
            var newAlphaJ = oldAlphaJ - Y[j] * (ei - ej) / eta;
            newAlphaJ = Math.min(newAlphaJ, boundH);
            newAlphaJ = Math.max(newAlphaJ, boundL);

            // Don't update if the difference is too small
            if (Math.abs(newAlphaJ - oldAlphaJ) < this.numericalTolerance) {
              continue;
            }

            // Compute new \alpha_i
            var oldAlphaI = this.alphas[i];
            var newAlphaI = oldAlphaI + Y[i] * Y[j] * (oldAlphaJ - newAlphaJ);

            // Update \alpha_j and \alpha_i
            this.alphas[j] = newAlphaJ;
            this.alphas[i] = newAlphaI;

            // Update the bias term, interpolating between the bias terms for \alpha_i and \alpha_j
            var b1 = this.b - ei - Y[i] * (newAlphaI - oldAlphaI) * Kii - Y[j] * (newAlphaJ - oldAlphaJ) * Kij;
            var b2 = this.b - ej - Y[i] * (newAlphaI - oldAlphaI) * Kij - Y[j] * (newAlphaJ - oldAlphaJ) * Kjj;

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

      this.supportVectors = this.alphas.map(function (x) {
        return x > 1e-6;
      });
    }

    /**
     * Calculate the margin (distance to the decision boundary) for a single sample
     *
     * @param Array[Number]|int sample Sample features array or training sample index
     * @return double Distance to decision boundary
     */

  }, {
    key: 'sampleMargin',
    value: function sampleMargin(sample) {
      var rval = this.b;

      for (var i = 0; i < this.training.features.length; i += 1) {
        var k = this.applyKernel(sample, i);
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

  }, {
    key: 'applyKernel',
    value: function applyKernel(x, y) {
      var fromCache = typeof x === 'number' && typeof y === 'number';

      if (fromCache && this.kernelCacheStatus[x][y] === true) {
        return this.kernelCache[x][y];
      }

      var xf = typeof x === 'number' ? this.training.features[x] : x;
      var yf = typeof y === 'number' ? this.training.features[y] : y;
      var result = this.kernel.apply(xf, yf);

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

  }, {
    key: 'calculateAlphaBounds',
    value: function calculateAlphaBounds(i, j) {
      var boundL = void 0;
      var boundH = void 0;

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

  }, {
    key: 'predict',
    value: function predict(features, optionsUser) {
      var _this3 = this;

      // Options
      var optionsDefault = {
        output: 'classLabels' // 'classLabels', 'normalized' or 'raw'
      };

      var options = Object.assign({}, optionsDefault, optionsUser);

      return features.map(function (x) {
        var output = _this3.sampleMargin(x);

        // Store prediction
        if (options.output === 'raw' || options.output === 'normalized') {
          // Raw output: do nothing
        } else {
          // Class label output
          output = _this3.getClassIndexLabel(_this3.getSignClassIndex(output > 0 ? 1 : -1));
        }

        return output;
      });
    }
  }]);

  return BinarySVM;
}(_binaryclassifier2.default);

exports.default = BinarySVM;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Generate a random integer between a lower bound (inclusive) and an upper bound (exclusive)
 *
 * @param int a Lower bound (inclusive)
 * @param int b Upper bound (exclusive)
 */
function randint(a, b) {
  return a + Math.floor((b - a) * Math.random());
}

exports.default = {
  randint: randint
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classifier = __webpack_require__(2);

var _classifier2 = _interopRequireDefault(_classifier);

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

var _arrays = __webpack_require__(1);

var _arrays2 = _interopRequireDefault(_arrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


var OneVsAll = function (_Classifier) {
  _inherits(OneVsAll, _Classifier);

  function OneVsAll() {
    _classCallCheck(this, OneVsAll);

    /**
     * Object to store training data
     *
     * @var dict
     */
    var _this = _possibleConstructorReturn(this, (OneVsAll.__proto__ || Object.getPrototypeOf(OneVsAll)).call(this));

    _this.training = {
      features: [],
      labels: []
    };

    /**
     * List of classifiers. One classifier per class label/index
     *
     * @var Array
     */
    _this.classifiers = [];

    /**
     * Event listeners bound to the canvas
     *
     * @var Map
     */
    _this.listeners = new Map();
    return _this;
  }

  /**
   * Create a binary classifier for one of the classes
   *
   * @param int classIndex Class index of the positive class for the binary classifier
   * @return BinaryClassifier Binary classifier
   */


  _createClass(OneVsAll, [{
    key: 'createClassifier',
    value: function createClassifier(classIndex) {
      return null;
    }

    /**
     * Create all binary classifiers. Creates one classifier per class
     */

  }, {
    key: 'createClassifiers',
    value: function createClassifiers() {
      var _this2 = this;

      // Get unique labels
      var uniqueClassIndices = Array.from(new Set(this.training.labels));

      // Initialize label set and classifier for all labels
      this.classifiers = uniqueClassIndices.map(function (classIndex) {
        var classifier = _this2.createClassifier(classIndex);
        return classifier;
      });
    }

    /**
     * Train all binary classifiers one-by-one
     */

  }, {
    key: 'trainBatch',
    value: function trainBatch() {
      this.classifiers.forEach(function (x) {
        return x.train();
      });
    }

    /**
     * Train all binary classifiers iteration by iteration, i.e. start with the first training
     * iteration for each binary classifier, then execute the second training iteration for each
     * binary classifier, and so forth. Can be used when one needs to keep track of information per
     * iteration, e.g. accuracy
     */

  }, {
    key: 'trainIterative',
    value: function trainIterative() {
      var remainingClassIndices = Array.from(new Set(this.training.labels));

      var epoch = 0;

      while (epoch < 100 && remainingClassIndices.length > 0) {
        var remainingClassIndicesNew = remainingClassIndices.slice();

        // Loop over all 1-vs-all classifiers
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = remainingClassIndices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var classIndex = _step.value;

            // Run a single iteration for the classifier
            this.classifiers[classIndex].trainIteration();

            if (this.classifiers[classIndex].checkConvergence()) {
              remainingClassIndicesNew.splice(remainingClassIndicesNew.indexOf(classIndex), 1);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
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

  }, {
    key: 'train',
    value: function train(features, labels) {
      var _this3 = this;

      // Check to make sure number of labels matches number of feature sets
      if (features.length !== labels.length) {
        throw new Error('Number of data points should match number of labels.');
      }

      // Store data points
      this.training.features = features;
      this.training.labels = labels.map(function (x) {
        return _this3.getOrCreateLabelClassIndex(x);
      });

      this.createClassifiers();
    }

    /**
     * Make a prediction for a data set
     *
     * @param Array[Array[mixed]] Features for each data point
     * @return Array[Integer] Predictions. For each data point the class label is either -1 or 1
     */

  }, {
    key: 'predict',
    value: function predict(features) {
      var _this4 = this;

      if (this.weights === null) {
        throw new Error('Model has to be trained in order to make predictions.');
      }

      if (features[0].length !== this.training.features[0].length) {
        throw new Error('Number of features of test data should match number of features of training data.');
      }

      // Get predictions from all classifiers for all data points by predicting all data points with
      // each classifier (getting an array of predictions for each classifier) and transposing
      var datapointsPredictions = _linalg2.default.transpose(this.classifiers.map(function (x) {
        return x.predict(features, { output: 'normalized' });
      }));

      // Form final prediction by taking index of maximum normalized classifier output
      return datapointsPredictions.map(function (x) {
        return _this4.getClassIndexLabel(_arrays2.default.argMax(x));
      });
    }

    /**
     * Add an event listener for events of some type emitted from this object
     *
     * @param label Event
     * @param callback Callback function
     */

  }, {
    key: 'addListener',
    value: function addListener(label, callback) {
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

  }, {
    key: 'removeListener',
    value: function removeListener(label, callback) {
      var listeners = this.listeners.get(label);

      if (listeners) {
        this.listeners.set(label, listeners.filter(function (x) {
          return !(typeof x === 'function' && x === callback);
        }));
      }
    }

    /**
     * Emit an event, which triggers the listener callback functions bound to it
     *
     * @param label Event
     * @param ...args Remaining arguments contain arguments that should be passed to the
     *                callback functions
     */

  }, {
    key: 'emit',
    value: function emit(label) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this.listeners.get(label);

      if (listeners) {
        listeners.forEach(function (listener) {
          listener.apply(undefined, args);
        });
        return true;
      }

      return false;
    }
  }]);

  return OneVsAll;
}(_classifier2.default);

exports.default = OneVsAll;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Datapoint = function () {
  /**
   * Constructor
   *
   * @param Array[Number] features Data point features array
   */
  function Datapoint(features) {
    _classCallCheck(this, Datapoint);

    this.features = features; // Data point features array
    this.classIndex = null; // Index of data point's class

    // "marked" status of data point. Can be used e.g. to indicate support vectors
    this.marked = false;
  }

  /**
   * Change the class index of this data point
   *
   * @param mixed classIndex New class index
   */


  _createClass(Datapoint, [{
    key: "setClassIndex",
    value: function setClassIndex(classIndex) {
      this.classIndex = classIndex;
    }

    /**
     * Get the class index of this data point
     *
     * @return mixed Class index
     */

  }, {
    key: "getClassIndex",
    value: function getClassIndex() {
      return this.classIndex;
    }

    /**
     * Change the "marked" status of this data point. Can be used for e.g. support vectors
     *
     * @param bool isMarked Whether the data point should be marked or not
     */

  }, {
    key: "setMarked",
    value: function setMarked(marked) {
      this.marked = marked;
    }

    /**
     * Check whether the data point is marked
     *
     * @return bool Whether the data point is marked
     */

  }, {
    key: "isMarked",
    value: function isMarked() {
      return this.marked;
    }
  }]);

  return Datapoint;
}();

exports.default = Datapoint;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Datapoint = function () {
  /**
   * Constructor
   *
   * @param jsml.UI.Canvas Canvas to which this datapoint element is bound
   * @param jsml.Dataset.Datapoint datapoint Datapoint model
   */
  function Datapoint(canvas, datapoint) {
    _classCallCheck(this, Datapoint);

    this.canvas = canvas;

    this.model = datapoint;
    this.radius = 0;
    this.steps = 0;
  }

  /**
   * Update information about this element from the model
   */


  _createClass(Datapoint, [{
    key: 'updateFromModel',
    value: function updateFromModel() {
      var _model$features = _slicedToArray(this.model.features, 2);

      this.x = _model$features[0];
      this.y = _model$features[1];

      this.color = this.canvas.getClassColor(this.model.classIndex);
      this.marked = this.model.isMarked();
    }

    /**
     * Update drawing properties of the model
     */

  }, {
    key: 'update',
    value: function update() {
      this.updateFromModel();

      // Update radius
      var progress = Math.min(this.steps / 20, 0.75);
      this.radius = Math.sin(progress * Math.PI) * 6;

      // Increase current step
      this.steps += 1;
    }

    /**
     * Draw the element on the canvas
     */

  }, {
    key: 'draw',
    value: function draw() {
      var context = this.canvas.canvas.context;

      // Calculate position of point

      var _canvas$convertFeatur = this.canvas.convertFeaturesToCanvasCoordinates(this.x, this.y),
          _canvas$convertFeatur2 = _slicedToArray(_canvas$convertFeatur, 2),
          pointCx = _canvas$convertFeatur2[0],
          pointCy = _canvas$convertFeatur2[1];

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
        context.strokeStyle = '#555'; // this.color;
        context.stroke();
      }
    }
  }]);

  return Datapoint;
}();

exports.default = Datapoint;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classification = __webpack_require__(13);

var _classification2 = _interopRequireDefault(_classification);

var _classifier = __webpack_require__(19);

var _classifier2 = _interopRequireDefault(_classifier);

var _data = __webpack_require__(23);

var _data2 = _interopRequireDefault(_data);

var _util = __webpack_require__(25);

var _util2 = _interopRequireDefault(_util);

var _math = __webpack_require__(27);

var _math2 = _interopRequireDefault(_math);

var _ui = __webpack_require__(28);

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Classification: _classification2.default,
  Classifier: _classifier2.default,
  Data: _data2.default,
  Util: _util2.default,
  Math: _math2.default,
  UI: _ui2.default
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boundaries = __webpack_require__(14);

var _boundaries2 = _interopRequireDefault(_boundaries);

var _gaussiankernel = __webpack_require__(18);

var _gaussiankernel2 = _interopRequireDefault(_gaussiankernel);

var _linearkernel = __webpack_require__(5);

var _linearkernel2 = _interopRequireDefault(_linearkernel);

var _kernel = __webpack_require__(3);

var _kernel2 = _interopRequireDefault(_kernel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Boundaries: _boundaries2.default,
  GaussianKernel: _gaussiankernel2.default,
  LinearKernel: _linearkernel2.default,
  Kernel: _kernel2.default
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // External dependencies


// Internal dependencies


var _marchingsquares = __webpack_require__(15);

var MarchingSquaresJS = _interopRequireWildcard(_marchingsquares);

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

var _arrays = __webpack_require__(1);

var _arrays2 = _interopRequireDefault(_arrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boundaries = function () {
  function Boundaries() {
    _classCallCheck(this, Boundaries);

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


  _createClass(Boundaries, [{
    key: 'calculateClassifierDecisionBoundaries',
    value: function calculateClassifierDecisionBoundaries(classifier, resolution) {
      var resolutionX = Array.isArray(resolution) ? resolution[0] : resolution;
      var resolutionY = Array.isArray(resolution) ? resolution[1] : resolution;

      // Generate features
      var features = this.generateFeaturesFromLinSpaceGrid(resolutionX, resolutionY, [-1, 1], [-1, 1]);

      // Predict labels for all grid points
      var predictions = classifier.predict(features);
      var predictionsGrid = _linalg2.default.reshape(predictions, [resolutionX, resolutionY]);

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

  }, {
    key: 'getFeatures',
    value: function getFeatures() {
      return this.features;
    }

    /**
     * Obtain the predictions list for the last decision boundaries calculation
     *
     * @return Array[mixed] List of predicted class labels
     */

  }, {
    key: 'getPredictions',
    value: function getPredictions() {
      return this.predictions;
    }

    /**
     * Obtain the grid of predictions for the last decision bundaries calculation
     *
     * @return Array[Array[mixed]]
     *   Predicted class labels for each grid point. m x n array for m rows, n columns
     */

  }, {
    key: 'getPredictionsGrid',
    value: function getPredictionsGrid() {
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

  }, {
    key: 'getGridDecisionBoundaries',
    value: function getGridDecisionBoundaries(grid) {
      // Get unique prediction values
      var levels = Array.from(new Set(_linalg2.default.flatten(grid)));

      // Contours per level
      var contours = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = levels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var level = _step.value;

          contours[level] = this.getGridLevelBoundaries(grid, level);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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

  }, {
    key: 'getGridLevelBoundaries',
    value: function getGridLevelBoundaries(grid, level) {
      // Create 1-vs-all grid grid for this level
      var gridLocal = [];

      for (var i = 0; i < grid.length; i += 1) {
        gridLocal.push([]);

        for (var j = 0; j < grid.length; j += 1) {
          gridLocal[i].push(grid[i][j] === level ? -2 : -1);
        }
      }

      // Check boundaries to see whether padding should be applied
      var pad = true;

      for (var _i = 0; _i < grid.length; _i += 1) {
        if (gridLocal[_i][0] === -1 || gridLocal[_i][grid.length - 1] === -1 || gridLocal[0][_i] === -1 || gridLocal[grid.length - 1][_i] === -1) {
          pad = false;
        }
      }

      if (pad) {
        // Add padding to the grid
        gridLocal = _linalg2.default.pad(gridLocal, [1, 1], [-1, -1]);
      }

      // Calculate contours
      var contours = MarchingSquaresJS.isoBands(gridLocal, -2, 0.5);

      // Reshape contours to fit square centered around 0. This has to be done because isoBands
      // assumes the x- and y-coordinates of the grid points are the array indices. The square is
      // roughly 2-by-2, but slightly larger to account for the outside boundaries formed because of
      // the "cliff" padding added earlier.
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = contours[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var contour = _step2.value;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = contour[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var contourPoint = _step3.value;

              if (pad) {
                contourPoint[0] = (contourPoint[0] - 1) / (gridLocal.length - 3) * 2 - 1;
                contourPoint[1] = (contourPoint[1] - 1) / (gridLocal[0].length - 3) * 2 - 1;
              } else {
                contourPoint[0] = contourPoint[0] / (gridLocal.length - 1) * 2 - 1;
                contourPoint[1] = contourPoint[1] / (gridLocal[0].length - 1) * 2 - 1;
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return contours;
    }
  }, {
    key: 'smoothContours',
    value: function smoothContours(contours) {
      var degree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

      var contoursSmoothed = JSON.parse(JSON.stringify(contours));

      contours.keys().foreach(function (level) {
        var levelContours = contours[level];
        var levelContoursSmoothed = JSON.parse(JSON.stringify(levelContours));

        for (var i = 0; i < levelContours.length; i += 1) {
          for (var j = 0; j < levelContours[i].length; j += 1) {
            if (Math.abs(levelContours[i][j][0]) >= 1 || Math.abs(levelContours[i][j][1]) >= 1) {
              continue;
            }

            var points = _arrays2.default.wrapSlice(levelContours[i], j - degree, j + degree);

            var half = (points.length - 1) / 2;
            var cutoff = 0;

            for (var k = 0; k < points.length; k += 1) {
              if (Math.abs(points[k][0]) >= 1 || Math.abs(points[k][1]) >= 1) {
                cutoff = Math.max(cutoff, half - Math.abs(k - half));
              }
            }

            if (cutoff > 0) {
              points = points.slice(cutoff, points.length + 1 - cutoff);
            }

            var pointsX = _linalg2.default.flatten(_linalg2.default.subBlock(points, [0, 0], [points.length, 1]));
            var pointsY = _linalg2.default.flatten(_linalg2.default.subBlock(points, [0, 1], [points.length, 1]));

            levelContoursSmoothed[i][j][0] = _linalg2.default.internalSum(pointsX) / pointsX.length;
            levelContoursSmoothed[i][j][1] = _linalg2.default.internalSum(pointsY) / pointsY.length;
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

  }, {
    key: 'generateFeaturesFromLinSpaceGrid',
    value: function generateFeaturesFromLinSpaceGrid(pointsX, pointsY, boundsX, boundsY) {
      // Generate vectors with linear spacing
      var linspaceX = _linalg2.default.linspace(boundsX[0], boundsX[1], pointsX);
      var linspaceY = _linalg2.default.linspace(boundsY[0], boundsY[1], pointsY);

      // Create mesh grid with coordinates for each point in the grid

      var _LinAlg$meshGrid = _linalg2.default.meshGrid(linspaceX, linspaceY),
          _LinAlg$meshGrid2 = _slicedToArray(_LinAlg$meshGrid, 2),
          gridX = _LinAlg$meshGrid2[0],
          gridY = _LinAlg$meshGrid2[1];

      // Generate corresponding vectors of coordinate components


      var gridXVec = _linalg2.default.flatten(gridX);
      var gridYVec = _linalg2.default.flatten(gridY);

      // Join coordinate components per data point, yielding the feature vector
      return _linalg2.default.concatenate(1, gridXVec, gridYVec);
    }
  }]);

  return Boundaries;
}();

exports.default = Boundaries;

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

var _kernel = __webpack_require__(3);

var _kernel2 = _interopRequireDefault(_kernel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


var GaussianKernel = function (_Kernel) {
  _inherits(GaussianKernel, _Kernel);

  function GaussianKernel() {
    var sigmaSquared = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;

    _classCallCheck(this, GaussianKernel);

    var _this = _possibleConstructorReturn(this, (GaussianKernel.__proto__ || Object.getPrototypeOf(GaussianKernel)).call(this));

    _this.sigmaSquared = sigmaSquared;
    return _this;
  }

  _createClass(GaussianKernel, [{
    key: 'apply',
    value: function apply(x, y) {
      // Gaussian
      var diff = _linalg2.default.sum(x, _linalg2.default.scale(y, -1));
      return Math.exp(-_linalg2.default.dot(diff, diff) / (2 * this.sigmaSquared));
    }
  }]);

  return GaussianKernel;
}(_kernel2.default);

exports.default = GaussianKernel;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _binaryclassifier = __webpack_require__(4);

var _binaryclassifier2 = _interopRequireDefault(_binaryclassifier);

var _binaryperceptron = __webpack_require__(6);

var _binaryperceptron2 = _interopRequireDefault(_binaryperceptron);

var _binarysvm = __webpack_require__(7);

var _binarysvm2 = _interopRequireDefault(_binarysvm);

var _classifier = __webpack_require__(2);

var _classifier2 = _interopRequireDefault(_classifier);

var _knn = __webpack_require__(20);

var _knn2 = _interopRequireDefault(_knn);

var _svm = __webpack_require__(21);

var _svm2 = _interopRequireDefault(_svm);

var _perceptron = __webpack_require__(22);

var _perceptron2 = _interopRequireDefault(_perceptron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  BinaryClassifier: _binaryclassifier2.default,
  BinaryPerceptron: _binaryperceptron2.default,
  BinarySVM: _binarysvm2.default,
  Classifier: _classifier2.default,
  KNN: _knn2.default,
  SVM: _svm2.default,
  Perceptron: _perceptron2.default
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classifier = __webpack_require__(2);

var _classifier2 = _interopRequireDefault(_classifier);

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

var _arrays = __webpack_require__(1);

var _arrays2 = _interopRequireDefault(_arrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


/**
 * k-nearest neighbours learner. Classifies points based on the (possibly weighted) vote
 * of its k nearest neighbours (euclidian distance)
 */
var KNN = function (_Classifier) {
  _inherits(KNN, _Classifier);

  function KNN() {
    var numNeighbours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

    _classCallCheck(this, KNN);

    /**
     * Object to store training data
     *
     * @var dict
     */
    var _this = _possibleConstructorReturn(this, (KNN.__proto__ || Object.getPrototypeOf(KNN)).call(this));

    _this.training = {
      features: [],
      labels: []
    };

    /**
     * Number of nearest neighbours to consider for the majority vote
     *
     * @var int
     */
    _this.numNeighbours = numNeighbours;
    return _this;
  }

  /**
   * Train the KNN algorithm on a dataset
   *
   * @param Array[Array[Number]] features Features per data point
   * @param Array[mixed] labels Class labels per data point
   */


  _createClass(KNN, [{
    key: 'train',
    value: function train(features, labels) {
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

  }, {
    key: 'predict',
    value: function predict(features) {
      var _this2 = this;

      if (this.training.features.length === 0) {
        throw new Error('Model has to be trained in order to make predictions.');
      }

      if (features[0].length !== this.training.features[0].length) {
        throw new Error('Number of features of test data should match number of features of training data.');
      }

      // Make prediction for each data point
      var predictions = features.map(function (x) {
        return _this2.predictSample(x);
      });

      return predictions;
    }

    /**
     * Make a prediction for a single sample
     *
     * @param Array[mixed] Data point features
     * @return mixed Prediction. Label of class with highest prevalence among k nearest neighbours
     */

  }, {
    key: 'predictSample',
    value: function predictSample(sampleFeatures) {
      var _this3 = this;

      // Calculate distances to all other data points
      var distances = _arrays2.default.zipWithIndex(this.training.features.map(function (x) {
        return _linalg2.default.norm(_linalg2.default.sum(sampleFeatures, _linalg2.default.scale(x, -1)));
      }));

      // Sort training data points based on distance
      distances.sort(function (a, b) {
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
      });

      // Number of nearest neighbours to consider
      var k = Math.min(this.numNeighbours, distances.length);

      // Take top k distances
      var distancesTopKClasses = distances.slice(0, k).map(function (x) {
        return _this3.training.labels[x[1]];
      });

      // Count the number of neighbours per class
      var votes = _arrays2.default.valueCounts(distancesTopKClasses);

      // Get class index with highest number of votes
      var highest = -1;
      var highestLabel = -1;

      votes.forEach(function (vote) {
        if (vote[1] > highest) {
          highest = vote[1];
          highestLabel = vote[0];
        }
      });

      return highestLabel;
    }
  }]);

  return KNN;
}(_classifier2.default);

exports.default = KNN;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _onevsall = __webpack_require__(9);

var _onevsall2 = _interopRequireDefault(_onevsall);

var _binarysvm = __webpack_require__(7);

var _binarysvm2 = _interopRequireDefault(_binarysvm);

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

var _arrays = __webpack_require__(1);

var _arrays2 = _interopRequireDefault(_arrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification
 */
var SVM = function (_OneVsAll) {
  _inherits(SVM, _OneVsAll);

  /**
   * Constructor
   *
   * @see BinarySVM.constructor()
   *
   * @param dict optionsUser User-defined options for SVM. Options are passed to created BinarySVM
   *   objects. See BinarySVM.constructor() for more details
   */
  function SVM() {
    var optionsUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SVM);

    /**
     * Object to store training data
     *
     * @var dict
     */
    var _this = _possibleConstructorReturn(this, (SVM.__proto__ || Object.getPrototypeOf(SVM)).call(this));

    _this.training = {
      features: [],
      labels: []
    };

    /**
     * List of classifiers. One classifier per class label/index
     *
     * @var Array
     */
    _this.classifiers = [];

    /**
     * Number of errors per iteration. Only used if accuracy tracking is enabled
     *
     * @var bool
     */
    _this.numErrors = null;

    // Set options
    _this.optionsUser = optionsUser;
    return _this;
  }

  /**
   * @see OneVsAll.createClassifier()
   */


  _createClass(SVM, [{
    key: 'createClassifier',
    value: function createClassifier(classIndex) {
      var useClassIndices = this.training.labels.map(function (x) {
        return x === classIndex ? 1 : 0;
      });

      var classifier = new _binarysvm2.default(this.optionsUser);
      classifier.loadTrainingData(this.training.features, useClassIndices, 1);

      return classifier;
    }

    /**
     * Train the multiclass SVM algorithm on a dataset
     *
     * @param Array[Array[Number]] features Features per data point
     * @param Array[mixed] labels Class labels per data point
     */

  }, {
    key: 'train',
    value: function train(features, labels) {
      _get(SVM.prototype.__proto__ || Object.getPrototypeOf(SVM.prototype), 'train', this).call(this, features, labels);

      this.trainBatch();
    }
  }]);

  return SVM;
}(_onevsall2.default);

exports.default = SVM;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _onevsall = __webpack_require__(9);

var _onevsall2 = _interopRequireDefault(_onevsall);

var _binaryperceptron = __webpack_require__(6);

var _binaryperceptron2 = _interopRequireDefault(_binaryperceptron);

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

var _arrays = __webpack_require__(1);

var _arrays2 = _interopRequireDefault(_arrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Internal dependencies


/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification
 */
var Perceptron = function (_OneVsAll) {
  _inherits(Perceptron, _OneVsAll);

  /**
   * Constructor
   *
   * @param dict optionsUser User-defined options for perceptron
   */
  function Perceptron() {
    var optionsUser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Perceptron);

    /**
     * Object to store training data
     *
     * @var dict
     */
    var _this = _possibleConstructorReturn(this, (Perceptron.__proto__ || Object.getPrototypeOf(Perceptron)).call(this));

    _this.training = {
      features: [],
      labels: []
    };

    /**
     * List of classifiers. One classifier per class label/index
     *
     * @var Array
     */
    _this.classifiers = [];

    /**
     * Number of errors per iteration. Only used if accuracy tracking is enabled
     *
     * @var bool
     */
    _this.numErrors = null;

    // Parse options
    var optionsDefault = {
      // Whether the number of misclassified samples should be tracked at each iteration
      trackAccuracy: true
    };

    var options = Object.assign({}, optionsDefault, optionsUser);

    // Set options
    _this.trackAccuracy = options.trackAccuracy;

    // Accuracy tracking
    if (_this.trackAccuracy) {
      _this.addListener('iterationCompleted', function () {
        return _this.calculateIntermediateAccuracy();
      });
    }
    return _this;
  }

  /**
   * @see OneVsAll.createClassifier()
   */


  _createClass(Perceptron, [{
    key: 'createClassifier',
    value: function createClassifier(classIndex) {
      var useClassIndices = this.training.labels.map(function (x) {
        return x === classIndex ? 1 : 0;
      });

      var classifier = new _binaryperceptron2.default();
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

  }, {
    key: 'train',
    value: function train(features, labels) {
      _get(Perceptron.prototype.__proto__ || Object.getPrototypeOf(Perceptron.prototype), 'train', this).call(this, features, labels);

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

  }, {
    key: 'calculateIntermediateAccuracy',
    value: function calculateIntermediateAccuracy() {
      var _this2 = this;

      // Track number of errors
      var predictions = this.predict(this.training.features);
      this.numErrors.push(predictions.reduce(function (r, x, i) {
        return r + (x !== _this2.training.labels[i]);
      }, 0));
    }
  }]);

  return Perceptron;
}(_onevsall2.default);

exports.default = Perceptron;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _datapoint = __webpack_require__(10);

var _datapoint2 = _interopRequireDefault(_datapoint);

var _dataset = __webpack_require__(24);

var _dataset2 = _interopRequireDefault(_dataset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Datapoint: _datapoint2.default,
  Dataset: _dataset2.default
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Internal dependencies


var _datapoint = __webpack_require__(10);

var _datapoint2 = _interopRequireDefault(_datapoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dataset = function () {
  function Dataset() {
    _classCallCheck(this, Dataset);

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


  _createClass(Dataset, [{
    key: 'addDatapoint',
    value: function addDatapoint(features) {
      // Set the dimensionality of the data if this is the first data point
      if (this.numDatapoints === 0) {
        this.numDimensions = features.length;
      }

      // Construct data point
      var datapoint = new _datapoint2.default(features);

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

  }, {
    key: 'isValidDataPoint',
    value: function isValidDataPoint(datapoint) {
      return Array.isArray(datapoint.features) && datapoint.features.length === this.numDimensions;
    }

    /**
     * Get all data points from this dataset
     *
     * @return Array Data points. Array of datapoint objects
     */

  }, {
    key: 'getDataPoints',
    value: function getDataPoints() {
      return this.datapoints;
    }

    /**
     * Get the number of data points in this dataset
     *
     * @return int Number of data points
     */

  }, {
    key: 'numDataPoints',
    value: function numDataPoints() {
      return this.datapoints.length;
    }

    /**
     * Get the number of dimensions for the features of data points
     *
     * @return int Dimensionality
     */

  }, {
    key: 'getNumDimensions',
    value: function getNumDimensions() {
      return this.numDimensions;
    }

    /**
     * Extract the features from the datapoints and return them in an n x d array, where `n` is the
     * number of data points and `d` is the number of dimensions (number of features per datapoint).
     *
     * @return Array[Array[Number]] Features matrix
     */

  }, {
    key: 'getFeaturesArray',
    value: function getFeaturesArray() {
      return this.datapoints.map(function (x) {
        return x.features;
      });
    }

    /**
     * Extract the labels from the datapoints and return them in an array.
     *
     * @return Array[mixed] Labels array
     */

  }, {
    key: 'getLabelsArray',
    value: function getLabelsArray() {
      return this.datapoints.map(function (x) {
        return x.classIndex;
      });
    }
  }]);

  return Dataset;
}();

exports.default = Dataset;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inputdevices = __webpack_require__(26);

var _inputdevices2 = _interopRequireDefault(_inputdevices);

var _random = __webpack_require__(8);

var _random2 = _interopRequireDefault(_random);

var _arrays = __webpack_require__(1);

var _arrays2 = _interopRequireDefault(_arrays);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  InputDevices: _inputdevices2.default,
  Random: _random2.default,
  Arrays: _arrays2.default
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Get touch coordinate (x or y) from touchpad input
 *
 * @param object e Event
 * @param string coordinate Coordinate ("x" or "y", case insensitive)
 */
function getTouchCoordinate(e, coordinate) {
  var coordinateUc = coordinate.toUpperCase();

  return (/touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]["page" + coordinateUc] : e["page" + coordinateUc]
  );
}

exports.default = {
  getTouchCoordinate: getTouchCoordinate
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _linalg = __webpack_require__(0);

var _linalg2 = _interopRequireDefault(_linalg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  LinAlg: _linalg2.default
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _canvas = __webpack_require__(29);

var _canvas2 = _interopRequireDefault(_canvas);

var _datapoint = __webpack_require__(11);

var _datapoint2 = _interopRequireDefault(_datapoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Canvas: _canvas2.default,
  Datapoint: _datapoint2.default
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Standard dependencies


// Internal dependencies


var _jquery = __webpack_require__(30);

var _jquery2 = _interopRequireDefault(_jquery);

var _datapoint = __webpack_require__(11);

var _datapoint2 = _interopRequireDefault(_datapoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * UI canvas for displaying machine learning results
 *
 * Listeners:
 *  This class supports event listeners, meaning that the outside world can bind functions to events
 *  triggered explicitly by this class. Listeners can be added using `addListener` and removed by
 * `removeListener`. The `emit` method is not intended for use by the outside world, and is used by
 *  this class to emit an event to the listeners bound to it.
 */
var Canvas = function () {
  function Canvas(el, options) {
    var _this = this;

    _classCallCheck(this, Canvas);

    // Settings for canvas
    this.canvas = {
      element: el,
      context: el.getContext('2d')
    };

    window.addEventListener('resize', function () {
      return _this.resize();
    });
    this.resize();

    // User-defined options
    this.options = _extends({
      continuousClick: false,
      continuousClickInterval: 50
    }, options);

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

    // Animation
    window.requestAnimationFrame(function () {
      return _this.refresh();
    });

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


  _createClass(Canvas, [{
    key: 'addListener',
    value: function addListener(label, callback) {
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

  }, {
    key: 'removeListener',
    value: function removeListener(label, callback) {
      var listeners = this.listeners.get(label);

      if (listeners) {
        this.listeners.set(label, listeners.filter(function (x) {
          return !(typeof x === 'function' && x === callback);
        }));
      }
    }

    /**
     * Emit an event, which triggers the listener callback functions bound to it
     *
     * @param label Event
     * @param ...args Remaining arguments contain arguments that should be passed to the
     *                callback functions
     */

  }, {
    key: 'emit',
    value: function emit(label) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this.listeners.get(label);

      if (listeners) {
        listeners.forEach(function (listener) {
          listener.apply(undefined, args);
        });
        return true;
      }

      return false;
    }

    /**
     * Add a data point element to the canvas, using a dataset datapoint as its model
     *
     * @param jsml.Dataset.Datapoint datapoint Dataset datapoint (model)
     */

  }, {
    key: 'addDatapoint',
    value: function addDatapoint(datapoint) {
      this.elements.push(new _datapoint2.default(this, datapoint));
    }

    /**
     * Handle mouse events on the canvas, e.g. for adding data points
     */

  }, {
    key: 'handleMouseEvents',
    value: function handleMouseEvents() {
      var _this2 = this;

      if (this.options.continuousClick) {
        this.mouseStatus = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        this.canvas.element.addEventListener('mousedown', function () {
          _this2.mouseStatus = 1;
          _this2.continuousClickIntervalId = setInterval(function () {
            return _this2.click();
          }, _this2.options.continuousClickInterval);
        });

        document.addEventListener('mouseup', function () {
          _this2.mouseStatus = 0;
          clearInterval(_this2.continuousClickIntervalId);
        });

        document.addEventListener('mousemove', function (e) {
          _this2.mouseX = e.pageX;
          _this2.mouseY = e.pageY;
        });
      }

      this.canvas.element.addEventListener('mousedown', function (e) {
        _this2.click(e.pageX, e.pageY);
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

  }, {
    key: 'click',
    value: function click() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      var clickX = x;
      var clickY = y;

      if (x === -1) {
        clickX = this.mouseX;
        clickY = this.mouseY;
      }

      // Calculate normalized coordinates with origin in canvas center

      var _convertCanvasCoordin = this.convertCanvasCoordinatesToFeatures(clickX, clickY),
          _convertCanvasCoordin2 = _slicedToArray(_convertCanvasCoordin, 2),
          px = _convertCanvasCoordin2[0],
          py = _convertCanvasCoordin2[1];

      this.emit('click', px, py);
    }

    /**
     * Clear the canvas
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Handle the canvas size for different device pixel ratios and on window resizes
     */

  }, {
    key: 'resize',
    value: function resize() {
      this.canvas.element.style.width = '100%';
      this.canvas.element.style.height = '100%';
      this.canvas.element.width = this.canvas.element.offsetWidth * window.devicePixelRatio;
      this.canvas.element.height = this.canvas.element.offsetHeight * window.devicePixelRatio;
      this.canvas.width = this.canvas.element.offsetWidth;
      this.canvas.height = this.canvas.element.offsetHeight;
      this.canvas.context.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }, {
    key: 'redraw',
    value: function redraw() {
      var _this3 = this;

      // Clear canvas
      this.clear();

      // Basic canvas elements
      this.drawGrid();
      this.drawAxes();

      // Draw dynamic canvas elements
      this.elements.forEach(function (element) {
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
      window.requestAnimationFrame(function () {
        return _this3.refresh();
      });
    }

    /**
     * Refresh (i.e. redraw) everything on the canvas
     */

  }, {
    key: 'refresh',
    value: function refresh() {
      // Dynamic canvas elements
      this.elements.forEach(function (element) {
        element.update();
      });

      this.redraw();
    }
  }, {
    key: 'setWeightVector',
    value: function setWeightVector(weights) {
      this.weights = weights;
    }

    /**
     * Set the class boundaries used for drawing the decision regions on the canvas
     *
     * @param Map[string => Array[Array[Number]]] Class boundaries per class label
     */

  }, {
    key: 'setClassBoundaries',
    value: function setClassBoundaries(classesBoundaries) {
      this.classesBoundaries = classesBoundaries;
    }
  }, {
    key: 'drawWeightVector',
    value: function drawWeightVector(weights) {
      if (weights) {
        var fromX = void 0;
        var fromY = void 0;
        var toX = void 0;
        var toY = void 0;

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

        var canvas = this.canvas;
        var context = canvas.context;

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

  }, {
    key: 'convertCanvasCoordinatesToFeatures',
    value: function convertCanvasCoordinatesToFeatures(x, y) {
      // Properties used for calculating mouse position
      var el = this.canvas.element;
      var rect = el.getBoundingClientRect();
      var win = el.ownerDocument.defaultView;

      // Mouse x- and y-position on [0,1] interval
      var f1 = (x - rect.left + win.pageXOffset) / this.canvas.width;
      var f2 = (y - rect.top + win.pageYOffset) / this.canvas.height;

      // Convert to [-1,1] interval
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

  }, {
    key: 'convertFeaturesToCanvasCoordinates',
    value: function convertFeaturesToCanvasCoordinates(x0, x1) {
      var x = (x0 + 1) / 2 * this.canvas.width;
      var y = -(x1 - 1) / 2 * this.canvas.height;

      return [x, y];
    }

    /**
     * Draw a grid on the canvas
     */

  }, {
    key: 'drawGrid',
    value: function drawGrid() {
      var canvas = this.canvas;
      var context = canvas.context;

      // Loop over all line offsets
      for (var i = 1; i < 10; i += 1) {
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

  }, {
    key: 'drawAxes',
    value: function drawAxes() {
      var canvas = this.canvas;
      var context = canvas.context;

      // Origin coordinates

      var _convertFeaturesToCan = this.convertFeaturesToCanvasCoordinates(0, 0),
          _convertFeaturesToCan2 = _slicedToArray(_convertFeaturesToCan, 2),
          originX = _convertFeaturesToCan2[0],
          originY = _convertFeaturesToCan2[1];

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

  }, {
    key: 'drawClassBoundaries',
    value: function drawClassBoundaries() {
      var _this4 = this;

      var context = this.canvas.context;

      Object.keys(this.classesBoundaries).forEach(function (classLabel) {
        var classBoundaries = _this4.classesBoundaries[classLabel];

        // The path delineates the decision region for this class
        context.beginPath();

        classBoundaries.forEach(function (classBoundary) {
          var firstpoint = true;

          classBoundary.forEach(function (boundaryPoint) {
            var _convertFeaturesToCan3 = _this4.convertFeaturesToCanvasCoordinates(boundaryPoint[0], boundaryPoint[1]),
                _convertFeaturesToCan4 = _slicedToArray(_convertFeaturesToCan3, 2),
                xx = _convertFeaturesToCan4[0],
                yy = _convertFeaturesToCan4[1];

            if (firstpoint) {
              firstpoint = false;
              context.moveTo(xx, yy);
            } else {
              context.lineTo(xx, yy);
            }

            if (Math.abs(boundaryPoint[0]) !== 1 && Math.abs(boundaryPoint[1]) !== 1) {
              context.fillStyle = _this4.getClassColor(classLabel);
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
        context.fillStyle = _this4.getClassColor(classLabel);
        context.strokeStyle = _this4.getClassColor(classLabel);
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

  }, {
    key: 'getClassColor',
    value: function getClassColor(classIndex) {
      var colors = this.getColors();
      return colors[Object.keys(colors)[parseInt(classIndex, 10)]];
    }

    /**
     * Get available drawing colors
     *
     * @return Array[string] Colors in HEX with '#' prefix; array keys are color names.
     */

  }, {
    key: 'getColors',
    value: function getColors() {
      return {
        blue: '#5DA5DA',
        orange: '#FAA43A',
        green: '#60BD68',
        pink: '#F17CB0',
        brown: '#B2912F',
        purple: '#B276B2',
        yellow: '#DECF3F',
        red: '#F15854',
        gray: '#4D4D4D'
      };
    }
  }]);

  return Canvas;
}();

exports.default = Canvas;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.2.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2017-03-20T18:59Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.2.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( ">tbody", elem )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with computed style
	var valueIsBorderBox,
		styles = getStyles( elem ),
		val = curCSS( elem, name, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Computed unit is not pixels. Stop here and return.
	if ( rnumnonpx.test( val ) ) {
		return val;
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = isBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ name ] );

	// Fall back to offsetWidth/Height when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	if ( val === "auto" ) {
		val = elem[ "offset" + name[ 0 ].toUpperCase() + name.slice( 1 ) ];
	}

	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var doc, docElem, rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		doc = elem.ownerDocument;
		docElem = doc.documentElement;
		win = doc.defaultView;

		return {
			top: rect.top + win.pageYOffset - docElem.clientTop,
			left: rect.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( jQuery.isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
		return jQuery;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ })
/******/ ]);