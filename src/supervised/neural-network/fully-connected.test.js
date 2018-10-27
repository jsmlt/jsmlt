var chai = require('chai');
var chaiAlmost = require('chai-almost');
var FullyConnected = require('./index.js');

// Set up float equality testing
chai.use(chaiAlmost());
var expect = chai.expect;

describe('Supervised.NeuralNetwork.FullyConnected', function() {
  describe('.forwardPass, .deltaRule', function() {
    it('should generate correct outputs, activations, and deltas for network without hidden layers', function() {
      /**
       * Construct the sample network, consisting of two layers: an input layer with 3 nodes (including)
       * a bias node, and an output layer with 2 nodes. The weights are set as follows, where node 0 in
       * the first layer is the bias node, rows correspond to input nodes, and columns correspond to
       * output nodes:
       *    0  1
       *   -1  0
       *    2 -2
       */
      var network = new FullyConnected.FullyConnected({
        numInputs: 2,
        numOutputs: 2
      });

      network.setWeights([[
        [0, 1],
        [-1, 0],
        [2, -2],
      ]]);

      // Test forward pass
      const [activations, outputs] = network.forwardPass([0.2, 0.4], 0);

      // Input layer
      expect(outputs[0][0]).to.equal(1);
      expect(outputs[0][1]).to.equal(0.2);
      expect(outputs[0][2]).to.equal(0.4);

      // Output layer
      expect(activations[1][0]).to.almost.equal(0.6);
      expect(activations[1][1]).to.almost.equal(0.2);
      expect(outputs[1][0]).to.almost.equal(0.64565630622);
      expect(outputs[1][1]).to.almost.equal(0.54983399731);

      // Test delta rule
      const deltas = network.deltaRule(activations, outputs, [0.8, 0.2]);
      expect(deltas[1][0]).to.almost.equal(-0.03531140475);
      expect(deltas[1][1]).to.almost.equal(0.08658971203);
    });
  });
});