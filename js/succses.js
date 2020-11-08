'use strict';
(function () {
  const nodeSuccses = document.querySelector('#success')
    .content
    .querySelector('div');
  const fieldset = document.querySelectorAll(`fieldset`);

  function resetMainPin() {
    window.constants.PIN_HANDLE.style.left = `${window.constants.PIN_MAIN_START.left}px`;
    window.constants.PIN_HANDLE.style.top = `${window.constants.PIN_MAIN_START.top}px`;
  }

  function resetFormSuccses() {
    window.constants.MAP.classList.add('map--faded');
    const pins = document.querySelectorAll('.map__pin');
    pins.forEach((pin) => {
      if (!pin.contains(window.constants.PIN_HANDLE)) {
        pin.remove();
      }
    });
    window.util.resetForm();
    window.map.disabledElement(fieldset);
    resetMainPin();
    window.constants.form.classList.add('ad-form--disabled');

  }

  function onSuccsesEscPress(evt) {
    window.util.onEscPress(evt, closeSucsses);
  }

  function closeSucsses() {
    window.util.removeElinForm(nodeSuccses, resetFormSuccses);
    document.removeEventListener('keydown', onSuccsesEscPress);
  }
  const onSuccses = function () {
    document.querySelector('main').insertAdjacentElement('afterbegin', nodeSuccses);
    nodeSuccses.addEventListener('click', closeSucsses);
    document.addEventListener('keydown', onSuccsesEscPress);
  };
  window.succses = {
    onSuccses,
  };
})();
