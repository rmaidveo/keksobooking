'use strict';
(function () {
  const MIN_Y = window.constants.MAP_RANGE_TOP - window.constants.PIN_HEIGHT_MAIN - window.constants.PIN_HEIGHT_NEEDLE;
  const MAX_Y = window.constants.MAP_RANGE_BOTTOM - window.constants.PIN_HEIGHT_MAIN - window.constants.PIN_HEIGHT_NEEDLE;
  const MIN_X = 0 - window.constants.PIN_WIDTH_MAIN / 2;
  const MAX_X = Math.ceil(window.constants.mapWidth - window.constants.PIN_WIDTH_MAIN / 2);

  window.constants.PIN_HANDLE.addEventListener('mousedown', (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const posY = window.constants.PIN_HANDLE.offsetTop - shift.y;
      const posX = window.constants.PIN_HANDLE.offsetLeft - shift.x;

      if (posX >= MIN_X && posX <= MAX_X && posY >= MIN_Y && posY <= MAX_Y) {
        window.constants.PIN_HANDLE.style.top = posY + `px`;
        window.constants.PIN_HANDLE.style.left = posX + `px`;
      }
      window.map.fillAddress(window.constants.PIN_HANDLE);
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      window.map.fillAddress(window.constants.PIN_HANDLE);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
