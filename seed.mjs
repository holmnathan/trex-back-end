import ora from 'ora';
import database from './models/database.mjs';

// CREATE USER:
const RegisterUser = (candidateUser) => {
  const spinner = ora('Create User').start();
  setTimeout(async () => {
    try {
      const user = await new database.User(candidateUser);

      await user.save();

      spinner.succeed(`User Created | ${user.fullName}`);
      process.exit();
    } catch (error) {
      spinner.fail(`User Not Created | ${error.message}`);
      process.exit(1);
    }
  }, 1000);
};
// registerUser({
//   fullName: "Tester",
//   email: "burger@king.com",
//   password: "1234test",
// });

// VALIDATE PASSWORD:
const validatePassword = async (candidateEmail, candidatePassword) => {
  try {
    // Find User by candidate email address
    const user = await database.User.findOne({
      email: candidateEmail,
    });

    // Throw error if the user is not found.
    if (!user) throw new Error('User Not Found.');

    // Validate password in database against candidate password
    await user.validPassword(candidatePassword);
    process.exit();
  } catch (error) {
    console.log(`Password Validation Error: (${error.message})`);
    process.exit(1);
  }
};
// validatePassword("burger@king.com", "1234test");

// DELETE ALL USERS:
const deleteAllUsers = () => {
  const spinner = ora('Delete All Users').start();
  setTimeout(async () => {
    try {
      const deletedUsers = await database.User.deleteMany();
      spinner.succeed(
        `Delete All Users: (${deletedUsers.deletedCount} Deleted)`
      );
      process.exit();
    } catch (error) {
      spinner.fail(`Delete All Users: (${error.message})`);
      process.exit(1);
    }
  });
};
// deleteAllUsers();

// FIND USER BY EMAIL:
const findUserByEmail = async (email) => {
  const spinner = ora(`Email ${email}`).start();
  try {
    const user = await database.User.findByEmail(email);
    if (!user) throw new Error('User Not Found');
    spinner.succeed(`Email ${email}: (User Found)`);
    process.exit();
  } catch (error) {
    spinner.fail(`Email ${email}: (${error.message})`);
    process.exit(1);
  }
};

// findUserByEmail("burger@king.com");

// Trips ----------------------------------------------------------------------
// CREATE TRIP:
const createTrip = async (tripObject) => {
  try {
    const trip = new database.Trip(tripObject);
    await trip.save();
    console.log(trip);
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
createTrip({
  name: 'Florida, 2022',
  location: 'Orlando, FL',
  startDate: new Date('2022-01-01'),
  endDate: new Date('2022-01-14'),
  location: '6067f96091c8d5696ee77acf',
});
