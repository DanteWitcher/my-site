const winston = require('winston');
const ENV = process.env.NODE_ENV;

function getLogger(module) {

    const path = module.filename.split('\\').slice(-2).join('\\');

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