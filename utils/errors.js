const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

module.exports.errors = (err, res) => {
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
  return res.status(INTERNAL_SERVER_ERROR).send({
    message: `Произошла ошибка ${err.name}: ${err.message}`,
  });
};
