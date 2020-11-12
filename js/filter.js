'use strict';
const filtersBlock = document.querySelector(`.map__filters`);
const houseType = filtersBlock.querySelector(`#housing-type`);
const housePrice = filtersBlock.querySelector(`#housing-price`);
const houseRoom = filtersBlock.querySelector(`#housing-rooms`);
const houseGuest = filtersBlock.querySelector(`#housing-guests`);
const defaultValue = 'any';

const onHouseSelectChange = (item) => {
  const value = houseType.value;
  return (value !== defaultValue) ? value === item.offer.type : true;
};

const onPriceSelectChange = (item) => {
  const value = housePrice.value;
  switch (value) {
    case defaultValue:
      return true;
    case window.constants.PRICE_VALUE.low:
      if (item.offer.price < window.constants.MAX_PRICE.MIN) {
        return true;
      }
      break;
    case window.constants.PRICE_VALUE.middle:
      if (item.offer.price >= window.constants.MAX_PRICE.MIN && item.offer.price <= window.constants.MAX_PRICE.MAX) {
        return true;
      }
      break;
    case window.constants.PRICE_VALUE.high:
      if (item.offer.price > window.constants.MAX_PRICE.MAX) {
        return true;
      }
      break;
  }

  return false;
};
const onRoomsSelectChange = (item) => {
  const value = houseRoom.value;
  return (value !== defaultValue) ? parseInt(value, 10) === item.offer.rooms : true;
};

const onGuestSelectChange = (item) => {
  const value = houseGuest.value;
  return (value !== defaultValue) ? parseInt(value, 10) === item.offer.guests : true;
};

const onFeaturesSelectChange = (items) => {
  const houseFeature = Array.from(filtersBlock.querySelectorAll(`.map__checkbox:checked`));
  for (let item of houseFeature) {
    if (!items.offer.features.includes(item.value)) {
      return false;
    }
  }
  return true;
};

const getFillterOffers = (offer) => {
  const fillterOffersArray = [];
  for (let i = 0; i < offer.length; i++) {
    if (onHouseSelectChange(offer[i]) &&
      onPriceSelectChange(offer[i]) &&
      onRoomsSelectChange(offer[i]) &&
      onGuestSelectChange(offer[i]) &&
      onFeaturesSelectChange(offer[i])) {
      fillterOffersArray.push(offer[i]);
    }
  }
  return fillterOffersArray;
};

const onFiltersFormChange = () => {
  window.util.removeCard();
  window.pin.deletePins();
  window.debounce.getDebounce(window.pin.appendPin(getFillterOffers(window.dataWithId).splice(0, window.constants.MAX_PIN_ON_MAP)));
};

filtersBlock.addEventListener(`change`, onFiltersFormChange);
