'use strict';
(function () {
  const nodeError = document.querySelector('#error')
    .content
    .querySelector('div');

  function setErrorMessage(StatusError) {
    const defaultErrorMessage = 'Попробуте перезагрузить страницу';
    let error;
    switch (StatusError) {
      case 400:
        error = `Неверный запрос. ${defaultErrorMessage}`;
        break;
      case 401:
        error = 'Пользователь не авторизован';
        break;
      case 404:
        error = 'Ничего не найдено';
        break;
      case 500:
        error = 'Внутренняя ошибка сервера';
        break;
      default:
        error = `Cтатус ответа: ${StatusError} ${defaultErrorMessage}`;
    }
    return error;
  }
  const onError = function (errorMessage) {
    nodeError.querySelector('.error__message').textContent = setErrorMessage(errorMessage);
    document.querySelector('main').insertAdjacentElement('afterbegin', nodeError);
    const buttonError = document.querySelector('.error__button');
    buttonError.addEventListener('click', closeError);
    nodeError.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscPress);
  };

  function onErrorEscPress(evt) {
    window.map.fillAddress(window.constants.PIN_HANDLE);
    window.util.onEscPress(evt, nodeError);
  }

  function closeError() {
    window.util.removeElinForm(nodeError);
    window.map.fillAddress(window.constants.PIN_HANDLE);
    document.removeEventListener('keydown', onErrorEscPress);
  }

  window.error = {
    setErrorMessage,
    onError,
  };

})();
