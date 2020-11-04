'use strict';
(function () {
  const URL = 'https://21.javascript.pages.academy/keksobooking/data';

  function load(onSuccses) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.addEventListener('load', function () {
      onSuccses(xhr.response);
    });

    xhr.send();
  }
  window.server = {
    load,
  };
})();
