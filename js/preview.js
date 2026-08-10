const DEFAULT_IMAGE_URL = 'img/upload-default-image.jpg';

const form = document.querySelector('.img-upload__form');
const previewImage = form.querySelector('.img-upload__preview img');
const effectsPreviews = form.querySelectorAll('.effects__preview');

let currentPreviewUrl = null;

const setPreviewImage = (file) => {
  if (currentPreviewUrl) {
    URL.revokeObjectURL(currentPreviewUrl);
  }

  currentPreviewUrl = URL.createObjectURL(file);
  previewImage.src = currentPreviewUrl;

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${currentPreviewUrl})`;
  });
};

const resetPreviewImage = () => {
  if (currentPreviewUrl) {
    URL.revokeObjectURL(currentPreviewUrl);
    currentPreviewUrl = null;
  }

  previewImage.src = DEFAULT_IMAGE_URL;

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${DEFAULT_IMAGE_URL})`;
  });
};

export { setPreviewImage, resetPreviewImage };
