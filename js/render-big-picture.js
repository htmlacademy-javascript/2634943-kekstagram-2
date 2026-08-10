const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentCountBlockElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let currentComments = [];
let shownCommentsCount = 0;

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarElement = document.createElement('img');
  avatarElement.classList.add('social__picture');
  avatarElement.src = comment.avatar;
  avatarElement.alt = comment.name;
  avatarElement.width = 35;
  avatarElement.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(textElement);

  return commentElement;
};

const renderMoreComments = () => {
  const nextCommentsCount = Math.min(
    shownCommentsCount + COMMENTS_STEP,
    currentComments.length
  );

  const commentsFragment = document.createDocumentFragment();

  for (let i = shownCommentsCount; i < nextCommentsCount; i++) {
    const commentElement = createCommentElement(currentComments[i]);
    commentsFragment.appendChild(commentElement);
  }

  commentsListElement.appendChild(commentsFragment);

  shownCommentsCount = nextCommentsCount;
  commentShownCountElement.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const renderBigPicture = (photo) => {
  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;

  likesCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  currentComments = photo.comments;

  commentTotalCountElement.textContent = currentComments.length;

  commentsListElement.innerHTML = '';
  shownCommentsCount = 0;

  commentCountBlockElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');

  renderMoreComments();
};

const openBigPicture = (photo) => {
  renderBigPicture(photo);
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

closeButtonElement.addEventListener('click', () => {
  closeBigPicture();
});

commentsLoaderElement.addEventListener('click', () => {
  renderMoreComments();
});

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

export { openBigPicture };
