const NotFoundError = require('../errors/NotFoundErrors');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError('Несуществующий URL'));
};
