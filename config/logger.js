import winston from "winston";
const { combine, timestamp, printf, errors } = winston.format;

const customFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} [${level}]: ${stack || message}`
})

const logger = new winston.createLogger({
    level: "info",
    format: combine(
        timestamp(),
        errors({stack: true}),
        customFormat
    ),
    transports: [
        // console transport
        new winston.transports.Console({
            format: combine(
                timestamp(),
                customFormat
            )
        }),
        
        // file transport for logging in file
        new winston.transports.File({
            filename: "combined.logs",
            format: combine(
                timestamp(),
                customFormat
            )
        }),

        // for error logs only in a file
        new winston.transports.File({
            filename: "error.logs",
            level: 'error',
            format: combine(
                timestamp(),
                customFormat
            )
        })
    ]
});

// handling uncaught exceptions

logger.exceptions.handle(
    new winston.transports.File({filename: 'exception.logs'})
);

process.on('unhandledRejection', (exception) => {
    throw exception
});

export default logger;