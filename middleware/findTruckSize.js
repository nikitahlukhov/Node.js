const trucks = require('../trucksSizes/trucks');

module.exports = (width, length, height, payload) => {
  if (payload > trucks.LARGE_STRAIGHT.payload ||
    width > trucks.LARGE_STRAIGHT.width ||
    length > trucks.LARGE_STRAIGHT.length ||
    height > trucks.LARGE_STRAIGHT.height) {
    return null;
  } else if (payload > trucks.SMALL_STRAIGHT.payload ||
    width > trucks.SMALL_STRAIGHT.width ||
    length > trucks.SMALL_STRAIGHT.length ||
    height > trucks.SMALL_STRAIGHT.height) {
    return ['LARGE_STRAIGHT'];
  } else if (payload > trucks.SPRINTER.payload ||
    width > trucks.SPRINTER.width) {
    return ['SMALL_STRAIGHT', 'LARGE_STRAIGHT'];
  } else return ['SPRINTER', 'SMALL_STRAIGHT', 'LARGE_STRAIGHT'];
};
