/*
 * bada55
 * https://github.com/dciccale/bada55
 * Copyright © 2016 Denis Ciccale
 * https://denis.mit-license.org
 */

'use strict';

const LETTER_NUMBER_MAP = {
  'i': 1,
  'l': 1,
  'r': 2,
  'z': 2,
  // 'e': 3,
  // 'a': 4,
  's': 5,
  'g': 6,
  't': 7,
  'b': 8,
  'o': 0
};

const MAX_INT = 9007199254740992;
const MIN_INT = -MAX_INT;
const CONSONANTS = 'bcdglrstz';
const VOWELS = 'aeio';
const ALL = CONSONANTS + VOWELS;

function integer(options) {
  const defaults = {min: MIN_INT, max: MAX_INT};
  options = Object.assign({}, defaults, options);
  return Math.floor(Math.random() * (options.max - options.min + 1) + options.min);
}

function natural(options) {
  const defaults = {min: 0, max: MAX_INT};
  options = Object.assign({}, defaults, options);
  return integer(options);
}

function character(pool) {
  return pool.charAt(natural({max: (pool.length - 1)}));
}

function syllable(options) {
  const length = natural({min: 2, max: 3});
  let text = '';
  let chr;

  for (let i = 0; i < length; i++) {
    if (i === 0) {
      chr = character(ALL);
    } else if (CONSONANTS.indexOf(chr) === -1) {
      chr = character(CONSONANTS);
    } else {
      chr = character(VOWELS);
    }
    text += chr;
  }

  return text;
}

function word(options) {
  const defaults = {length: 6};
  options = Object.assign({}, defaults, options);

  if (options.length < defaults.length && options.length !== 3) {
    options = Object.assign({}, defaults);
  }

  let text = '';

  while (text.length < options.length) {
    text += syllable();
  }

  text = text.substring(0, options.length);

  return text;
}

function bada55(options) {
  const w = word(options);

  const h = w
    .split('')
    .map((l) => typeof LETTER_NUMBER_MAP[l] !== 'undefined' ? LETTER_NUMBER_MAP[l] : l)
    .join('');

  const res = {
    hex: h.toUpperCase(),
    txt: w.toUpperCase()
  };

  console.log(res);

  return res;
};

if (!module.parent) {
  bada55();
}

module.exports = bada55;
