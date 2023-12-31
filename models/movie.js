const mongoose = require('mongoose');
const { urlRegex } = require('../utils/regex');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return urlRegex.test(url);
        },
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return urlRegex.test(url);
        },
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator(url) {
          return urlRegex.test(url);
        },
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;
