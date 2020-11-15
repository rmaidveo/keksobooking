'use strict';
const nodeError = document.querySelector('#error')
  .content
  .querySelector('div');

const setErrorMessage = (StatusError) => {
  const defaultErrorMessage = 'Попробуте перезагрузить страницу';
  let error;
  switch (StatusError) {
    case window.constants.errorStatus.BAD_REQUEST:
      error = `Неверный запрос. ${defaultErrorMessage}`;
      break;
    case window.constants.errorStatus.UNAUTHORIZED:
      error = 'Пользователь не авторизован';
      break;
    case window.constants.errorStatus.NOT_FOUND:
      error = 'Ничего не найдено';
      break;
    case window.constants.errorStatus.INTERNAL_SERVER_ERROR:
      error = 'Внутренняя ошибка сервера';
      break;
    default:
      error = `Cтатус ответа: ${StatusError} ${defaultErrorMessage}`;
  }
  return error;
};

const resetAddress = () => {
  window.map.fillAddress(window.constants.PIN_HANDLE);
};

const closeError = () => {
  window.util.removeElinForm(nodeError, resetAddress);
  document.removeEventListener('keydown', onErrorEscPress);
};

const onErrorEscPress = (evt) => {
  window.util.onEscPress(evt, closeError);
};

const onError = (errorMessage) => {
  nodeError.querySelector('.error__message').textContent = setErrorMessage(errorMessage);
  document.querySelector('main').insertAdjacentElement('afterbegin', nodeError);
  const buttonError = document.querySelector('.error__button');
  buttonError.addEventListener('click', closeError);
  nodeError.addEventListener('click', closeError);
  document.addEventListener('keydown', onErrorEscPress);
};

window.error = {
  setErrorMessage,
  onError,
};
