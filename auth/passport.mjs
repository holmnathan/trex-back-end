// User Authentication using Passport.js Strategies and JSON Web Tokens.

import passport from "passport";
import passportLocal from "passport-local";
import ora from "ora";
import database from "../models/index.mjs";

const { User } = database;
const LocalStrategy = passportLocal.Strategy;

// Local Strategy
//-----------------------------------------------------------------------------

const localOptions = {
  usernameField: "email",
  session: false,
  passReqToCallback: true
}
const localStrategy = passport.use(new LocalStrategy(
  localOptions,
  async (req, username, password, done) => {
    // Initialize user variable outside of try / catch statement
    let user;
    const spinner = ora(`Authentication: ${username}`).start();
    try {
      user = await User.findOne({ email: username });
      
      if (!user) {
        spinner.fail();
        return done(null, false, { message: "Invalid User" });
      }
      
      const validPassword = await user.validPassword(password);
      
      if (!validPassword) {
        spinner.fail();
        return done(null, false, { message: "Incorrect password" });
      }
      
      spinner.succeed();
      return done(null, user);
    } catch (error) {
      spinner.fail(`User Authentication Error: “${error.message}”`);
      return done(error);
    }
  }
));

export default localStrategy;