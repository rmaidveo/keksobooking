'use strict';
(function () {
  const roomCount = document.querySelector('#room_number');
  const guestCount = document.querySelector('#capacity');
  const typeOption = document.querySelector('#type');
  const userPrice = document.querySelector('#price');
  const MIN_BUNGALO_PRICE = 0;
  const MIN_FLAT_PRICE = 1000;
  const MIN_HOUSE_PRICE = 5000;
  const MIN_PALACE_PRICE = 10000;
  // Валидация гостей и комнат
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
  function minPriceValidation() {
    if (typeOption.value === 'bungalow') {
      userPrice.placeholder = MIN_BUNGALO_PRICE;
    }
    if (typeOption.value === 'flat') {
      userPrice.placeholder = MIN_FLAT_PRICE;
    }
    if (typeOption.value === 'house') {
      userPrice.placeholder = MIN_HOUSE_PRICE;
    }
    if (typeOption.value === 'palace') {
      userPrice.placeholder = MIN_PALACE_PRICE;
    }
  }

  function priceValidation() {
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
  }
  // Валидация времени заезда и выезда
  function validTime(firstEl, secondEl) {
    if (firstEl.value === "12:00") {
      secondEl.value = "12:00";
    }
    if (firstEl.value === "13:00") {
      secondEl.value = "13:00";
    }
    if (firstEl.value === "14:00") {
      secondEl.value = "14:00";
    }
  }

  window.form = {
    userPrice,
    typeOption,
    guestCount,
    roomCount,
    getRoomGuestValidation,
    minPriceValidation,
    priceValidation,
    validTime,
  };
})();
