const BadRequestError = require('../errors/BadRequest');
const ForbiddenError = require('../errors/Forbidden');
const NotFoundError = require('../errors/NotFound');
const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const userMovies = await Movie.find({ owner: req.user._id });

    return res.json(userMovies);
  } catch (e) {
    return next(e);
  }
};

const postMovie = async (req, res, next) => {
  try {
    const movieInfo = req.body;

    const newMovie = await Movie.create({
      ...movieInfo,
      owner: req.user._id,
    });

    return res.status(201).json(newMovie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError(e.message));
    }
    return next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId).orFail();
    const isUserOwner = movie.owner.toString() === req.user._id;

    if (!isUserOwner) {
      throw new ForbiddenError(
        'У вас нет прав удалить этот фильм из сохраненных.',
      );
    }

    const deletedMovie = await Movie.deleteOne(movie).orFail();

    return res.json({ message: 'Фильм удален из сохраненных', deletedMovie });
  } catch (e) {
    if (e.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Фильм не найден'));
    }
    if (e.name === 'CastError') {
      return next(new NotFoundError('Некорректный ID'));
    }
    return next(e);
  }
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
