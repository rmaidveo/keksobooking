'use strict';
(function () {
  const MIN_Y = window.constants.MAP_RANGE_TOP - window.constants.PIN_HEIGHT;
  const MAX_Y = window.constants.MAP_RANGE_BOTTOM - window.constants.PIN_HEIGHT;
  const MIN_X = 0 - window.constants.PIN_WIDTH / 2;
  const MAX_X = window.constants.mapWidth - window.constants.PIN_WIDTH / 2;

  window.constants.pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const posY = window.constants.pinHandle.offsetTop - shift.y;
      const posX = window.constants.pinHandle.offsetLeft - shift.x;

      if (posX >= MIN_X && posX <= MAX_X && posY >= MIN_Y && posY <= MAX_Y) {
        window.constants.pinHandle.style.top = posY + `px`;
        window.constants.pinHandle.style.left = posX + `px`;
      }
      window.map.fillAddress(window.constants.pinHandle);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.fillAddress(window.constants.pinHandle);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
