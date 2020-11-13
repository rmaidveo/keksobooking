'use strict';
const URLS = {
  GET: 'https://21.javascript.pages.academy/keksobooking/data',
  POST: 'https://21.javascript.pages.academy/keksobooking',
};
const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 10000;

const xhrRequest = (method, onSuccses, onError, data = null) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', () => {
    if (xhr.status === StatusCode.OK) {
      if (method === 'GET') {
        onSuccses(xhr.response);
      } else {
        onSuccses();
      }
    } else {
      onError(xhr.status);
    }
  });

  xhr.addEventListener('error', () => {
    onError('Произошла ошибка соединения');
  });

  xhr.addEventListener('timeout', () => {
    onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
  });

  xhr.timeout = TIMEOUT_IN_MS;

  if (method === `GET`) {
    xhr.open(method, URLS.GET);
  } else if (method === `POST`) {
    xhr.open(method, URLS.POST);
  }

  xhr.send(data);
};

const load = (onSuccses, onError) => {
  xhrRequest('GET', onSuccses, onError);
};

const upload = (data, onSuccses, onError) => {
  xhrRequest('POST', onSuccses, onError, data);
};

window.server = {
  load,
  upload
};
