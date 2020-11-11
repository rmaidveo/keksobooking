'use strict';
const closeCard = window.card.popup.querySelector('.popup__close');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const closeCards = () => {
  window.util.removeCard();
  document.removeEventListener('keydown', window.map.onPopupEscPress);
};

closeCard.addEventListener('click', () => {
  closeCards();
});

window.util.disabledState();

window.constants.PIN_HANDLE.addEventListener('mousedown', (evt) => {
  evt.preventDefault();
  if (window.constants.MAP.classList.contains('map--faded')) {
    window.map.activeState();
  }
});

window.constants.PIN_HANDLE.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    window.map.activeState();
  }
});

window.form.typeOption.addEventListener('change', () => {
  window.form.minPriceValidation();
});

window.form.userPrice.addEventListener('change', () => {
  window.form.priceValidation();
});

timeIn.addEventListener('change', () => {
  window.form.validTime(timeIn, timeOut);
});

timeOut.addEventListener('change', () => {
  window.form.validTime(timeOut, timeIn);
});
window.form.roomCount.addEventListener('change', window.form.getRoomGuestValidation);
window.form.guestCount.addEventListener('change', window.form.getRoomGuestValidation);
