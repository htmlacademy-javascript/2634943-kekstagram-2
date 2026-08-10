export const INIT_SLIDER = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      return parseFloat(value);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

export const DEFAULT_EFFECT = 'none';

export const EFFECTS = {
  none: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 0,
    filter: '',
  },

  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    filter: (value) => `grayscale(${value})`,
  },

  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    filter: (value) => `sepia(${value})`,
  },

  marvin: {
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    filter: (value) => `invert(${value}%)`,
  },

  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    filter: (value) => `blur(${value}px)`,
  },

  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    filter: (value) => `brightness(${value})`,
  },
};
