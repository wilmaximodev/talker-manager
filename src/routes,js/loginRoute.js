const express = require('express');

const loginRoute = express.Router();
const { checkEmail, checkPassword } = require('../middlewares/checkLogin');
const genToken = require('../utils/tokenGenerate');

const HTTP_OK_STATUS = 200;

loginRoute.post('/', checkEmail, checkPassword, (_req, res) => {
  const token = genToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = loginRoute;