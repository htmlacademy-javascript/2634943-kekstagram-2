import { sendFormData } from './api.js';
import { resetEffects } from './effects/effects.js';
import { resetScale } from './scale.js';
import { isValid, resetValidation } from './validation.js';

const form = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

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

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);

  function onSuccessClose() {
    successElement.remove();
    document.removeEventListener('click', onSuccessDocumentClick);
    document.removeEventListener('keydown', onSuccessDocumentKeydown);
  }

  function onSuccessDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      onSuccessClose();
    }
  }

  function onSuccessDocumentClick(evt) {
    if (!successElement.contains(evt.target)) {
      onSuccessClose();
    }
  }

  successElement.querySelector('.success__button').addEventListener('click', onSuccessClose);
  document.addEventListener('click', onSuccessDocumentClick);
  document.addEventListener('keydown', onSuccessDocumentKeydown);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);

  function onErrorClose() {
    errorElement.remove();
    document.removeEventListener('click', onErrorDocumentClick);
    document.removeEventListener('keydown', onErrorDocumentKeydown);
  }

  function onErrorDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      onErrorClose();
    }
  }

  function onErrorDocumentClick(evt) {
    if (!errorElement.contains(evt.target)) {
      onErrorClose();
    }
  }

  errorElement.querySelector('.error__button').addEventListener('click', onErrorClose);
  document.addEventListener('click', onErrorDocumentClick);
  document.addEventListener('keydown', onErrorDocumentKeydown);
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
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
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
