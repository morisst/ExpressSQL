import logger from "./logger.js";


const logtheRequest = (req, res, next) => {
    const log = `Request recieved from ${req.hostname} on path "${req.originalUrl}" with ${req.method} method `
    logger.info(log)
    next();
}

export default logtheRequest