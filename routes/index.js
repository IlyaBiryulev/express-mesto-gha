const rootRouter = require('express').Router();

const userRoute = require('./users');
const cardRouter = require('./cards');
const notFoundRouter = require('./notFound');

const auth = require('../middlewares/auth');

rootRouter.use('/users', auth, userRoute);
rootRouter.use('/cards', auth, cardRouter);
rootRouter.use('*', notFoundRouter);

module.exports = rootRouter;
