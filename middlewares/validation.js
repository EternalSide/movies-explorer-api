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
    email: Joi.string().min(2).max(30),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports = {
  loginValidation,
  registerValidation,
  patchUserInfoValidation,
};
