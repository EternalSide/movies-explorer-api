const express = require('express');
const cors = require('cors');

const app = express();
require('dotenv').config();
const helmet = require('helmet');

// Erors Import
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/NotFound');

// Configuration
const PORT = process.env.PORT || 3001;

// const limiter = require('./utils/limiter');

const corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
};

// Routes Import
const {
  usersRoute,
  moviesRoute,
  loginUser,
  createUser,
  auth,
} = require('./routes/index');

// Validation
const {
  loginValidation,
  registerValidation,
} = require('./middlewares/validation');

// Utils
const { connectToDb } = require('./utils/connectToDb');
const { crashTest } = require('./utils/crashTest');

// Middleware
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
// app.use(limiter);

// Crash Test
app.get('/crash-test', crashTest);

// Auth
app.post('/signin', loginValidation, loginUser);
app.post('/signup', registerValidation, createUser);

// Защищенные Роуты
app.use(auth);
app.use('/users', usersRoute);
app.use('/movies', moviesRoute);

// Ошибки
app.use((req, res, next) => next(new NotFoundError('Некорректный запрос')));
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

connectToDb();
app.listen(PORT, () => console.log(`Сервер Запущен, Порт:${PORT}`));
