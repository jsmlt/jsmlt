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

export default Datapoint;
