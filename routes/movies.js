const express = require('express');

const { celebrate, Joi } = require('celebrate');

const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

const router = express.Router();

router.get('/', getMovies);
router.post('/', postMovie);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
