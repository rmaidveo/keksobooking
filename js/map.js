'use strict';
(function () {
  function appendPin(pins) {
    window.constants.MAP.classList.remove('map--faded');
    const fragment = document.createDocumentFragment();
    for (let pin of pins) {
      const renderPins = window.pin.renderPin(pin);
      fragment.appendChild(renderPins);
      renderPins.addEventListener(`click`, function () {
        window.card.renderCard(pin);
        document.addEventListener('keydown', onPopupEscPress);
      });
    }
    window.constants.mapPins.appendChild(fragment);
  }
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
    window.constants.form.classList.remove('ad-form--disabled');
    window.server.load(appendPin, window.error.onError);

  }
  // Заполнение адреса
  function fillAddress(element) {
    let addressX = element.style.left;
    let addressY = element.style.top;
    let addressInput = document.querySelector('#address');

    if (window.constants.form.classList.contains('ad-form--disabled')) {
      addressInput.value = `${Math.floor(parseInt(addressX, 10) + window.constants.PIN_WIDTH_MAIN / 2)}, ${Math.floor(parseInt(addressY, 10) + (window.constants.PIN_HEIGHT_MAIN + window.constants.PIN_HEIGHT_NEEDLE) / 2)}`;
    } else if (element === window.constants.PIN_HANDLE) {
      addressInput.value = `${Math.floor(parseInt(addressX, 10) + window.constants.PIN_WIDTH_MAIN / 2)}, ${Math.floor(parseInt(addressY, 10) + window.constants.PIN_HEIGHT_MAIN + window.constants.PIN_HEIGHT_NEEDLE)}`;
    } else {
      addressInput.value = `${parseInt(addressX, 10) + window.constants.PIN_WIDTH / 2}, ${parseInt(addressY, 10) + window.constants.PIN_HEIGH }`;
    }
  }

  function onPopupEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.card.removeCard();
    }
  }

  window.map = {
    onPopupEscPress,
    appendPin,
    disabledElement,
    abledElement,
    fillAddress,
  };

})();
