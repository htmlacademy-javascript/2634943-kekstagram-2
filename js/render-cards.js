import { openBigPicture } from './render-big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = (photo) => {
  const newPictureElement = pictureTemplate.cloneNode(true);

  const img = newPictureElement.querySelector('.picture__img');
  const likes = newPictureElement.querySelector('.picture__likes');
  const commentsCount = newPictureElement.querySelector('.picture__comments');

  img.src = photo.url;
  img.alt = photo.description;
  likes.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;

  newPictureElement.addEventListener('click', () => {
    openBigPicture(photo);
  });

  return newPictureElement;
};

export const renderCards = (photos) => {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const newCardElement = createPictureElement(photo);
    picturesFragment.appendChild(newCardElement);
  });

  picturesContainerElement.appendChild(picturesFragment);
};

export const clearCards = () => {
  const pictures = picturesContainerElement.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};
