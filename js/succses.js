'use strict';
const nodeSuccses = document.querySelector('#success')
  .content
  .querySelector('div');
const fieldset = document.querySelectorAll(`fieldset`);

const resetFormSuccses = () => {
  window.constants.MAP.classList.add('map--faded');
  window.constants.form.classList.add('ad-form--disabled');
  window.pin.deletePins();
  window.util.resetForm();
  window.util.disabledElement(fieldset);
  window.pin.resetMainPin();
};

const onSuccsesEscPress = (evt) => {
  window.util.onEscPress(evt, closeSucsses);
};

const closeSucsses = () => {
  window.util.removeElinForm(nodeSuccses, resetFormSuccses);
  document.removeEventListener('keydown', onSuccsesEscPress);
};

const onSuccses = () => {
  document.querySelector('main').insertAdjacentElement('afterbegin', nodeSuccses);
  nodeSuccses.addEventListener('click', closeSucsses);
  document.addEventListener('keydown', onSuccsesEscPress);
};

window.succses = {
  onSuccses,
};
