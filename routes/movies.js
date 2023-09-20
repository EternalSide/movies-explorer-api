const express = require('express');

const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const {
  deleteMovieValidation,
  postMovieValidation,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/', getMovies);
router.post('/', postMovieValidation, postMovie);

router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
