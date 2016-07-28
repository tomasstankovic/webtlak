/**
 * Helpers file.
 */
var helpers = {};


/**
 * getRandomNumber from interval.
 * @param min
 * @param max
 * @returns {number}
 */
helpers.getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = helpers;