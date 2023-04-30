const userRouter = require('express').Router();

const {
  getAllUser,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getAllUser);

userRouter.get('/users/:userId', getUser);

userRouter.patch('/users/me', updateUserProfile);

userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
