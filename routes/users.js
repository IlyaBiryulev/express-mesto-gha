const userRouter = require('express').Router();

const {
  getAllUser,
  createUser,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/users', getAllUser);

userRouter.get('/users/:userId', getUser);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', updateUserProfile);

userRouter.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRouter;
