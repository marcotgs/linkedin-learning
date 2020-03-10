const express = require('express');
var expressRequestId = require('express-request-id')();
const requestLogger = require('../shared/lib/request-logger');

const app = express();

app.use(expressRequestId);

app.set('x-powered-by', false);

app.use(express.json());

app.use(requestLogger);

app.use(require('./router'));

module.exports = app;
