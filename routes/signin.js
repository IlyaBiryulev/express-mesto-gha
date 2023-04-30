const authRouter = require('express').Router();

const { login } = require('../controllers/users');

authRouter.post('/signin', login);

module.exports = authRouter;
