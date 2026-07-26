const SCALE = {
    MIN: 25,
    MAX: 100,
    STEP: 25,
    DEFAULT: 100,
};

const form = document.querySelector('.img-upload__form');
const scaleControl = form.querySelector('.scale__control--value');
const scaleSmallerButton = form.querySelector('.scale__control--smaller');
const scaleBiggerButton = form.querySelector('.scale__control--bigger');
const previewImage = form.querySelector('.img-upload__preview img');

let currentScale = SCALE.DEFAULT;

const updateScale = () => {
    previewImage.style.transform = `scale(${currentScale / 100})`;
    scaleControl.value = `${currentScale}%`;
};

const changeScale = (step) => {
    currentScale = Math.min(
        SCALE.MAX,
        Math.max(SCALE.MIN, currentScale + step)
    );
    updateScale();
};

scaleSmallerButton.addEventListener('click', () => {
    changeScale(-SCALE.STEP);
});

scaleBiggerButton.addEventListener('click', () => {
    changeScale(SCALE.STEP);
});

updateScale(currentScale);

export const resetScale = () => {
    currentScale = SCALE.DEFAULT;
    updateScale(currentScale);
}