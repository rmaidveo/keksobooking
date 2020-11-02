'use strict';
(function () {
  function generateAppartments() {
    let arr = [];
    for (let i = 0; i < window.constants.APP_COUNTS; i++) {
      let obj = {};
      obj = {
        author: {
          avatar: `img/avatars/user0${i + 1}.png`
        },
        offer: {
          title: window.util.randomElementArray(window.constants.TITLE),
          address: window.util.getRandomNumber(500, 1000) + ' , ' + window.util.getRandomNumber(100, 500),
          price: window.util.getRandomNumber(1000, 5000),
          type: window.util.randomElementArray(window.constants.TYPE_APARTMENT),
          rooms: window.util.getRandomNumber(1, 5),
          guests: window.util.getRandomNumber(1, 5),
          checkin: window.util.randomElementArray(window.constants.CHECHKIN),
          checkout: window.util.randomElementArray(window.constants.CHECHKOUT),
          features: window.util.generateArray(window.constants.FEATURES),
          description: 'Описание выбранного жилья',
          photos: window.util.generateArray(window.constants.PHOTOS)
        },
        location: {
          x: window.util.getRandomNumber(0, window.constants.mapWidth),
          y: window.util.getRandomNumber(window.constants.MAP_RANGE_TOP, window.constants.MAP_RANGE_BOTTOM)
        }
      };
      arr.push(obj);
    }
    return arr;
  }
  window.data = {
    generateAppartments
  };
})();
