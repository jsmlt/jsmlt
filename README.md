![VisualML Screenshot](https://raw.githubusercontent.com/jsmlt/visualml/master/assets/screenshot.png)
 _JSMLT in action (with [VisualML](https://github.com/jsmlt/visualml)). Live demo on [visualml.io](http://visualml.io)._

# JSMLT
[![npm](https://img.shields.io/npm/v/@jsmlt/jsmlt.svg)](https://www.npmjs.com/package/@jsmlt/jsmlt)
[![npm](https://img.shields.io/npm/dm/@jsmlt/jsmlt.svg)](https://www.npmjs.com/package/@jsmlt/jsmlt)
[![GitHub stars](https://img.shields.io/github/stars/jsmlt/jsmlt.svg?style=social&label=Star)](https://github.com/jsmlt/jsmlt)
  
The JavaScript Machine Learning Toolkit, or JSMLT, is an open source JavaScript library for education in machine learning. It implements several well-known supervised learning algorithms in an understandable, modular and well-commented way. Furthermore, visualization examples are provided which allow you to explore the way different machine learning algorithms work. Ultimately, JSMLT is intended to provide students with a better learning experience when studying machine learning algorithms.

# Getting started
This short guide will help you get started with JSMLT.

## Installation
> We're assuming you've got Node.js and npm installed. If you haven't, you should: download and install it from [nodejs.org](https://nodejs.org/en/).

To install JSMLT into your npm project via npm, run
```
$ npm install @jsmlt/jsmlt
```

## Getting started
In this small example, we're going to train an SVM on a small example dataset. The code example below starts with loading JSMLT, creating some dummy training and test data, and running an SVM classifier on it. It's pretty simple!

```
// Import JSMLT library
var jsmlt = require('@jsmlt/jsmlt');

// Training data
train_X = [[-1,-1], [-1,1], [1,1], [1,-1]];
train_y = [0, 0, 1, 1];

// Testing data
test_X = [[1,2], [1,-2], [-1,-2], [-1,2]];

// Create and train classifier
const clf = new jsmlt.Supervised.SVM.SVM({
  kernel: new jsmlt.Kernel.Linear(),
});
clf.train(train_X, train_y);

// Make predictions on test data
console.log(clf.predict(test_X));
```

Running this simple example will output the classification result `[1,1,0,0]`, meaning it classified the first two points as 0, and the second two points as 1.

# Development
JSMLT is maintained by [Jesper van Engelen](https://github.com/engelen), and is in active development. It is currently not ready to be used in any production environments.
