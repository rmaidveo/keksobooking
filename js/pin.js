'use strict';
(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const teplatePin = document.querySelector('#pin').content.querySelector('button');

  function renderPin(pin) {
    let pinElement = teplatePin.cloneNode(true);
    let pinImg = pinElement.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x - PIN_WIDTH / 2}px`;
    pinElement.style.top = `${pin.location.y - PIN_HEIGHT}px`;

    return pinElement;
  }
  window.pin = {
    PIN_WIDTH,
    PIN_HEIGHT,
    renderPin,
  };

})();
