import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import passportJwt from "passport-jwt";
import Token from "../interfaces/token.interface";
import prisma from "../utils/database/prismaclient";
import UsersService from "../services/users.service";
import UsersInterface from "../interfaces/user.interface"

const userService = new UsersService();

const GoogleStrategy = passportGoogle.Strategy;

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtToken: Token, done) => {
      try {
        const user = await prisma.users.findUnique({
          where: { email: jwtToken.user.email },
        });

        if (user) {
          return done(null, user, jwtToken);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

