const path = require("path");

module.exports = {
  entry: [
    "./js/constants.js",
    "./js/util.js",
    "./js/error.js",
    "./js/succses.js",
    "./js/server.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/map.js",
    "./js/form.js",
    "./js/move.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
