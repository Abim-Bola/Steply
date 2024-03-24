import winston, { format } from "winston";

/**
 * Log errors to a file named combined.log
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'combined.log', level: 'error'}),
        new winston.transports.Console({
            format: format.combine(
              winston.format.colorize(),
              format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
              }),
              format.simple()
            ),
          }),
    ],
      // Stores all uncaught exceptions
  exceptionHandlers: [
    new winston.transports.Console({
      format: format.combine(
        winston.format.colorize(),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.simple()
      ),
    }),
  ],
});

export default logger