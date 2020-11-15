'use strict';
const nodeSuccsess = document.querySelector('#success')
  .content
  .querySelector('div');
const fieldset = document.querySelectorAll(`fieldset`);

const resetFormSuccsess = () => {
  window.constants.MAP.classList.add('map--faded');
  window.constants.form.classList.add('ad-form--disabled');
  window.util.removeCard();
  window.pin.deletePins();
  window.util.resetForm();
  window.util.disabledElement(fieldset);
  window.pin.resetMainPin();
};

const onSuccsesEscPress = (evt) => {
  window.util.onEscPress(evt, closeSucsses);
};

const closeSucsses = () => {
  window.util.resetForm();
  window.util.removeElinForm(nodeSuccsess);
  document.removeEventListener('keydown', onSuccsesEscPress);
};

const onSuccses = () => {
  document.querySelector('main').insertAdjacentElement('afterbegin', nodeSuccsess);
  resetFormSuccsess();
  nodeSuccsess.addEventListener('click', closeSucsses);
  document.addEventListener('keydown', onSuccsesEscPress);
};

window.succses = {
  onSuccses,
  resetFormSuccsess
};
