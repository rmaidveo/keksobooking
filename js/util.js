'use strict';
(function () {

  function resetForm() {
    window.constants.form.reset();
    window.map.fillAddress(window.constants.PIN_HANDLE);
  }

  function removeElinForm(el, action = 'defaultValue') {
    if (document.contains(el)) {
      el.remove();
      action();
    }
  }

  function onEscPress(evt, action) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      action();
    }
  }


  window.util = {
    resetForm,
    removeElinForm,
    onEscPress,

  };
})();
