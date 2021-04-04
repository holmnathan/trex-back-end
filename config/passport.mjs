// Passport User Authentication -----------------------------------------------
import passport from 'passport'; // Passport.js,

// Passport Strategies --------------------------------------------------------
import jwtStrategy from './strategies/jwtStrategy.mjs'; // JSON Web Token Strategy,
import localStrategy from './strategies/localStrategy.mjs'; // Local Strategy.

// Passport Configuration
// ----------------------------------------------------------------------------
const passportConfig = (app) => {
  // Callback "app" function argument from "/app.js"
  app.use(passport.initialize()); // Initialize Passport
  // Serialize User.
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  // Deserialize User.
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};

export default passportConfig;
