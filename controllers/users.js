const User = require('../models/user');

const { errors } = require('../utils/errors');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => errors(err, res));
};

module.exports.getAllUser = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => errors(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errors(err, res));
};

const userUpdate = (req, res, upData) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, upData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errors(err, res));
};

module.exports.updateUserProfile = (req, res) => {
  const upData = req.body;
  userUpdate(req, res, upData);
};

module.exports.updateUserAvatar = (req, res) => {
  const upData = req.body;
  userUpdate(req, res, upData);
};
