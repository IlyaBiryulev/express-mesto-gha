const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(200).send(data);
    })
    .catch(next);
};

module.exports.getAllUser = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

const userUpdate = (req, res, upData, next) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, upData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserProfile = (req, res) => {
  const upData = req.body;
  userUpdate(req, res, upData);
};

module.exports.updateUserAvatar = (req, res) => {
  const upData = req.body;
  userUpdate(req, res, upData);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: 'Успешный вход' });
    })
    .catch(next);
};
