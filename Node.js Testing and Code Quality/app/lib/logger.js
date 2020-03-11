const { createLogger, format, transports } = require('winston');
const { combine, colorize, json, simple, timestamp, prettyPrint } = format;


const logger = createLogger({
    level: 'info',
    format: combine(json(), timestamp()),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(simple, colorize, timestamp, prettyPrint)
    }));
}

module.exports = logger;