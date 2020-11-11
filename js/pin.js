'use strict';
(function () {
  const teplatePin = document.querySelector('#pin').content.querySelector('button');

  const renderPin = (pin) => {
    let pinElement = teplatePin.cloneNode(true);
    let pinImg = pinElement.querySelector('img');
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x - window.constants.PIN_WIDTH / 2}px`;
    pinElement.style.top = `${pin.location.y - window.constants.PIN_HEIGHT}px`;

    return pinElement;
  };

  const resetMainPin = () => {
    window.constants.PIN_HANDLE.style.left = `${window.constants.PIN_MAIN_START.left}px`;
    window.constants.PIN_HANDLE.style.top = `${window.constants.PIN_MAIN_START.top}px`;
  };

  const deletePins = () => {
    const pins = document.querySelectorAll('.map__pin');
    pins.forEach((pin) => {
      if (!pin.contains(window.constants.PIN_HANDLE)) {
        pin.remove();
      }
    });
  };

  window.pin = {
    renderPin,
    deletePins,
    resetMainPin,
  };
})();
