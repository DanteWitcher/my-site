const winston = require('winston');
const ENV = process.env.NODE_ENV;

function getLogger() {
    const path = 'my-site';

    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV === 'development') ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;