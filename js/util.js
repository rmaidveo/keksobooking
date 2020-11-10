'use strict';
(function () {
  const fieldset = document.querySelectorAll(`fieldset`);

  function abledElement(element) {
    for (let i = 0; i < element.length; i++) {
      element[i].removeAttribute("disabled");
    }
  }

  function disabledElement(element) {
    for (let i = 0; i < element.length; i++) {
      element[i].setAttribute("disabled", true);
    }
  }

  function removeCard() {
    if (window.constants.MAP.contains(window.card.popup)) {
      window.card.popup.remove();
    }
  }


  function disabledState() {
    window.map.fillAddress(window.constants.PIN_HANDLE);
    disabledElement(fieldset);
  }

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
  const addIdToData = (array) => {
    return array.map((item, index) => {
      item.offer.id = index;

      return item;
    });
  };

  window.util = {
    fieldset,
    abledElement,
    disabledElement,
    removeCard,
    disabledState,
    resetForm,
    removeElinForm,
    onEscPress,
    addIdToData,
  };

})();
