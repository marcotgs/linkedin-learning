const winston = require('winston');

const { prettyPrint, colorize, timestamp } = winston.format;

const logger = winston.createLogger({
    format: winston.format.combine(prettyPrint(), colorize(), timestamp()),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = logger;