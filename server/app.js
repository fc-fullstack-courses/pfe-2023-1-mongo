const express = require('express');
const rootRouter = require('./routers');
const { basicErrorHandler } = require('./middlewares/errors');

const app = express();

app.use(express.json());
app.use(rootRouter);

app.use(basicErrorHandler);

module.exports = app;