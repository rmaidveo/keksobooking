'use strict';
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview > img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoBox = document.querySelector('.ad-form__photo');

const getPhotosPreview = (element, preview) => {
  let file = element.files[0];
  const fileName = file.name.toLowerCase();

  const matches = window.constants.FILE_TYPES.some((end) => {
    return fileName.endsWith(end);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const onChangeAvatar = () => {
  getPhotosPreview(avatarChooser, avatarPreview);
};

const onChangePhoto = () => {
  if (!photoBox.querySelector('img')) {
    const img = document.createElement('img');
    img.style.width = '100%';
    img.style.height = '100%';
    img.alt = 'Фотография жилья';
    photoBox.appendChild(img);
  }

  const photoPreview = document.querySelector('.ad-form__photo > img');
  getPhotosPreview(photoChooser, photoPreview);
};

avatarChooser.addEventListener('change', onChangeAvatar);
photoChooser.addEventListener('change', onChangePhoto);
