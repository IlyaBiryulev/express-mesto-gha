const userRouter = require('express').Router();

const {
  getAllUser,
  getUserId,
  updateUserProfile,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

userRouter.get('/users', getAllUser);

userRouter.get('/users/:userId', getUserId);

userRouter.get('/users/me', getUserInfo);

userRouter.patch('/users/me', updateUserProfile);

userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
