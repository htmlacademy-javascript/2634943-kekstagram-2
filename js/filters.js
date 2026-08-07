import { renderCards, clearCards } from './render-cards.js';
import { debounce } from './util.js';

const filtersElement = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

let currentFilter = 'default';
let allPhotos = [];

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const filterDefault = (photos) => photos;

const filterRandom = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};

const filterDiscussed = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (filterType, photos) => {
  clearCards();

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
}, 500);

const onFilterClick = (evt) => {
  const filterType = evt.target.id.replace('filter-', '');

  if (filterType === currentFilter) {
    return;
  }

  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');

  currentFilter = filterType;
  debouncedApplyFilter(currentFilter, allPhotos);
};

const initFilters = (photos) => {
  allPhotos = photos;
  showFilters();

  filterButtons.forEach((button) => {
    button.addEventListener('click', onFilterClick);
  });

  renderCards(allPhotos);
};

export { initFilters };
