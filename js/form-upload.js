import { sendFormData } from './api.js';
import { resetEffects } from './effects/effects.js';
import { Messages, showMessage } from './popups.js';
import { resetScale } from './scale.js';
import { setPreviewImage, resetPreviewImage } from './preview.js';
import { isValid, resetValidation } from './validation.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const resetForm = () => {
  form.reset();
  resetScale();
  resetPreviewImage();

  resetEffects();
  resetValidation();
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

const canCloseModal = () => !document.querySelector(`.${Messages.ERROR}`);

const onDocumentKeydown = (evt) => {
  evt.preventDefault();
  if (evt.key === 'Escape'
    && !isTextFieldFocused()
    && canCloseModal()) {
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
  const file = uploadInput.files[0];
  if (file) {
    setPreviewImage(file);
  }
  openUploadForm();
};

const onCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!isValid()) {
    return;
  }

  submitButton.disabled = true;

  const formData = new FormData(form);

  sendFormData(formData)
    .then(() => {
      closeUploadForm();
      showMessage(Messages.SUCCESS);
    })
    .catch(() => {
      showMessage(Messages.ERROR);
    })
    .finally(() => {
      submitButton.disabled = false;
    });
});

const initUploadForm = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadCancelButton.addEventListener('click', onCloseButtonClick);
};

export { initUploadForm };
