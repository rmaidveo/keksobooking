'use strict';
const getDebounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, window.constants.DEBOUNCE_INTERVAL);
  };
};

window.debounce = {
  getDebounce
};
