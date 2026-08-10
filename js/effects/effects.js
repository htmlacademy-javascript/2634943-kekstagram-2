import { DEFAULT_EFFECT, EFFECTS, INIT_SLIDER } from './effects-constants.js';

const form = document.querySelector('.img-upload__form');
const previewImage = form.querySelector('.img-upload__preview img');
const effectsPreview = form.querySelector('.effects__preview');

const sliderContainer = form.querySelector('.effect-level');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderValue = form.querySelector('.effect-level__value');

const effectsContainer = form.querySelector('.effects');

let currentEffect = DEFAULT_EFFECT;

noUiSlider.create(sliderElement, INIT_SLIDER);
const slider = sliderElement.noUiSlider;
sliderContainer.classList.add('hidden');

const updateSlider = () => {
  const { min, max, start, step } = EFFECTS[currentEffect];
  slider.updateOptions({
    range: {
      min,
      max,
    },
    start,
    step,
  });
};

const removeEffectClasses = () => {
  Object.keys(EFFECTS)
    .filter((effect) => effect !== 'none')
    .forEach((effect) => {
      effectsPreview.classList.remove(`effects__preview--${effect}`);
    });
};

const applyEffect = (effect) => {
  currentEffect = effect;

  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
    previewImage.style.filter = '';
    sliderValue.value = '';
    return;
  }

  sliderContainer.classList.remove('hidden');

  removeEffectClasses();
  effectsPreview.classList.add(`effects__preview--${effect}`);

  updateSlider();
  sliderValue.value = slider.get();
  previewImage.style.filter = EFFECTS[effect].filter(sliderValue.value);
};

effectsContainer.addEventListener('change', (evt) => {
  applyEffect(evt.target.value);
});

slider.on('update', () => {
  if (currentEffect === 'none') {
    return;
  }

  const value = Number(slider.get());
  previewImage.style.filter = EFFECTS[currentEffect].filter(value);
  sliderValue.value = value;
});

export const resetEffects = () => {
  removeEffectClasses();
  previewImage.style.filter = '';
  sliderContainer.classList.add('hidden');
  slider.set(EFFECTS.none.start);
  sliderValue.value = '';
};
