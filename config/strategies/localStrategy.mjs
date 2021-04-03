import passport from 'passport';
import passportLocal from 'passport-local';
import ora from 'ora';
import database from '../../models/index.mjs'; // MongoDB Database
import issueJwt from '../../lib/issueJwt.mjs';

const { User } = database; // Import User Model
const { Strategy } = passportLocal;

const options = {
  usernameField: 'email',
  session: false,
  passReqToCallback: true,
  failWithError: true,
};

const create = passport.use(
  'create',
  new Strategy(options, async (request, email, password, done) => {
    const { full_name, display_name } = request.body;
    // Initialize spinner outside of try / catch statement
    const spinner = ora(`Create User: ${email}`).start();
    try {
      const user = await User.create({
        email,
        password,
        full_name,
        display_name,
      });
      spinner.succeed();
      return done(null, user);
    } catch (error) {
      spinner.fail(`Create User: ${email} (${error.message})`);
      return done(null, false, { message: error.message });
    }
  })
);

const login = passport.use(
  'login',
  new Strategy(options, async (request, email, password, done) => {
    // Initialize spinner outside of try / catch statement
    const spinner = ora(`Log In: ${email}`).start();
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        spinner.fail();
        throw new Error('User not found');
      }

      const validate = await user.validPassword(password);
      if (!validate) {
        spinner.fail();
        throw new Error('Incorrect Password');
      }
      const tokenObject = issueJwt(user);
      spinner.succeed();
      return done(null, user, { message: 'Login Successful' });
    } catch (error) {
      spinner.fail(`Log In: ${email} (${error.message})`);
      return done(null, false, { message: error.message });
    }
  })
);

export default { create, login };
