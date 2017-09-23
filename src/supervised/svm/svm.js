// Internal dependencies
import { OneVsAllClassifier, Classifier } from '../base';
import LinAlg from '../../math/linalg';
import Arrays from '../../util/arrays';
import Random from '../../util/random';
import LinearKernel from '../../kernel/linear';

/**
 * SVM learner for binary classification problem
 */
export class BinarySVM extends Classifier {
  /**
   * Constructor
   *
   * @param dict optionsUser User-defined options for SVM. See method implementation for details
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      // Regularization (i.e. penalty for slack variables)
      C: 100.0,

      // Kernel. Defaults to null (which is checked to instantiate the linear kernel)
      kernel: null,

      // Number of passes without alphas changing to treat the algorithm as converged
      convergenceNumPasses: 10,

      // Numerical tolerance for a value in the to be equal to another SMO algorithm to be equal to
      // another value
      numericalTolerance: 1e-6,

      // Whether to cache calculated kernel values for training sample pairs
      useKernelCache: true,
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    // Set options
    this.C = options.C;
    this.kernel = options.kernel === null ? new LinearKernel() : options.kernel;
    this.convergenceNumPasses = options.convergenceNumPasses;
    this.numericalTolerance = options.numericalTolerance;
    this.useKernelCache = options.useKernelCache;

    // Set properties
    this.isTraining = false;
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
   * @see jsmlt.supervised.base.Classifier::train()
   */
  train(X, y) {
    // Mark that the SVM is currently in the training procedure
    this.isTraining = true;

    // Number of training samples
    const numSamples = X.length;

    // Alphas (Lagrange multipliers)
    this.alphas = LinAlg.zeroVector(numSamples);

    // Bias term
    this.b = 0.0;

    // Kernel cache
    this.kernelCache = LinAlg.full([numSamples, numSamples], 0.0);
    this.kernelCacheStatus = LinAlg.full([numSamples, numSamples], false);

    // Number of passes of the algorithm without any alphas changing
    let numPasses = 0;

    // Shorthand notation for features and labels
    this.training = { X, y };
    const ySigns = y.map(x => this.getClassIndexSign(x));

    while (numPasses < this.convergenceNumPasses) {
      let alphasChanged = 0;

      // Loop over all training samples
      for (let i = 0; i < numSamples; i += 1) {
        // Calculate offset to the 1-margin of sample i
        const ei = this.sampleMargin(i) - ySigns[i];

        // Check whether the KKT constraints were violated
        if ((ySigns[i] * ei < -this.numericalTolerance && this.alphas[i] < this.C)
          || (ySigns[i] * ei > this.numericalTolerance && this.alphas[i] > 0)) {
          /* Now, we need to update \alpha_i as it violates the KKT constraints */

          // Thus, we pick a random \alpha_j such that j does not equal i
          let j = Random.randint(0, numSamples - 1);
          if (j >= i) j += 1;

          // Calculate offset to the 1-margin of sample j
          const ej = this.sampleMargin(j) - ySigns[j];

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
          let newAlphaJ = oldAlphaJ - ySigns[j] * (ei - ej) / eta;
          newAlphaJ = Math.min(newAlphaJ, boundH);
          newAlphaJ = Math.max(newAlphaJ, boundL);

          // Don't update if the difference is too small
          if (Math.abs(newAlphaJ - oldAlphaJ) < this.numericalTolerance) {
            continue;
          }

          // Compute new \alpha_i
          const oldAlphaI = this.alphas[i];
          const newAlphaI = oldAlphaI + ySigns[i] * ySigns[j] * (oldAlphaJ - newAlphaJ);

          // Update \alpha_j and \alpha_i
          this.alphas[j] = newAlphaJ;
          this.alphas[i] = newAlphaI;

          // Update the bias term, interpolating between the bias terms for \alpha_i and \alpha_j
          const b1 = this.b - ei - ySigns[i] * (newAlphaI - oldAlphaI) * Kii
                       - ySigns[j] * (newAlphaJ - oldAlphaJ) * Kij;
          const b2 = this.b - ej - ySigns[i] * (newAlphaI - oldAlphaI) * Kij
                       - ySigns[j] * (newAlphaJ - oldAlphaJ) * Kjj;

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

    // Store indices of support vectors (where alpha > 0, or, in this case, where alpha is greater
    // than some numerical tolerance)
    this.supportVectors = Arrays
      .zipWithIndex(this.alphas)
      .filter(x => x[0] > 1e-6)
      .map(x => x[1]);

    // Mark that training has completed
    this.isTraining = false;
  }

  /**
   * Calculate the margin (distance to the decision boundary) for a single sample
   *
   * @param Array[Number]|int sample Sample features array or training sample index
   * @return double Distance to decision boundary
   */
  sampleMargin(sample) {
    let rval = this.b;

    if (this.isTraining) {
      // If we're in the training phase, we have to loop over all elements
      for (let i = 0; i < this.training.X.length; i += 1) {
        const k = this.applyKernel(sample, i);
        rval += this.getClassIndexSign(this.training.y[i]) * this.alphas[i] * k;
      }
    } else {
      // If training is done, we only loop over the support vectors
      for (const sv of this.supportVectors) {
        const k = this.applyKernel(sample, this.training.X[sv]);
        rval += this.getClassIndexSign(this.training.y[sv]) * this.alphas[sv] * k;
      }
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
    const fromCache = (this.useKernelCache && typeof x === 'number' && typeof y === 'number');

    if (fromCache && this.kernelCacheStatus[x][y] === true) {
      return this.kernelCache[x][y];
    }

    const xf = (typeof x === 'number') ? this.training.X[x] : x;
    const yf = (typeof y === 'number') ? this.training.X[y] : y;
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

    if (this.training.y[i] === this.training.y[j]) {
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
        output = this.getSignClassIndex(output > 0 ? 1 : -1);
      }

      return output;
    });
  }
}

/**
 * Perceptron learner for 2 or more classes. Uses 1-vs-all classification
 */
class SVM extends OneVsAllClassifier {
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
  createClassifier() {
    return new BinarySVM(this.optionsUser);
  }

  /**
   */
  train(X, y) {
    this.training = { X, y };

    this.createClassifiers(y);
    this.trainBatch(X, y);
  }
}

export default SVM;
