const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFound');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    if (e.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует.'));
    }
    if (e.name === 'ValidationError') {
      next(new BadRequestError(e.message));
    }
    return next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || 'TOP_SECRET',
      {
        expiresIn: '7d',
      },
    );

    return res.json({ token });
  } catch (e) {
    return next(e);
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail();

    return res.json(user);
  } catch (e) {
    console.log('fail');
    return next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      runValidators: true,
      new: true,
    });

    return res.json(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadRequestError(e.message));
    }
    if (e.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Пользователь не найден'));
    }
    if (e.code === 11000) {
      next(new ConflictError('Пользователь с таким email уже существует.'));
    }
    return next(e);
  }
};

module.exports = {
  loginUser,
  createUser,
  updateUser,
  getUserInfo,
};
