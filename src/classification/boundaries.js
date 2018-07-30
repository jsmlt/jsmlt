// External dependencies
import * as MarchingSquaresJS from 'marchingsquares';

// Internal dependencies
import * as Arrays from '../arrays';

/**
 * The decision boundary module calculates decision boundaries for a trained classifier on a
 * 2-dimensional grid of points. It works by taking a classifier, predicting the output label for
 * many points on a 2-D grid, and using the [Marching Squares](https://www.npmjs.com/package/marchingsquares)
 * algorithm to calculate the decision boundaries.
 *
 * @example <caption>Calculating the decision boundaries for a classifier</caption>
 * var Boundaries = new Boundaries();
 *
 * var classIndexBoundaries = boundaries.calculateClassifierDecisionBoundaries(
 *   classifier, // The classifier you've trained
 *   51, // Number of points on the x- and y-axis (so 51 x 51 = 2,601 points in total)
 * );
 *
 * // Depending on the classifier used, the output will look something like this:
 * {
 *   "0":[               // Decision boundaries for class 0
 *     [                 // First (and only, as binary classification) decision boundary or class 0
 *       [-0.22, -0.96], // Point 1 of decision boundary
 *       [-0.22, -1.00], // Point 2 of decision boundary
 *       // <...23 more elements...>
 *       [-0.24, -0.92],
 *       [-0.26, -0.96]
 *     ]
 *   ],
 *   "1":[               // Decision boundaries for class 1
 *     [                 // First (and only, as binary classification) decision boundary or class 1
 *       [-0.22, -1.00], // Point 1 of decision boundary
 *       [-0.22, -0.96], // Point 2 of decision boundary
 *       // <...82 more elements...>
 *       [-0.20, -1.00],
 *       [-0.22, -1.00]
 *     ]
 *   ]
 * }
 */
export default class Boundaries {
  /**
   * Constructor. Initializes boundary object properties.
   */
  constructor() {
    /**
     * Feature list of the grid points. n-by-2 array, where each row consists of the x- and
     * y-coordinates of a point on the grid.
     *
     * @type {Array.<Array.<number>>}
     */
    this.features = null;

    /**
     * List of classifier predictions for each grid point. The nth prediction is the prediction for
     * the nth point in the `features` property. n-dimensional array.
     *
     * @type {Array.<mixed>}
     */
    this.predictions = null;

    /**
     * Grid of classifier predictions for each grid point. m-by-n array, where the array element at
     * index (j, i) contains the prediction for the grid point at x-index i and y-index j. This is
     * simply a 2-dimensional version of the `predictions` property
     *
     * @type {Array.<Array.<mixed>>}
     */
    this.predictionsGrid = null;
  }

  /**
   * Determine decision boundaries for a specific classifier.
   *
   * @param {jsmlt.Supervised.Classifier} classifier - Classifier for which to generate the
   *   decision boundaries
   * @param {Array.<number>|number} resolution - Number of points on the x-axis and on the y-axis.
   *   Use integer for the same resolution on the x- and y-axis, and a 2-dimensional array to
   *   specify resolutions per axis
   * @param {Array.<number>} [gridCoordinates = [-1, -1, 1, 1]] - 4-dimensional array containing,
   *   in order, the x1, y1, x2, and y2-coordinates of the grid
   * @return {Object.<string, Array.<Array.<Array.<number>>>>} The returned object contains the
   *   boundaries per level (class label). Each boundary then consists of some coordinates (forming
   *   a path), and each coordinate is a 2-dimensional array where the first entry is the
   *   x-coordinate and the second entry is the y-coordinate
   */
  calculateClassifierDecisionBoundaries(classifier, resolution, gridCoordinates = [-1, -1, 1, 1]) {
    const resolutionX = Array.isArray(resolution) ? resolution[0] : resolution;
    const resolutionY = Array.isArray(resolution) ? resolution[1] : resolution;

    // Generate features
    const features = this.generateFeaturesFromLinSpaceGrid(
      resolutionX,
      resolutionY,
      [gridCoordinates[0], gridCoordinates[2]],
      [gridCoordinates[1], gridCoordinates[3]]
    );

    // Predict labels for all grid points
    const predictions = classifier.predict(features);
    const predictionsGrid = Arrays.reshape(predictions, [resolutionX, resolutionY]);

    // Determine decision boundaries for grid
    this.features = features;
    this.predictions = predictions;
    this.predictionsGrid = predictionsGrid;

    return this.getGridDecisionBoundaries(predictionsGrid);
  }

  /**
   * Obtain the features list corresponding with the grid coordinates of the last decision
   * boundaries calculation
   *
   * @return {Array.<Array.<number>>} Features for all data points (2-dimensional)
   */
  getFeatures() {
    return this.features;
  }

  /**
   * Obtain the predictions list for the last decision boundaries calculation
   *
   * @return {Array.<number>} List of predicted class labels
   */
  getPredictions() {
    return this.predictions;
  }

  /**
   * Obtain the grid of predictions for the last decision bundaries calculation
   *
   * @return {Array.<Array.<number>>} Predicted class labels for each grid point. m-by-n array for m
   *   rows, n columns
   */
  getPredictionsGrid() {
    return this.predictionsGrid;
  }

  /**
   * Determine the decision boundaries for a grid of class predictions
   *
   * @param {Array.<Array.<mixed>>} grid - Grid of predictions, an array of row arrays, where each
   *   row array contains the predictions for the cells in that row. For an m x n prediction grid,
   *   each of the m entries of `grid` should have n entries
   * @return {Object.<string, Array.<Array.<Array.<number>>>>} The returned object contains the
   *   boundaries per level (class label). Each boundary then consists of some coordinates (forming
   *   a path), and each coordinate is a 2-dimensional array where the first entry is the
   *   x-coordinate and the second entry is the y-coordinate
   */
  getGridDecisionBoundaries(grid) {
    // Get unique prediction values
    const levels = Arrays.unique(Arrays.flatten(grid));

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
   * @param {Array.<Array.<number>>} grid - See this.getGridDecisionBoundaries@param:grid
   * @param {string} level - Level (class label) to calculate boundaries for
   * @return {Array.<Array.<Array.<number>>>} Boundaries for this level (class label). See
   *   this.getGridDecisionBoundaries@return
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
      gridLocal = Arrays.pad(gridLocal, [1, 1], [-1, -1]);
    }

    // Calculate contours
    const contours = MarchingSquaresJS.isoBands(gridLocal, -2, 0.5);

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

  /**
   * Generate a list of features from a grid of points with linear spacing
   *
   * @param {number} pointsX - Number of points on the x-axis
   * @param {number} pointsY - Number of points on the y-axis
   * @param {Array.<number>} boundsX - 2-dimensional array of left and right bound on the points on
   *   the x-axis
   * @param {Array.<number>} boundsY - 2-dimensional array of left and right bound on the points on
   *   the y-axis
   * @return {Array.Array<number>} (pointsX * pointsY)-by-2 array, containing the coordinates
   *   of all grid points
   */
  generateFeaturesFromLinSpaceGrid(pointsX, pointsY, boundsX, boundsY) {
    // Generate vectors with linear spacing
    const linspaceX = Arrays.linspace(boundsX[0], boundsX[1], pointsX);
    const linspaceY = Arrays.linspace(boundsY[0], boundsY[1], pointsY);

    // Create mesh grid with coordinates for each point in the grid
    const [gridX, gridY] = Arrays.meshGrid(linspaceX, linspaceY);

    // Generate corresponding vectors of coordinate components
    const gridXVec = Arrays.flatten(gridX);
    const gridYVec = Arrays.flatten(gridY);

    // Join coordinate components per data point, yielding the feature vector
    return Arrays.concatenate(1, gridXVec, gridYVec);
  }
}
