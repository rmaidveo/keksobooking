'use strict';
(function () {
  const filtersBlock = document.querySelector(`.map__filters`);
  const houseType = filtersBlock.querySelector(`#housing-type`);
  const defaultValue = 'any';

  const onHouseSelectChange = () => {
    const value = houseType.value;
    const filteredData = window.dataWithId.filter((item) => {
      return (value !== defaultValue) ? value === item.offer.type : true;
    }).splice(0, window.constants.MAX_PIN_ON_MAP);

    window.util.removeCard();
    window.pin.deletePins();
    window.map.appendPin(filteredData);
  };

  houseType.addEventListener(`change`, onHouseSelectChange);

})();
