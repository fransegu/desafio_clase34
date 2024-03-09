import mongoose from "mongoose";
import config from "../config/config.js" 
import { logger } from "../logger.js";

const URI = config.mongo_uri;
mongoose
    .connect(URI)
    .then(() => logger.info("Conectado a la DB"))
    .catch((error) => logger.error(error));