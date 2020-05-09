"use strict";

var Vibrant = require('node-vibrant');

var getRandom = function getRandom(len, rangeFloor) {
  if (rangeFloor) {
    return Math.floor(Math.random() * (len - rangeFloor) + rangeFloor);
  } else return Math.floor(Math.random() * len);
};

var convertColor = function convertColor(rrggbb) {
  var newColor = rrggbb.substr(1);
  return parseInt(newColor, 16);
};

var getColorOfImage = function getColorOfImage(img) {
  var vibrant = new Vibrant(img);
  vibrant.getPalette().then(function (palette) {
    var color = palette.Vibrant.getHex();
    return parseInt(color.substr(1), 16);
  });
};

module.exports = {
  getRandom: getRandom,
  convertColor: convertColor,
  getColorOfImage: getColorOfImage
};