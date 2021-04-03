// -----------------------------------------------------------------------------
// JSON Web Token Strategy for Passport.js
// -----------------------------------------------------------------------------

import passport from 'passport'; // Passport.js
import passportJwt from 'passport-jwt'; // Passport.js JWT Strategy
import ora from 'ora'; // CLI Spinner
import database from '../../models/index.mjs'; // MongoDB Database

const { User } = database; // Import User Model
const { ExtractJwt, Strategy } = passportJwt;
const { JWT_SECRET } = process.env; // Environment Variables

const options = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = passport.use(
  new Strategy(options, async (token, done) => {
    // Initialize spinner outside of try / catch statement
    const spinner = ora(`User Authentication: ${token.email}`).start();
    try {
      const user = await User.findById(token.id);

      if (!user) {
        spinner.fail();
        return done(null, false, { message: 'Invalid User' });
      }

      spinner.succeed();
      return done(null, user);
    } catch (error) {
      spinner.fail(`User Authentication Error: “${error.message}”`);
      done(error);
    }
  })
);

export default jwtStrategy;
