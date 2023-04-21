const notFoundRouter = require('express').Router();

const { notFound } = require('../controllers/notFound');

notFoundRouter.all('/404', notFound);

module.exports = notFoundRouter;
