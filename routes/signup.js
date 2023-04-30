const authRouter = require('express').Router();

const { createUser } = require('../controllers/users');

authRouter.post('/signup', createUser);

module.exports = authRouter;
