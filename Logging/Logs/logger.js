import { createLogger, transports, format } from "winston";
import path from "path";
import { fileURLToPath } from "url";

const { combine, timestamp, printf, colorize } = format;

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

const getFileName = (filename) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const file = path.join(__dirname, filename + ".log");
    return file;
};

const logger = createLogger({
    levels: logLevels,
    // eslint-disable-next-line no-undef
    level: process.env.LOG_LEVEL || "info",
    transports: [
        new transports.File({
            filename: getFileName("logs"),
            format: combine(
                timestamp({
                    format: "YYYY-MM-DD hh:mm:ss.SSS A",
                }),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
        new transports.Console({
            format: combine(
                colorize({ all: true }),
                timestamp({
                    format: "YYYY-MM-DD hh:mm:ss.SSS A",
                }),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        })
    ]
});

const healthLogger = createLogger({
    transports: [
        new transports.File({
            filename: getFileName("healthlogs"),
            format: combine(
                timestamp({
                    format: "YYYY-MM-DD hh:mm:ss.SSS A",
                }),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
    ]
});

export {healthLogger};
export default logger;