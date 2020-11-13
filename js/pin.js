'use strict';
const teplatePin = document.querySelector('#pin').content.querySelector('button');

const onPopupEscPress = (evt) => {
  window.util.onEscPress(evt, window.util.removeCard);
};

const renderPin = (pin) => {
  let pinElement = teplatePin.cloneNode(true);
  let pinImg = pinElement.querySelector('img');
  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.title;
  pinElement.style.left = `${pin.location.x - window.constants.PIN_WIDTH / 2}px`;
  pinElement.style.top = `${pin.location.y - window.constants.PIN_HEIGHT}px`;

  return pinElement;
};
const appendPin = (pins) => {
  window.constants.MAP.classList.remove('map--faded');
  const fragment = document.createDocumentFragment();
  for (let pin of pins) {
    const renderPins = window.pin.renderPin(pin);
    fragment.appendChild(renderPins);
    renderPins.addEventListener(`click`, () => {
      window.card.renderCard(pin);
      document.addEventListener('keydown', onPopupEscPress);
    });
  }
  window.constants.mapPins.appendChild(fragment);
};

const resetMainPin = () => {
  window.constants.PIN_HANDLE.style.left = `${window.constants.PIN_MAIN_START.LEFT}px`;
  window.constants.PIN_HANDLE.style.top = `${window.constants.PIN_MAIN_START.TOP}px`;
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
  onPopupEscPress,
  renderPin,
  appendPin,
  deletePins,
  resetMainPin,
};
