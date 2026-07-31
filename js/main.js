import { getPhotos } from './api.js';
import { renderCards } from './render-cards.js';
import { initUploadForm } from './form-upload.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showDataError = () => {
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, 5000);
};

getPhotos()
  .then((photos) => {
    renderCards(photos);
  })
  .catch(() => {
    showDataError();
  });

initUploadForm();

