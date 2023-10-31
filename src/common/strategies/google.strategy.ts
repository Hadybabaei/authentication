import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import UsersService from "../../services/users.service";


const userService = new UsersService();

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user: any, done) => {
    done(null, user);
  });
  
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.G_AUTH_CLIENT_ID as string,
        clientSecret: process.env.G_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5001/api/redirect",
        state: true,
        scope: ["profile"],
      },
  
      async (accessToken, refreshToken, profile, done) => {
        let user;
        if (profile?.emails?.length) {
          const email: string = profile.emails[0].value;
          user = await userService.getUserByEmail(email);
        }
        if (!user) {
          const userData = {
            googleId: profile.id,
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            name: profile.displayName,
            email: profile.emails?.[0].value,
            verified_status: true,
          };
          const newUser = await userService.googleAuthRegister(userData);
          if (newUser) {
            done(null, newUser);
          }
        } else {
          done(null, user);
        }
      }
    )
  );
  