const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const uniqueHashtags = new Set();

  return hashtags.every((hashtag) => {
    const isValidHashtag = /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);

    if (!isValidHashtag || uniqueHashtags.has(hashtag)) {
      return false;
    }

    uniqueHashtags.add(hashtag);
    return true;
  });
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Введите корректные хэштеги'
);

pristine.addValidator(
  commentInput,
  validateComment,
  `Комментарий не должен превышать ${MAX_COMMENT_LENGTH} символов`
);

export const resetValidation = () => {
  pristine.reset();
};

export const isValid = () => pristine.validate();

