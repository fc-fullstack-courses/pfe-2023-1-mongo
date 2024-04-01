const rootRouter = require('express').Router();
const manufacturersRouter = require('./manufacturersRouter');

rootRouter.use('/manufacturers', manufacturersRouter);

module.exports = rootRouter;