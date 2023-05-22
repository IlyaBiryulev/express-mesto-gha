const LINK = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/im;

const allowedCors = [
  'https://mestofulldomen.nomoredomains.monster',
  'https://api.mestofulldomen.nomoredomains.monster',
  'http://158.160.30.248',
  'https://158.160.30.248',
  'http://localhost:3000',
  'http://localhost:3001',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  LINK,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
