import winston, { format, Logform, Logger } from 'winston';
import { ConsoleTransportOptions } from "winston/lib/winston/transports";

// Custom logging levels
const loggingLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4
    }
};

// Options for console logging
const consoleOptions: ConsoleTransportOptions = {
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    handleExceptions: true
};

// Configuration for logging format and transports
const logger: Logger = winston.createLogger({
    exitOnError: false,
    format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.printf((info: Logform.TransformableInfo) => `[${info.level.toUpperCase()}] ${info.timestamp} ${info.message}`)
    ),
    levels: loggingLevels.levels,
    transports: [
        new (winston.transports.Console)(consoleOptions)
    ]
});

export default logger;