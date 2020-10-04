'use strict';
const TITLE = [
  `Уютное жилье`,
  `Место, которое вы давно искали`,
  `Жилье с потрясающим видом из окна`,
  `Вы обязательно к нам вернетесь!`,
  `Уютное жилье`,
  `Место, которое вы давно искали`,
  `Жилье с потрясающим видом из окна`,
  `Вы обязательно к нам вернетесь!`,
];
const AVATARS = [
  `img/avatars/user01.png`,
  `img/avatars/user02.png`,
  `img/avatars/user03.png`,
  `img/avatars/user04.png`,
  `img/avatars/user05.png`,
  `img/avatars/user06.png`,
  `img/avatars/user07.png`,
  `img/avatars/user08.png`,
];
const TYPE_APARTMENT = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`,
];
const CHECHKIN = [
  `12:00`,
  `13:00`,
  `14:00`,
];
const CHECHKOUT = [
  `12:00`,
  `13:00`,
  `14:00`,
];
const FEATURES = [
  `wi-fi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];
const MAP_RANGE_TOP = 130;
const MAP_RANGE_BOTTOM = 630;
const APP_COUNTS = 8;
const mapPins = document.querySelector(`.map__pins`);
const mapWidth = (document.querySelector(`.map__overlay`).offsetWidth);
const teplatePin = document.querySelector(`#pin`).content.querySelector(`button`);
const appartmens = generateAppartments();

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function randomElementArray(array) {
  return array[getRandomNumber(0, array.length - 1)];
}

function generateArray(array) {
  var arr = [];
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
        avatar: AVATARS[i]
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
        description: `Описание выбранного жилья`,
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
  let pinImg = pinElement.querySelector(`img`);
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  pinElement.style.left = `${pin.location.x - pinElement.offsetWidth}px`;
  pinElement.style.top = `${pin.location.y - pinElement.offsetHeight / 2}px`;

  return pinElement;
}

document.querySelector(`.map`).classList.remove(`map--faded`);
const fragment = document.createDocumentFragment();
for (let i = 0; i < appartmens.length; i++) {
  fragment.appendChild(renderPin(appartmens[i]));
}
mapPins.appendChild(fragment);
