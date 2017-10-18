# JSMLT
[![npm](https://img.shields.io/npm/v/@jsmlt/jsmlt.svg?style=flat-square)](https://www.npmjs.com/package/@jsmlt/jsmlt)
[![npm](https://img.shields.io/npm/dm/@jsmlt/jsmlt.svg?style=flat-square)](https://www.npmjs.com/package/@jsmlt/jsmlt)
[![GitHub stars](https://img.shields.io/github/stars/jsmlt/jsmlt.svg?style=social&label=Star)](https://github.com/jsmlt/jsmlt)

[<img alt="JSMLT" src="https://avatars0.githubusercontent.com/u/31863813?v=4&s=160" height="160px" align="right"/>](https://github.com/jsmlt/jsmlt/)

The JavaScript Machine Learning Toolkit, or JSMLT, is an open source JavaScript library for education in machine learning. It implements several well-known supervised learning algorithms in an understandable, modular and well-commented way. Furthermore, visualization examples are provided which allow you to explore the way different machine learning algorithms work. Ultimately, JSMLT is intended to provide students with a better learning experience when studying machine learning algorithms.

If you want to explore a visualization of the machine learning algorithms in JSMLT, check out [https://visualml.io](visualml.io). It provides an interactive environment for using JSMLT's algorithms.

# Getting started
This short guide will help you get started with JSMLT.

## Installation
> We're assuming you've got Node.js and npm installed. If you haven't, you should: download and install it from [nodejs.org](https://nodejs.org/en/).

To install JSMLT into your npm project via npm, run
```bash
npm install @jsmlt/jsmlt
```

## A simple example
In this small example, we're going to train an SVM on a small example dataset. The code example below starts with loading JSMLT, creating some dummy training and test data, and running an SVM classifier on it. It's pretty simple!

> If you want to run this example without having to set up anything by yourself, check out the [JSMLT examples repository](https://github.com/jsmlt/examples). It includes the example below, and requires no further setup: it's ready to run!

```js
// Import JSMLT library
var jsmlt = require('@jsmlt/jsmlt');

// Training data
train_X = [[-1,-1], [-1,1], [1,1], [1,-1]];
train_y = [0, 0, 1, 1];

// Testing data
test_X = [[1,2], [1,-2], [-1,-2], [-1,2]];

// Create and train classifier
var clf = new jsmlt.Supervised.SVM.SVM({
  kernel: new jsmlt.Kernel.Linear(),
});
clf.train(train_X, train_y);

// Make predictions on test data
console.log(clf.predict(test_X));
```

Running this simple example will output the classification result `[1,1,0,0]`, meaning it classified the first two points as 0, and the second two points as 1.

# API
> The entire API documentation can be found [here](http://visualml.io/jsmlt/docs/identifiers.html). You can also build the documentation locally by downloading and installing JSMLT and running `npm run-script build-documentation`: the documentation will then be available in the `docs` folder.

### Supervised learning algorithms (classifiers)
- Support Vector Machine (SVM): [`JSMLT.Supervised.SVM.SVM`](http://visualml.io/jsmlt/docs/class/src/supervised/svm/svm.js~SVM.html)
- Perceptron: [`JSMLT.Supervised.Linear.Perceptron`](http://visualml.io/jsmlt/docs/class/src/supervised/linear/perceptron.js~Perceptron.html)
- k-nearest neighbors: [`JSMLT.Supervised.Neighbors.KNN`](http://visualml.io/jsmlt/docs/class/src/supervised/neighbors/knn.js~KNN.html)
- Logistic Regression: [`JSMLT.Supervised.Neighbors.LogisticRegression`](http://visualml.io/jsmlt/docs/class/src/supervised/linear/logistic_regression.js~LogisticRegression.html)

### Unsupervised learning algorithms (clustering)
- k-means: [`JSMLT.Unsupervised.Neighbors.KMeans`](http://visualml.io/jsmlt/docs/class/src/unsupervised/neighbors/k-means.js~KMeans.html)

### Kernels
- Linear kernel: [`JSMLT.Kernel.LinearKernel`](http://visualml.io/jsmlt/docs/class/src/kernel/linear.js~LinearKernel.html)
- Gaussian (RBF) kernel: [`JSMLT.Kernel.GaussianKernel`](http://visualml.io/jsmlt/docs/class/src/kernel/gaussian.js~GaussianKernel.html)

### Preprocessing
- Encode string or other type of labels to integers: [`JSMLT.Preprocessing.LabelEncoder`](http://visualml.io/jsmlt/docs/class/src/preprocessing/labelencoder.js~LabelEncoder.html)

### Model selection
- Data set splitting: [`JSMLT.ModelSelection.trainTestSplit`](http://visualml.io/jsmlt/docs/function/index.html#static-function-trainTestSplit)

### Datasets
- Iris dataset loading: [`JSMLT.Datasets.loadIris`](http://visualml.io/jsmlt/docs/function/index.html#static-function-loadIris)

### Validation
- Accuracy metric for validation: [`JSMLT.Validation.Metrics.accuracy`](http://visualml.io/jsmlt/docs/function/index.html#static-function-accuracy)

### Classification boundaries
- Classification boundaries for trained classifier: [`JSMLT.Classification.Boundaries`](http://visualml.io/jsmlt/docs/class/src/classification/boundaries.js~Boundaries.html)

# Development
JSMLT is maintained by [Jesper van Engelen](https://github.com/engelen), and is in active development. It is currently not ready to be used in any production environments.
