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

const onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removeCard();
  }
};

function renderPin(pin) {
  let pinElement = teplatePin.cloneNode(true);
  let pinImg = pinElement.querySelector('img');
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  pinElement.style.left = `${pin.location.x - PIN_WIDTH / 2}px`;
  pinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;

  return pinElement;
}

function appendPin(pins) {
  map.classList.remove('map--faded');
  const fragment = document.createDocumentFragment();
  for (let pin of pins) {
    const renderPins = renderPin(pin);
    fragment.appendChild(renderPins);
    renderPins.addEventListener(`click`, function () {
      renderCard(pin);
      document.addEventListener('keydown', onPopupEscPress);
    });
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
const map = document.querySelector(`.map`);
const closeCard = popup.querySelector('.popup__close');

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

const cardPhotos = popup.querySelector(`.popup__photos`);
const photoTemplate = cardPhotos.querySelector(`.popup__photo`);
const photoElement = photoTemplate.cloneNode(true);
// Отображение фотографии
function cardsPhotosFill(photos) {
  photos = splitString(photos, " , ");
  if (photos[0] === '') {
    cardPhotos.innerHTML = '';
  } else {
    cardPhotos.innerHTML = '';
    photos.forEach((photo) => {
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
  renderFeauters(ad.offer.features);
  cardsPhotosFill(ad.offer.photos);
  map.insertBefore(popup, mapFiltersContainer);
}
const removeCard = () => {
  if (map.contains(popup)) {
    popup.remove();
  }
};

const closeCards = function () {
  removeCard();
  document.removeEventListener('keydown', onPopupEscPress);
};

closeCard.addEventListener('click', function () {
  closeCards();
});

const pinHandle = document.querySelector('.map__pin--main');
const fieldset = document.querySelectorAll(`fieldset`);
const form = document.querySelector(`.ad-form`);
// Неактивное состояние страницы
function disabledElement(element) {
  for (let i = 0; i < element.length; i++) {
    element[i].setAttribute("disabled", true);
  }

}
// Активное состояние страницы
function abledElement(element) {
  for (let i = 0; i < element.length; i++) {
    element[i].removeAttribute("disabled");
  }
  form.classList.remove('ad-form--disabled');
  appendPin(appartmens);

}
// Заполнение адреса
function fillAddress(element) {
  let addressX = element.style.left;
  let addressY = element.style.top;
  let addressInput = document.querySelector('#address');
  if (form.classList.contains('ad-form--disabled')) {
    addressInput.value = `${parseInt(addressX, 10) + PIN_WIDTH / 2 } , ${parseInt(addressY, 10) + PIN_HEIGHT / 2}`;
  } else {
    addressInput.value = `${parseInt(addressX, 10) + PIN_WIDTH}, ${parseInt(addressY, 10) + PIN_HEIGHT}`;
  }
}

fillAddress(pinHandle);
disabledElement(fieldset);

pinHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  abledElement(fieldset);
  fillAddress(pinHandle);


});

pinHandle.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    abledElement(fieldset);
    fillAddress(pinHandle);

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
  } else {
    guestCount.setCustomValidity('');
  }
}
// Валидация стоимости и типа жилья
const typeOption = document.querySelector('#type');
const userPrice = document.querySelector('#price');
const MIN_BUNGALO_PRICE = 0;
const MIN_FLAT_PRICE = 1000;
const MIN_HOUSE_PRICE = 5000;
const MIN_PALACE_PRICE = 10000;

typeOption.addEventListener('change', function () {
  if (typeOption.value === 'bungalow') {
    userPrice.value = MIN_BUNGALO_PRICE;
  }
  if (typeOption.value === 'flat') {
    userPrice.value = MIN_FLAT_PRICE;
  }
  if (typeOption.value === 'house') {
    userPrice.value = MIN_HOUSE_PRICE;
  }
  if (typeOption.value === 'palace') {
    userPrice.value = MIN_PALACE_PRICE;
  }
});

userPrice.addEventListener('change', function () {
  const value = userPrice.value;

  if (typeOption.value === 'bungalow' && value < MIN_BUNGALO_PRICE) {
    userPrice.setCustomValidity('Минимальная сумма: ' + MIN_BUNGALO_PRICE);
  } else if (typeOption.value === 'flat' && value < MIN_FLAT_PRICE) {
    userPrice.setCustomValidity('Минимальная сумма: ' + MIN_FLAT_PRICE);
  } else if (typeOption.value === 'house' && value < MIN_HOUSE_PRICE) {
    userPrice.setCustomValidity('Минимальная сумма: ' + MIN_HOUSE_PRICE);
  } else if (typeOption.value === 'palace' && value < MIN_PALACE_PRICE) {
    userPrice.setCustomValidity('Минимальная сумма: ' + MIN_PALACE_PRICE);
  } else {
    userPrice.setCustomValidity('');
  }

  userPrice.reportValidity();
});

// Валидация времени заезда и выезда
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const validTime = function (firstEl, secondEl) {
  if (firstEl.value === "12:00") {
    secondEl.value = "12:00";
  }
  if (firstEl.value === "13:00") {
    secondEl.value = "13:00";
  }
  if (firstEl.value === "14:00") {
    secondEl.value = "14:00";
  }
};

timeIn.addEventListener('change', function () {
  validTime(timeIn, timeOut);
});

timeOut.addEventListener('change', function () {
  validTime(timeOut, timeIn);
});
roomCount.addEventListener('change', getRoomGuestValidation);
guestCount.addEventListener('change', getRoomGuestValidation);
