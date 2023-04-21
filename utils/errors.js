const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const {
  ValidationError,
  DocumentNotFoundError,
} = require('mongoose').Error;

module.exports.errors = (err, res) => {
  if (err.name instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(BAD_REQUEST).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err.name instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND).send({
      message: 'Пользователь с таким ID не найден',
    });
  }
  return res.status(INTERNAL_SERVER_ERROR).send({
    message: `Произошла ошибка ${err.name}: ${err.message}`,
  });
};
