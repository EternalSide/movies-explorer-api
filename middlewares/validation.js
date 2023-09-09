const { celebrate, Joi } = require('celebrate');
const { emailRegex } = require('../utils/regex');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(emailRegex),
    password: Joi.string().required().min(2),
  }),
});

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().pattern(emailRegex),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
  }),
});

const patchUserInfoValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
const postMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().url(),
    trailerLink: Joi.string().required().url(),
    thumbnail: Joi.string().required().url(),
    owner: Joi.string().length(24).hex().required(),
    movieId: Joi.number().length(24).hex().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
module.exports = {
  loginValidation,
  registerValidation,
  patchUserInfoValidation,
  deleteMovieValidation,
  postMovieValidation,
};
