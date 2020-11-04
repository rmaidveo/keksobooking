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
  const onError = function (errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #ff5635; color: white; border-bottom: 2px solid #353535;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '28px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Активное состояние страницы
  function abledElement(element) {
    for (let i = 0; i < element.length; i++) {
      element[i].removeAttribute("disabled");
    }
    window.constants.form.classList.remove('ad-form--disabled');
    window.server.load(appendPin, onError);
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
