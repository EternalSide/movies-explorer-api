// Routes Import
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const { loginUser, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

module.exports = {
  usersRoute,
  moviesRoute,
  loginUser,
  createUser,
  auth,
};
