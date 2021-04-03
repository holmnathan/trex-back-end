// User Authentication using Passport.js Strategies
// -----------------------------------------------------------------------------
// Passport.js
import passport from 'passport';
// JSON Web Token Strategy
import jwtStrategy from './strategies/jwtStrategy.mjs';
import localStrategy from './strategies/localStrategy.mjs';

const passportConfig = (app) => {
  app.use(passport.initialize());

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

export default passportConfig;
