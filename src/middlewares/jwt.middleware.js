import jwt from "jsonwebtoken";
import config from "../config/config.js" 

const secretKeyJwt = config.secret_jwt;

export const jwtValidation = (req, res, next) => {
    try {
        console.log(req);
        const token = req.cookies.token;
        const userToken = jwt.verify(token, secretKeyJwt);
        req.user = userToken;
        next();
    } catch (error) {
        res.json({ error: error.message });
    }
};