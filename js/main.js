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

const card = document.querySelector('#card').content.querySelector('article');
const mapFiltersContainer = document.querySelector('.map__filters-container');
const TYPE_TRANSLATE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};
const popup = card.cloneNode(true);
// Функция делающая массив из строки, удаляя одинаковые значения
function splitString(stringToSplit, separator) {
  let arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings.filter(function (item, pos) {
    return arrayOfStrings.indexOf(item) === pos;
  });
}
// Написание комнат и гостей
function writeRoomsGuest(rooms, guest) {
  const guestRooms = popup.querySelector(`.popup__text--capacity`);
  if (rooms === 1 && guest === 1) {
    guestRooms.textContent = `${rooms} комната для ${guest} гостя`;
  } else if (rooms === 1 && guest > 1) {
    guestRooms.textContent = `${rooms} комната для ${guest} гостей`;
  } else if (rooms > 1 && rooms < 5 && guest > 1) {
    guestRooms.textContent = `${rooms} комнаты для ${guest} гостей`;
  } else if (rooms >= 5 && guest > 1) {
    guestRooms.textContent = `${rooms} комнат для ${guest} гостей`;
  } else if (rooms >= 5 && guest === 1) {
    guestRooms.textContent = `${rooms} комнат для ${guest} гостя`;
  } else {
    guestRooms.textContent = `${rooms} комнаты для ${guest} гостя`;
  }
  return guestRooms;
}
// Отображение фотографии
function cardsPhotosFill(photos) {
  const cardPhotos = popup.querySelector(`.popup__photos`);
  const photoTemplate = cardPhotos.querySelector(`.popup__photo`);
  photos = splitString(photos, " , ");
  if (photos[0] === '') {
    cardPhotos.innerHTML = '';
  } else {
    cardPhotos.innerHTML = ``;
    photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      cardPhotos.append(photoElement);
    });
  }
  return cardPhotos;
}
// Отображение преимуществ
function renderFeauters(features) {
  const feature = popup.querySelector(`.popup__features`);
  feature.innerHTML = "";
  features = splitString(features, " , ");
  for (let i = 0; i < features.length; i++) {
    if (features[0] === '') {
      feature.innerHTML = "";
    } else {
      feature.innerHTML += `<li class="popup__feature popup__feature--${features[i]}"></li>`;
    }
  }
  return feature;
}
// Отрисовка карточки обьявления
function renderCard(ad) {
  popup.querySelector(`.popup__title`).textContent = ad.offer.title;
  popup.querySelector(`.popup__text--address`).textContent = ad.offer.address;
  popup.querySelector(`.popup__text--price`).textContent = `${ad.offer.price} ₽/ночь`;
  popup.querySelector(`.popup__type`).textContent = TYPE_TRANSLATE[ad.offer.type];
  writeRoomsGuest(ad.offer.rooms, ad.offer.guests);
  popup.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin}, выезд\t до ${ad.offer.checkout}`;
  popup.querySelector(`.popup__description `).textContent = ad.offer.description;
  popup.querySelector(`.popup__avatar`).src = ad.author.avatar;
  cardsPhotosFill(ad.offer.photos);
  renderFeauters(ad.offer.features);
  document.querySelector('.map').insertBefore(popup, mapFiltersContainer);
}

appendPin();
renderCard(appartmens[0]);
