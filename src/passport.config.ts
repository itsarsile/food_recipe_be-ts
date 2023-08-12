import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { findUniqueUserById } from "./api/users/users.service";
import * as dotenv from 'dotenv';
import c from "config";
dotenv.config()

const configurePassport = passport.use(
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const user = await findUniqueUserById(token.user.id);
        if (user.length !== 0) {
          return done(null, token, false);
        }

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default configurePassport;
