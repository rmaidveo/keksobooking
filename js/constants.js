'use strict';
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const PIN_WIDTH_MAIN = 65;
const PIN_HEIGHT_MAIN = 65;
const PIN_HEIGHT_NEEDLE = 22;
const MAX_PIN_ON_MAP = 5;
const PIN_MAIN_START = {
  TOP: 375,
  LEFT: 570,
};
const TYPE_TRANSLATE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};
const PRICE_VALUE = {
  low: 'low',
  middle: 'middle',
  high: 'high',
};
const MAX_PRICE = {
  MIN: 10000,
  MAX: 50000,
};
const errorStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
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
const PIN_HANDLE = document.querySelector('.map__pin--main');
const DEBOUNCE_INTERVAL = 500;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

window.constants = {
  PIN_WIDTH,
  PIN_HEIGHT,
  PIN_WIDTH_MAIN,
  PIN_HEIGHT_MAIN,
  PIN_HEIGHT_NEEDLE,
  PIN_MAIN_START,
  MAP_RANGE_TOP,
  MAX_PIN_ON_MAP,
  MAP_RANGE_BOTTOM,
  APP_COUNTS,
  errorStatus,
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
  PIN_HANDLE,
  PRICE_VALUE,
  MAX_PRICE,
  DEBOUNCE_INTERVAL,
  FILE_TYPES
};
