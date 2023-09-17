const express = require('express');

const router = express.Router();

const { getUserInfo, updateUser } = require('../controllers/users');
const { patchUserInfoValidation } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch('/me', patchUserInfoValidation, updateUser);

module.exports = router;
