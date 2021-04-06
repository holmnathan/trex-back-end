// Passport Strategy: Local ---------------------------------------------------
import passport from 'passport'; // Passport.js,
import passportLocal from 'passport-local'; // Passport.js JWT Strategy,
import ora from 'ora'; // CLI Spinner,
import { User } from '../../models/database.mjs'; // MongoDB Database Models,
import jwtIssuer from '../../lib/jwtIssuer.mjs'; // JWT Token Generator.

// Global Variables -----------------------------------------------------------
const { Strategy } = passportLocal;

const options = {
  // Strategy Options
  usernameField: 'email', // Change "username" variable to "email."
  session: false,
  passReqToCallback: true, // Access Post Request body.
};

// Strategies -----------------------------------------------------------------
// USER REGISTRATION:
const register = passport.use(
  'create',
  new Strategy(options, async (request, email, password, done) => {
    // Initialize spinner outside of Try / Catch statement.
    const spinner = ora(`Create User: ${email}`).start();
    try {
      // Attempt user creation.
      const { fullName, displayName } = request.body; // Get Post Request body.
      console.log(fullName);
      const user = await User.create({
        email,
        password,
        fullName,
        displayName,
      });

      console.log(user);
      // Generate a JWT and return the user if successful.
      const tokenObject = await jwtIssuer(user);
      const { _id } = await user;
      return done(
        null,
        { ...tokenObject, email, fullName, displayName, _id },
        { message: 'User Created' }
      );
    } catch (error) {
      // Return server error.
      spinner.fail(`Create User: ${email} (${error.message})`);
      return done(error.message);
    }
  })
);

// USER LOGIN:
const login = passport.use(
  'login',
  new Strategy(options, async (request, email, password, done) => {
    // Initialize spinner outside of try / catch statement.
    const spinner = ora(`Log In: ${email}`).start();
    try {
      // Find User by email address.
      const user = await User.findByEmail(email);
      // Return failure message if user not found.
      if (!user) {
        spinner.fail(`Log In: ${email} (User Not Found)`);
        return done(null, false, { message: 'User Not Found' });
      }
      // Validate User’s password.
      const validate = await user.validPassword(password);
      // Return failure message if password incorrect.
      if (!validate) {
        spinner.fail(`Log In: ${email} (Incorrect Password)`);
        return done(null, false, { message: 'Incorrect Password' });
      }
      // Generate a JWT and return the user if successful.
      const tokenObject = jwtIssuer(user);
      const { fullName, displayName, _id } = user;
      spinner.succeed();
      return done(
        null,
        { ...tokenObject, email, fullName, displayName, _id },
        { message: 'Login Successful' }
      );
    } catch (error) {
      // Catch Server Error
      spinner.fail(`Log In: ${email} (${error.message})`);
      return done(error.message);
    }
  })
);

export default { register, login };
