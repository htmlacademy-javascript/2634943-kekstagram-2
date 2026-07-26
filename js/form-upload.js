import { resetEffects } from './effects/effects.js';
import { resetScale } from './scale.js';
import { isValid, resetValidation } from './validation.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const previewImage = form.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelector('.effects__preview');

const resetForm = () => {
  form.reset();
  resetScale();

  resetEffects();
  resetValidation();
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const onUploadInputChange = () => {
  openUploadForm();
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadCancelButton.addEventListener('click', onCloseButtonClick);
};

form.addEventListener('submit', (evt) => {
  if(!isValid()){
    evt.preventDefault();
  }
});

export { initUploadForm };
