function polygonArea(path) {
  // Convert points to common format
  const points = [];

  for (let i = 0; i < path.length; i += 1) {
    const pointRaw = path[i];

    // Accept both arrays and objects with property 'x' and 'y' as input for a point
    if (Array.isArray(pointRaw)) {
      points.push(pointRaw.slice());
    } else {
      points.push([pointRaw.x, pointRaw.y]);
    }
  }

  // Calculate area
  let area = 0;

  // Closed path
  let pointPrevious = points[points.length - 1].slice();

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    area += (pointPrevious[0] + point[0]) * (pointPrevious[1] - point[1]);
    pointPrevious = point;
  }

  return area;
}

export default {
  polygonArea,
};
