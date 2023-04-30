const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(
      res
        .status(401)
        .send({ message: 'Необходима авторизация' }),
    );
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key');
  } catch (err) {
    return next(
      res
        .status(401)
        .send({ message: 'Необходима авторизация' }),
    );
  }
  req.user = payload;
  return next();
};
