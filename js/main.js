'use strict';
const closeCard = window.card.popup.querySelector('.popup__close');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const onClickCloseCards = () => {
  window.util.removeCard();
  document.removeEventListener('keydown', window.pin.onPopupEscPress);
};

const onMouseDownActive = (evt) => {
  evt.preventDefault();
  if (window.constants.MAP.classList.contains('map--faded')) {
    window.map.activeState();
  }
};

const onKeyDownActive = (evt) => {
  if (evt.key === 'Enter') {
    window.map.activeState();
  }
};
const onChangeTypeOption = () => {
  window.form.minPriceValidation();
};

const onCnangeUserPrice = () => {
  window.form.priceValidation();
};

const onCnangeTimeIn = () => {
  window.form.validTime(timeIn, timeOut);
};

const onCnangeTimeOut = () => {
  window.form.validTime(timeOut, timeIn);
};

const onChangeRoomGuest = () => {
  window.form.getRoomGuestValidation();
};

window.util.disabledState();

closeCard.addEventListener('click', onClickCloseCards);

window.constants.PIN_HANDLE.addEventListener('mousedown', (evt) => {
  onMouseDownActive(evt);
});

window.constants.PIN_HANDLE.addEventListener('keydown', (evt) => {
  onKeyDownActive(evt);
});

window.form.typeOption.addEventListener('change', onChangeTypeOption);
window.form.userPrice.addEventListener('change', onCnangeUserPrice);
timeIn.addEventListener('change', onCnangeTimeIn);
timeOut.addEventListener('change', onCnangeTimeOut);
window.form.roomCount.addEventListener('change', onChangeRoomGuest);
window.form.guestCount.addEventListener('change', onChangeRoomGuest);
