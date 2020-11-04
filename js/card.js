'use strict';
(function () {
  const card = document.querySelector('#card').content.querySelector('article');
  const popup = card.cloneNode(true);
  const cardPhotos = popup.querySelector(`.popup__photos`);
  const photoTemplate = cardPhotos.querySelector(`.popup__photo`);

  function removeCard() {
    if (window.constants.MAP.contains(popup)) {
      popup.remove();
    }
  }

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
    if (photos[0] === '') {
      cardPhotos.innerHTML = '';
    } else {
      cardPhotos.innerHTML = '';
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
    popup.querySelector(`.popup__type`).textContent = window.constants.TYPE_TRANSLATE[ad.offer.type];
    writeRoomsGuest(ad.offer.rooms, ad.offer.guests);
    popup.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin}, выезд\t до ${ad.offer.checkout}`;
    popup.querySelector(`.popup__description `).textContent = ad.offer.description;
    popup.querySelector(`.popup__avatar`).src = ad.author.avatar;
    renderFeauters(ad.offer.features);
    cardsPhotosFill(ad.offer.photos);
    window.constants.MAP.insertBefore(popup, window.constants.mapFiltersContainer);
  }

  window.card = {
    popup,
    renderCard,
    removeCard
  };
})();
