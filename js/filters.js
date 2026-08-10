import { renderCards } from './render-cards.js';
import { debounce } from './util.js';

const AMOUNT_RANDOM_PHOTOS = 10;
const RANDOM_FACTOR = 0.5;

const filtersElement = document.querySelector('.img-filters');
const filterButtons = filtersElement.querySelectorAll('.img-filters__button');

let currentFilter = 'default';
let allPhotos = [];

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const filterDefault = (photos) => photos;

const filterRandom = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - RANDOM_FACTOR);
  return shuffled.slice(0, AMOUNT_RANDOM_PHOTOS);
};

const filterDiscussed = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (filterType, photos) => {
  let filteredPhotos;
  switch (filterType) {
    case 'random':
      filteredPhotos = filterRandom(photos);
      break;
    case 'discussed':
      filteredPhotos = filterDiscussed(photos);
      break;
    default:
      filteredPhotos = filterDefault(photos);
  }

  renderCards(filteredPhotos);
};

const debouncedApplyFilter = debounce((filterType, photos) => {
  applyFilter(filterType, photos);
});

const onFilterClick = (evt) => {
  const filterType = evt.target.id.replace('filter-', '');

  if (filterType === currentFilter) {
    return;
  }

  filtersElement.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');

  currentFilter = filterType;
  debouncedApplyFilter(currentFilter, allPhotos);
};

const initFilters = (photos) => {
  allPhotos = [...photos];
  showFilters();

  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterClick);
  });

  renderCards(allPhotos);
};

export { initFilters };
