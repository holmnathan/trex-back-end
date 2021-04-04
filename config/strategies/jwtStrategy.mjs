// Passport Strategy: JSON Web Tokens (JWT) -----------------------------------

import passport from 'passport'; // Passport.js,
import passportJwt from 'passport-jwt'; // Passport.js JWT Strategy,
import ora from 'ora'; // CLI Spinner,
import database from '../../models/database.mjs'; // MongoDB Database Models.

// Global Variables -----------------------------------------------------------
const { ExtractJwt, Strategy } = passportJwt;
const { JWT_SECRET } = process.env; // Environment Variables.

const options = {
  // Strategy Options
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract Token from Request Header.
  secretOrKey: JWT_SECRET,
  session: false,
};
// Strategies -----------------------------------------------------------------
// JSON WEB TOKEN STRATEGY:
const jwtStrategy = passport.use(
  new Strategy(options, async (token, done) => {
    // Initialize spinner outside of try / catch statement.
    const spinner = ora(`User Authentication: ${token.email}`).start();
    try {
      // Get User by Token ID.
      const user = await database.User.findById(token.id);
      // Return failure message if user not found.
      if (!user) {
        spinner.fail();
        return done(null, false, { message: 'User Not Found' });
      }
      // Return the user if found.
      spinner.succeed();
      return done(null, user);
    } catch (error) {
      // Return Server Error
      spinner.fail(`User Authentication Error: “${error.message}”`);
      return done(error.message);
    }
  })
);

export default jwtStrategy;
