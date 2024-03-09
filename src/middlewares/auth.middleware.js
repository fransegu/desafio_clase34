import jwt from "jsonwebtoken";
import config from "../config/config.js" 
import CustomError from "../errors/error.generate.js";
import { ErrorMessages, ErrorName } from "../errors/error.enum.js";


const secretKeyJwt = config.secret_jwt;



export const authMiddleware = (roles) => {
    return (req, res, next) => {
        const token = req.cookies.token;
        const userToken = jwt.verify(token, secretKeyJwt);
        req.user = userToken;
        console.log(req.user);
        if (roles.includes(req.user.role)) {
            return next();
        }
        if (!roles.includes(req.user.role)) {
            return CustomError.generateError(ErrorMessages.USER_NOT_AUTORIZED,403,ErrorName.USER_NOT_AUTORIZED);
        }
        next();
    };
};