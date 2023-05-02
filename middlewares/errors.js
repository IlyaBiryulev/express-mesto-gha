const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

const AuthError = require('../errors/AuthError');
const forbiddenErrors = require('../errors/forbiddenErrors');
const notFoundError = require('../errors/notFoundError');

module.exports.errors = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(BAD_REQUEST).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({
      message: 'Пользователь с таким ID не найден',
    });
  }
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST).send({
      message: `Некорректный ID: ${err.value}`,
    });
  }
  if (err instanceof AuthError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof forbiddenErrors) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof notFoundError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(409).send({
      message: 'Указанный email уже зарегистрирован.',
    });
  }
  res.status(INTERNAL_SERVER_ERROR).send({
    message: `На сервере произошла ошибка ${err.name}: ${err.message}`,
  });
  return next();
};
