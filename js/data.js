'use strict';
(function () {
  const TITLE = [
    'Уютное жилье',
    'Место, которое вы давно искали',
    'Жилье с потрясающим видом из окна',
    'Вы обязательно к нам вернетесь!',
    'Уютное жилье',
    'Место, которое вы давно искали',
    'Жилье с потрясающим видом из окна',
    'Вы обязательно к нам вернетесь!',
  ];

  const TYPE_APARTMENT = [
    'palace',
    'flat',
    'house',
    'bungalow',
  ];
  const CHECHKIN = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const CHECHKOUT = [
    '12:00',
    '13:00',
    '14:00',
  ];
  const FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  const PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];
  const MAP_RANGE_TOP = 130;
  const MAP_RANGE_BOTTOM = 630;
  const APP_COUNTS = 8;
  const mapWidth = (document.querySelector('.map__overlay').offsetWidth);

  function generateAppartments() {
    let arr = [];
    for (let i = 0; i < APP_COUNTS; i++) {
      let obj = {};
      obj = {
        author: {
          avatar: `img/avatars/user0${i + 1}.png`
        },
        offer: {
          title: window.util.randomElementArray(TITLE),
          address: window.util.getRandomNumber(500, 1000) + ' , ' + window.util.getRandomNumber(100, 500),
          price: window.util.getRandomNumber(1000, 5000),
          type: window.util.randomElementArray(TYPE_APARTMENT),
          rooms: window.util.getRandomNumber(1, 5),
          guests: window.util.getRandomNumber(1, 5),
          checkin: window.util.randomElementArray(CHECHKIN),
          checkout: window.util.randomElementArray(CHECHKOUT),
          features: window.util.generateArray(FEATURES),
          description: 'Описание выбранного жилья',
          photos: window.util.generateArray(PHOTOS)
        },
        location: {
          x: window.util.getRandomNumber(0, mapWidth),
          y: window.util.getRandomNumber(MAP_RANGE_TOP, MAP_RANGE_BOTTOM)
        }
      };
      arr.push(obj);
    }
    return arr;
  }
  window.data = {
    generateAppartments,
  };
})();
