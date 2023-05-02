const rootRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const userRoute = require('./users');
const cardRouter = require('./cards');
const notFoundRouter = require('./notFound');

const LINK = require('../utils/constants');

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

rootRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK),
  }),
}), login);
rootRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK),
  }),
}), createUser);

rootRouter.use('/users', auth, userRoute);
rootRouter.use('/cards', auth, cardRouter);
rootRouter.use('*', notFoundRouter);

module.exports = rootRouter;
