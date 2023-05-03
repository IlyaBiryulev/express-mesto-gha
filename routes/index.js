const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const userRoute = require('./users');
const cardRouter = require('./cards');
const { notFound } = require('../controllers/notFound');

const LINK = require('../utils/constants');

const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(LINK),
  }),
}), createUser);

router.use('/users', auth, userRoute);
router.use('/cards', auth, cardRouter);
router.use('*', auth, notFound);

module.exports = router;
