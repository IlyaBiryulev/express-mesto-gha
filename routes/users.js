const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const LINK = require('../utils/constants');

const {
  getAllUser,
  updateUserProfile,
  updateUserAvatar,
  getUser,
} = require('../controllers/users');

router.get('/', getAllUser);

router.get('/me', getUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(LINK),
  }),
}), updateUserAvatar);

module.exports = router;
