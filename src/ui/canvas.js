// Standard dependencies
import jQuery from 'jquery';

// Internal dependencies
import CanvasDatapoint from './datapoint';

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
      context: el.getContext('2d'),
    };

    window.addEventListener('resize', () => this.resize());
    this.resize();

    // User-defined options
    this.options = {
      continuousClick: false,
      continuousClickInterval: 50,
      ...options,
    };

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
    this.elements.push(new CanvasDatapoint(this, datapoint));
  }

  /**
   * Handle mouse events on the canvas, e.g. for adding data points
   */
  handleMouseEvents() {
    if (this.options.continuousClick) {
      this.mouseStatus = 0;
      this.mouseX = 0;
      this.mouseY = 0;

      this.canvas.element.addEventListener('mousedown', () => {
        this.mouseStatus = 1;
        this.continuousClickIntervalId = setInterval(
          () => this.click(),
          this.options.continuousClickInterval
        );
      });

      document.addEventListener('mouseup', () => {
        this.mouseStatus = 0;
        clearInterval(this.continuousClickIntervalId);
      });

      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;
      });
    }

    this.canvas.element.addEventListener('mousedown', (e) => {
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
    this.canvas.element.style.width = '100%';
    this.canvas.element.style.height = '100%';
    this.canvas.element.width = this.canvas.element.offsetWidth * window.devicePixelRatio;
    this.canvas.element.height = this.canvas.element.offsetHeight * window.devicePixelRatio;
    this.canvas.width = this.canvas.element.offsetWidth;
    this.canvas.height = this.canvas.element.offsetHeight;
    this.canvas.context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  redraw() {
    // Clear canvas
    this.clear();

    // Basic canvas elements
    this.drawGrid();
    this.drawAxes();

    // Draw dynamic canvas elements
    this.elements.forEach((element) => {
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

  /**
   * Refresh (i.e. redraw) everything on the canvas
   */
  refresh() {
    // Dynamic canvas elements
    this.elements.forEach((element) => {
      element.update();
    });

    this.redraw();
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
    // Properties used for calculating mouse position
    const el = this.canvas.element;
    const rect = el.getBoundingClientRect();
    const win = el.ownerDocument.defaultView;

    // Mouse x- and y-position on [0,1] interval
    let f1 = (x - rect.left + win.pageXOffset) / this.canvas.width;
    let f2 = (y - rect.top + win.pageYOffset) / this.canvas.height;

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

export default Canvas;
