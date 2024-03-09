import winston from "winston";
import config from "./config/config.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red",
        error: "white",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "white",
    },
};

winston.addColors(customLevels.colors);

export let logger;

if (config.environment === "production") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.File({
                level: "error",
                filename: "errors.log",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                ),
            }),
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({ all: true }),
                    winston.format.simple()
                ),
            }),
        ],
    });
} else {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ all: true }),
                    winston.format.simple()
                ),
            }),
        ],
    });
}

