'use strict';
(function () {
  const URL = {
    GET: 'https://21.javascript.pages.academy/keksobooking/data',
    POST: 'https://21.javascript.pages.academy/keksobooking',
  };
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  function xhrRequest(method, onSuccses, onError, data = null) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        if (method === 'GET') {
          onSuccses(xhr.response);
        } else {
          onSuccses();
        }
      } else {
        onError('' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (method === `GET`) {
      xhr.open(method, URL.GET);
    } else if (method === `POST`) {
      xhr.open(method, URL.POST);
    }

    xhr.send(data);
  }

  function load(onSuccses, onError) {
    xhrRequest('GET', onSuccses, onError);
  }

  function upload(data, onSuccses, onError) {
    xhrRequest('POST', onSuccses, onError, data);
  }

  window.server = {
    load,
    upload,
  };
})();
