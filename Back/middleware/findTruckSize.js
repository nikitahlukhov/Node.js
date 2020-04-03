module.exports = (width, length, height, payload) => {
  if (payload > 4000 || width > 700 || length > 350 || height > 170) {
    return null;
  } else if (payload > 2500 || width > 500 || length > 250 || height > 170) {
    return ['large'];
  } else if (payload > 1700 || width > 300) {
    return ['small_straight', 'large_straight'];
  } else return ['sprinter', 'small_straight', 'large_straight'];
};
