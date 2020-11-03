'use strict';
(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
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
  const TYPE_TRANSLATE = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
  };
  const MAP_RANGE_TOP = 130;
  const MAP_RANGE_BOTTOM = 630;
  const APP_COUNTS = 8;
  const mapWidth = document.querySelector('.map__overlay').offsetWidth;
  const MAP = document.querySelector(`.map`);
  const mapPins = document.querySelector('.map__pins');
  const form = document.querySelector(`.ad-form`);
  const mapFiltersContainer = document.querySelector('.map__filters-container');
  const MIN_BUNGALO_PRICE = 0;
  const MIN_FLAT_PRICE = 1000;
  const MIN_HOUSE_PRICE = 5000;
  const MIN_PALACE_PRICE = 10000;
  const pinHandle = document.querySelector('.map__pin--main');

  window.constants = {
    PIN_WIDTH,
    PIN_HEIGHT,
    TITLE,
    TYPE_APARTMENT,
    CHECHKIN,
    CHECHKOUT,
    FEATURES,
    PHOTOS,
    MAP_RANGE_TOP,
    MAP_RANGE_BOTTOM,
    APP_COUNTS,
    mapWidth,
    TYPE_TRANSLATE,
    MAP,
    mapPins,
    form,
    mapFiltersContainer,
    MIN_BUNGALO_PRICE,
    MIN_FLAT_PRICE,
    MIN_HOUSE_PRICE,
    MIN_PALACE_PRICE,
    pinHandle

  };

})();
