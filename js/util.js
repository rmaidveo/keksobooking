'use strict';
(function () {
  function getRandomNumber(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function randomElementArray(array) {
    return array[getRandomNumber(0, array.length - 1)];
  }

  function generateArray(array) {
    let arr = [];
    for (let i = 0; i < getRandomNumber(0, array.length); i++) {
      arr[i] = randomElementArray(array);
    }
    return arr.join(' , ');
  }

  function splitString(stringToSplit, separator) {
    let arrayOfStrings = stringToSplit.split(separator);
    return arrayOfStrings.filter(function (item, pos) {
      return arrayOfStrings.indexOf(item) === pos;
    });
  }

  window.util = {
    getRandomNumber,
    randomElementArray,
    generateArray,
    splitString
  };
})();
