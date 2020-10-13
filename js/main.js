'use strict';
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
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const mapPins = document.querySelector('.map__pins');
const mapWidth = (document.querySelector('.map__overlay').offsetWidth);
const teplatePin = document.querySelector('#pin').content.querySelector('button');
const appartmens = generateAppartments();

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

function generateAppartments() {
  let arr = [];
  for (let i = 0; i < APP_COUNTS; i++) {
    let obj = {};
    obj = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`
      },
      offer: {
        title: randomElementArray(TITLE),
        address: getRandomNumber(500, 1000) + ' , ' + getRandomNumber(100, 500),
        price: getRandomNumber(1000, 5000),
        type: randomElementArray(TYPE_APARTMENT),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 5),
        checkin: randomElementArray(CHECHKIN),
        checkout: randomElementArray(CHECHKOUT),
        features: generateArray(FEATURES),
        description: 'Описание выбранного жилья',
        photos: generateArray(PHOTOS)
      },
      location: {
        x: getRandomNumber(0, mapWidth),
        y: getRandomNumber(MAP_RANGE_TOP, MAP_RANGE_BOTTOM)
      }
    };
    arr.push(obj);
  }
  return arr;
}

function renderPin(pin) {
  let pinElement = teplatePin.cloneNode(true);
  let pinImg = pinElement.querySelector('img');
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  pinElement.style.left = `${pin.location.x - PIN_WIDTH / 2}px`;
  pinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;

  return pinElement;
}

function appendPin() {
  document.querySelector('.map').classList.remove('map--faded');
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < appartmens.length; i++) {
    fragment.appendChild(renderPin(appartmens[i]));
  }
  mapPins.appendChild(fragment);
}

appendPin();
