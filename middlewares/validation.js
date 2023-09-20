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
    movieId: Joi.number().required(),
  }),
});
const postMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().required(),
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
