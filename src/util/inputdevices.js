/* eslint import/prefer-default-export: "off" */

/**
 * Get touch coordinate (x or y) from touchpad input.
 *
 * @param {object} e - Event
 * @param {string} coordinate - Coordinate ("x" or "y", case insensitive)
 */
export function getTouchCoordinate(e, coordinate) {
  const coordinateUc = coordinate.toUpperCase();

  return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0][`page${coordinateUc}`] : e[`page${coordinateUc}`];
}
