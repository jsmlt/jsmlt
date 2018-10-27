// Internal dependencies
import { Classifier } from '../base';
import * as Arrays from '../../arrays';
import * as Random from '../../random';

/**
 * Calculate the logit function for an input
 *
 * @param {number} x - Input number
 * @return {number} Output of logit function applied on input
 */
function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

export default class FullyConnected extends Classifier {
  /**
   * Constructor. Initialize class members and store user-defined options.
   *
   * @param {Object} [optionsUser] User-defined options
   * @param {trackAccuracy} [optionsUser.trackAccuracy = false] Whether to track accuracy during the
   *   training process. This will let the perceptron keep track of the error rate on the test set
   *   in each training iteration
   */
  constructor(optionsUser = {}) {
    super();

    // Parse options
    const optionsDefault = {
      numInputs: 'auto',
      numOutputs: 'auto',
      hiddenLayers: [],
      numEpochs: 20,
      learningRate: 0.01,
    };

    const options = {
      ...optionsDefault,
      ...optionsUser,
    };

    this.numInputs = options.numInputs;
    this.numOutputs = options.numOutputs;
    this.hiddenLayers = options.hiddenLayers;
    this.numEpochs = options.numEpochs;
    this.learningRate = options.learningRate;

    // Initialize to empty layers
    this.layers = [];
    this.weights = [];
  }

  /**
   * Randomly initialize the weights for the neural network. For each subsequent pair of layers,
   * where the first has n nodes and the second n' nodes, initialize an matrix with n rows and n'
   * columns. Each cell in the matrix is assigned a random value in the range [-1, 1].
   *
   * The weights between layer k and layer k + 1 are stored in element k (starting at k = 0) of the
   * weights array.
   */
  initializeWeights() {
    this.weights = [];
    this.connectivity = [];

    // Initialize weights for each subsequent pair of layers
    for (let i = 0; i < this.layers.length - 1; i++) {
      // Shape of the weight and connectivity matrices for the weights between the nodes in this and
      // the next layer
      const shape = [this.layers[i], this.layers[i + 1]];

      // Initialize weights from this layer to the next layer to a random real number in the
      // range [-1, 1]
      //this.weights.push(Arrays.full(shape, 0));
      this.weights.push(Arrays.full(shape, () => Random.rand(-1, 1)));

      // Initialize connectivity between nodes by connecting all nodes (including bias nodes; these
      // are removed in the next few lines)
      const connectivity = Arrays.full(shape, true);

      // All layers but the last layer have a bias node: remove the connections between all nodes
      // and bias nodes in the next layer
      if (i < this.layers.length - 2) {
        connectivity.forEach(x => x[0] = false);
      }

      this.connectivity.push(connectivity);
    }
    // this.weights = [[
    //   [0, 0],
    //   [-1, 0],
    //   [1, 2],
    // ]];
    // console.log(JSON.parse(JSON.stringify(this.weights)));
    //throw new Error();
  }

  train(X, y) {
    const numInputs = this.numInputs == 'auto' ? X[0].length : this.numInputs;
    const numOutputs = this.numOutputs == 'auto' ? Arrays.unique(y).length : this.numOutputs;

    this.layers = [numInputs + 1, ...this.hiddenLayers, numOutputs];

    // Initialize weights arrays
    this.initializeWeights();

    // Train for specified number of epochs
    for (let i = 0; i < this.numEpochs; i++) {
      this.trainEpoch(X, y);
    }
  }

  trainEpoch(X, y) {
    // Shuffle data points
    // const a = Arrays.shuffle([0, 1, 2, 3, 4, 5]);
    const [XUse, yUse] = Arrays.shuffle(X, y);
    // Train for each sample individually
    for (let i = 0; i < XUse.length; i += 1) {
      this.trainSample(XUse[i].slice(), yUse[i]);
      // throw new Error();
    }
    // console.log(this.weights[0][0]);
    //console.log(this.calculateRMSE(X, y));
    // console.log('next epoch');
  }

  calculateRMSE(X, y) {
    return Math.sqrt(
      X.reduce((a, x, i) => a + this.calculateError(x, y[i]) ** 2, 0) / X.length
    );
  }

  calculateError(x, y) {
    const [activations, outputs] = this.forwardPass(x);
    return outputs[outputs.length - 1].reduce((a, o, i) => a + 0.5 * ((o - (y[i] == i)) ** 2), 0);
  }

  deltaRule(activations, outputs, targets) {
    // Calculate deltas using the generalized delta rule
    let deltas = this.layers.map(x => Arrays.zeros(x));

    // const errBefore = this.calculateError(x, y);

    // Start at the final layer, and calculate deltas going backward until the second layer
    for (let k = this.layers.length - 1; k > 0; k--) {
      // Index of first regular node in this layer
      const startNode = (k < this.layers.length - 1) ? 1 : 0;

      // Loop over all non-bias nodes in the layer
      for (let i = startNode; i < this.layers[k]; i++) {
        // Extract output and activation for this node
        const activation = activations[k][i];
        const output = outputs[k][i];

        // Last layer
        if (k == this.layers.length - 1) {
          // console.log(output - target);
          deltas[k][i] = this.activationFunctionDerivative(activation) * (output - targets[i]);
        }
        // Earlier layers
        else {
          // Calculate sum of weighted deltas in next layer
          const nextDeltaSum = deltas[k + 1].reduce((r, a, j) => r + a * this.weights[k][i][j], 0);
          deltas[k][i] = this.activationFunctionDerivative(activation) * nextDeltaSum;
        }
      }
    }

    return deltas;
  }

  trainSample(x, y) {
    //x = [1, 2];
    // Pass the sample through the network
    const [activations, outputs] = this.forwardPass(x);

    const targets = [...Array(this.layers[this.layers.length - 1])].map((a, i) => i == y ? 1 : 0);
    // console.log(targets);

    const deltas = this.deltaRule(activations, outputs, targets);

    // console.log(activations);
    // console.log(outputs);

    // console.log('x-a-o-d');
    // console.log(x);
    // console.log(activations);
    // console.log(outputs);
    // console.log(deltas);
    // console.log('next sample');

    // Update weights
    for (let k = 0; k < this.layers.length - 1; k++) {
      // console.log('Updating weights in layer ' + k);

      // Loop over all pairs of connected nodes in layers k and k + 1
      for (let i = 0; i < this.layers[k]; i++) {
        // console.log('Updating weights from node ' + i);
        for (let j = 0; j < this.layers[k + 1]; j++) {
          if (!this.connectivity[k][i][j]) {
            continue;
          }
          // console.log('to node ' + j);

          // Update weights
          //console.log('Weight delta: ' + (outputs[k][i] * deltas[k + 1][j]));
          // console.log(this.learningRate * outputs[k][i] * deltas[k + 1][j]);
          this.weights[k][i][j] -= this.learningRate * outputs[k][i] * deltas[k + 1][j];
          // const errAfter = this.calculateError(x, y);
          // console.log('Change: ' + (errBefore - errAfter));
          // break;
        }
        // break;
      }
      // break;
    }

  }

  /**
   * Pass a sample through the network, calculating the activations and outputs for all nodes in the
   * network.
   *
   * @param {Array.<number>} x - Data point features
   * @return {Array} - Array with two elements: containing the activations and outputs,
   *   respectively, for each node in the network
   */
  forwardPass(x) {
    if (x.length != this.layers[0] - 1) {
      throw new Error('Number of features of samples should match the number of network inputs.');
    }

    // Output and activations of nodes in each layer, including a bias node
    let activations = this.layers.map(a => Arrays.zeros(a));
    let outputs = this.layers.map(a => Arrays.zeros(a));

    // Fill the outputs of the first layer with the sample features, and initialize the activations
    // of the first layer to an empty list
    activations[0] = [];
    outputs[0] = [1, ...x.slice()];

    // Propagate the inputs layer-by-layer
    for (let layer = 1; layer < this.layers.length; layer++) {
      // Index of first regular node in this layer
      let startNode = 0;

      // If this is not the output layer, set the output of the bias node to 1
      if (layer < this.layers.length - 1) {
        startNode = 1;

        // Bias node
        outputs[layer][0] = 1;
      }

      // Calculate the activation and output of each (non-bias) node in the layer
      for (let node = startNode; node < this.layers[layer]; node++) {
        // Calculate the activation as the weighted sum of the outputs (including the bias node) of
        // the previous layer
        activations[layer][node] = outputs[layer - 1].reduce((r, a, i) => {
          return r + a * this.weights[layer - 1][i][node];
        }, 0);

        // Calculate the output of this node by applying the activation function to the activation
        outputs[layer][node] = this.activationFunction(activations[layer][node]);
      }
    }

    return [activations, outputs];
  }

  activationFunction(a) {
    return sigmoid(a);
  }

  activationFunctionDerivative(a) {
    return sigmoid(a) * (1 - sigmoid(a));
  }

  addLayer(numNodes) {
    this.layers.push(numNodes);
  }

  setWeights(weights) {
    this.weights = weights;
  }

  /**
   * Make a prediction for a data set.
   *
   * @param {Array.Array.<number>} X - Data set to make predictions for
   * @return {Array.<number>} Predictions
   */
  predict(X) {
    //console.log(JSON.parse(JSON.stringify(this.forwardPass(X[500]))));
    return X.map(x => {
      const [activations, outputs] = this.forwardPass(x);
      return Arrays.argMax(outputs[outputs.length - 1]);
    });
  }
}
