'use strict';
(function () {
  const teplatePin = document.querySelector('#pin').content.querySelector('button');

  function renderPin(pin) {
    let pinElement = teplatePin.cloneNode(true);
    let pinImg = pinElement.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x - window.constants.PIN_WIDTH / 2}px`;
    pinElement.style.top = `${pin.location.y - window.constants.PIN_HEIGHT}px`;

    return pinElement;
  }
  window.pin = {
    renderPin,
  };

})();
