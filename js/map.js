'use strict';
const succsesLoad = (data) => {
  window.dataWithId = window.util.addIdToData(data);
  window.pin.appendPin(window.dataWithId.slice(0, window.constants.MAX_PIN_ON_MAP));
};

const activeState = () => {
  window.util.abledElement(window.util.fieldset);
  window.form.getRoomGuestValidation();
  window.map.fillAddress(window.constants.PIN_HANDLE);
  window.constants.form.classList.remove('ad-form--disabled');
  window.server.load(succsesLoad, window.error.onError);
};

const fillAddress = (element) => {
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
};

window.map = {
  activeState,
  fillAddress,
  succsesLoad,
};
