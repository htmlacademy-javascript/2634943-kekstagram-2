import { getPhotos } from './api.js';
import { renderCards } from './render-cards.js';
import { initUploadForm } from './form-upload.js';
import { showDataError } from './util.js';

getPhotos()
  .then((photos) => {
    renderCards(photos);
  })
  .catch(() => {
    showDataError();
  });

initUploadForm();

