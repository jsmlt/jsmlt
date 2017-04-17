import LinAlg from '../math/linalg';
import Arrays from '../util/arrays';

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
    const predictionsGrid = LinAlg.reshape(predictions, [resolutionX, resolutionY]);

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
    const levels = Array.from(new Set(LinAlg.flatten(grid)));

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
      gridLocal = LinAlg.pad(gridLocal, [1, 1], [-1, -1]);
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

          let points = Arrays.wrapSlice(levelContours[i], j - degree, j + degree);

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

          const pointsX = LinAlg.flatten(LinAlg.subBlock(points, [0, 0], [points.length, 1]));
          const pointsY = LinAlg.flatten(LinAlg.subBlock(points, [0, 1], [points.length, 1]));

          levelContoursSmoothed[i][j][0] = LinAlg.internalSum(pointsX) / pointsX.length;
          levelContoursSmoothed[i][j][1] = LinAlg.internalSum(pointsY) / pointsY.length;
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
    const linspaceX = LinAlg.linspace(boundsX[0], boundsX[1], pointsX);
    const linspaceY = LinAlg.linspace(boundsY[0], boundsY[1], pointsY);

    // Create mesh grid with coordinates for each point in the grid
    const [gridX, gridY] = LinAlg.meshGrid(linspaceX, linspaceY);

    // Generate corresponding vectors of coordinate components
    const gridXVec = LinAlg.flatten(gridX);
    const gridYVec = LinAlg.flatten(gridY);

    // Join coordinate components per data point, yielding the feature vector
    return LinAlg.concatenate(1, gridXVec, gridYVec);
  }

}

export default Boundaries;
