import { getPhotos } from './api.js';
import { initFilters } from './filters.js';
import { initUploadForm } from './form-upload.js';
import { showDataError } from './util.js';

getPhotos()
  .then((photos) => {
    initFilters(photos);
  })
  .catch(() => {
    showDataError();
  });

initUploadForm();

