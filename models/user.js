const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');
const UnauthorizedError = require('../errors/Unauthorized');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email обязателен к заполнению'],
      minlength: 2,
      maxlength: 100,
      unique: true,
      validate: {
        validator(email) {
          return /^\S+@\S+\.\S+$/.test(email);
        },
        message: 'Введите правильный Email',
      },
    },
    password: {
      type: String,
      required: [true, 'Пароль обязателен к заполнению'],
      select: false,
    },

    name: {
      type: String,
      required: [true, 'Имя обязательно к заполнению'],
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new UnauthorizedError('Пользователь не найден.');
  }

  const passwordMatched = await bcrypt.compare(password, user.password);

  if (!passwordMatched) {
    throw new UnauthorizedError('Неправильная почта или пароль.');
  }

  return user;
};

const User = model('user', userSchema);

module.exports = User;
