const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const LINK = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    /* required: true, */
    minlength: [2, 'Минимальная длина поля "name" 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    /* required: true, */
    minlength: [2, 'Минимальная длина поля "about" 2 символа'],
    maxlength: [30, 'Максимальная длина поля "about" 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    /* required: true, */
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (avatar) => LINK.test(avatar),
      message: 'Некорректная ссылка на картинку аватара',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            throw new AuthError('Неправильная почта или пароль');
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                throw new AuthError('Неправильная почта или пароль');
              }
              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
