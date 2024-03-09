import passport from "passport";
import { logger } from "./logger.js"
import { usersManager} from "../src/DAL/daos/MongoDB/usersManagerDB.js";
import { cartManager } from "../src/DAL/daos/MongoDB/cartsManagerDB.js"
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { hashData, compareData } from "./utils.js";
import UsersResponse from "./DAL/dtos/users-response.dto.js";

import config from "../src/config/config.js";

const secretKeyJwt = config.secret_jwt;
passport.use("signup", new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) => {
        const { name, lastName } = req.body;
        if (!name || !lastName || !email || !password) {
            return done(null, false, {message: 'All fields are required'});
        }
        const cart = await cartManager.createOne();
        
        try {
            const hashedPassword = await hashData(password);
            const createdUser = await userManager.createOne({
            ...req.body,
            password: hashedPassword,
            cartId : cart._id,
            });
            done(null, createdUser);
        } catch (error) {
            done(error);
        }
        }
    )
);

passport.use("login", new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        const req = this;
        if (!email || !password) {
            return done(null, false, { message: "Email and password are required" });
        }
        try {
            const user = await usersManager.findByEmail(email);
            if (!user) {
                return done(null, false, { message: "User not found" });
            }
            
            const isPasswordValid = await compareData(password, user.password);
            if (!isPasswordValid) {
                return done(null, false, { message: "Invalid password" });
            }
            logger.info("passport", user);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

passport.use("github", 
    new GithubStrategy (
        {
        clientID: "Iv1.f644c6a8ca45697d",
        clientSecret: "23f83507f12a37c5e5fad41860d63ddee5f9a8d7",
        callbackURL: "http://localhost:8080/api/session/callback",
        scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                
                const userDB = await usersManager.findByEmail(profile.emails[0].value);
                if (userDB) {
                    return done(null, userDB);
                    } 
                const cart = await cartManager.createOne();
                const infoUser = {
                    name: profile._json.name.split(" ")[0], 
                    lastName: profile._json.name.split(" ")[1],
                    email: profile.emails[0].value,
                    password: " ",
                    cartId: cart._id,
                };
                logger.info(infoUser);
                const createdUser = await usersManager.createOne(infoUser);
                done(null, createdUser);
                } catch (error) {
                    logger.error("created fail")
                    done(error);
                }
        }
    )
);
// GOOGLE

passport.use("google", 
    new GoogleStrategy (
        {
        clientID: "1079491619055-4f63l94qot4egaas8vbe0pd340u1bdva.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8080/api/session/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                const userDB = await usersManager.findByEmail(profile._json.email);
                if (userDB) {
                    return done(null, userDB);
                    } 
                
                const cart = await cartManager.createOne();

                const infoUser = {
                    name: profile._json.given_name,
                    lastName: profile._json.family_name,
                    email: profile._json.email,
                    password: " ",
                    cartId: cart._id,                };
                const createdUser = await usersManager.createOne(infoUser);
                done(null, createdUser);
                } catch (error) {
                done(error);
                }
        }
    )
);
const fromCookies = (req) => {
    return req.cookies.token;
}
passport.use('current', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
    secretOrKey: secretKeyJwt,
}, async (jwt_payload, done) => {
    try {
        const user = await usersManager.findByEmail(jwt_payload.mail);
        if (!user) {
            return done(null, false, { message: 'User not founded' });
        }
        const userDTO =  new UsersResponse(user)
        return done(null, userDTO);}
            catch (error) {
                return error
            }
}));

passport.use(
    "jwt",
    new JWTStrategy(
    {
        //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: ExtractJwt.fromExtractors([fromCookies]),
        secretOrKey: secretKeyJwt,
    },
    async function (jwt_payload, done) {
       done(null, jwt_payload);
    }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersManager.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});