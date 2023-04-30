const router = require('express').Router();

const {
  getAllUser,
  getUserId,
  updateUserProfile,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getAllUser);

router.get('/:userId', getUserId);

router.get('/me', getUserInfo);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
