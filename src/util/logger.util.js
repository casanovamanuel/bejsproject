import winston from "winston";
import dirname from "../dirname.js"

const logger = winston.createLogger({

    transports: [
        new winston.transports.Console({
            level: "info"
        }),
        new winston.transports.File({ filename: dirname + "/../log/ecommerce.log", level: "warn" }),
    ],
});

const loggerMiddleware = (req, res, next) => {
    req.logger = logger
    req.logger.info(req.method + " " + req.url)
    next()
}

export default { loggerMiddleware, logger }