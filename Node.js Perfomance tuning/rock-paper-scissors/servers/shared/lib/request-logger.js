const morgan = require('morgan');
const logger = require('./logger');

const format  = 'dev';

morgan.token('requestId', request => request.id); // adding request id

const options  = {
    stream: {
        write: message => logger.info(message.trim()),
    },
};

module.exports = morgan(format, options);