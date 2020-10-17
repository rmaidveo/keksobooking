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


const fieldset = document.querySelectorAll(`fieldset`);
const mapPinMain = document.querySelector(`.map__pin--main`);

// Неактивное состояние страницы
function disabledElement(element) {
  for (let i = 0; i < element.length; i++) {
    element[i].setAttribute("disabled", "disabled");
  }
}
// Активное состояние страницы
function abledElement(element) {
  for (let i = 0; i < element.length; i++) {
    element[i].removeAttribute("disabled", "disabled");
  }
  appendPin();

}
// Заполнение адреса
function fillAddress() {
  let addressX = mapPinMain.style.left;
  let addressY = mapPinMain.style.top;
  let addressInput = document.querySelector('#address');
  let addressTxt = `${parseInt(addressX, 10) + 33}, ${parseInt(addressY, 10) + 33}`;
  addressInput.value = addressTxt;
}

fillAddress();
disabledElement(fieldset);

const pinHandle = document.querySelector('.map__pin--main');
pinHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  abledElement(fieldset);
  fillAddress();


});

pinHandle.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    abledElement(fieldset);
    fillAddress();

  }
});

// Валидация гостей и комнат
const roomCount = document.querySelector('#room_number');
const guestCount = document.querySelector('#capacity');

function getRoomGuestValidation() {
  let roomValue = roomCount.value;
  let guestValue = guestCount.value;
  if (roomValue === '100' && guestValue !== '0') {
    guestCount.setCustomValidity('100 комнат доступно только для не гостей');
  } else if (guestValue === '0' && roomValue !== '100') {
    guestCount.setCustomValidity('Не гостям доступно только 100 комнат');
  } else if (guestValue === '0' && roomValue === '100') {
    guestCount.setCustomValidity('');
  } else if (roomValue < guestValue) {
    guestCount.setCustomValidity('Количество гостей превышает количество комнат');
  } else if (roomValue > guestValue) {
    guestCount.setCustomValidity('Количество комнат превышает количество гостей');
  } else {
    guestCount.setCustomValidity('');
  }
}

roomCount.addEventListener('change', getRoomGuestValidation);
guestCount.addEventListener('change', getRoomGuestValidation);
