import ora from 'ora';
import database from './models/database.mjs';

// CREATE USER:
const registerUser = (candidateUser) => {
  const spinner = ora('Create User').start();
  setTimeout(async () => {
    try {
      const user = await new database.User(candidateUser);

      await user.save();

      spinner.succeed(`User Created | ${user.fullName}`);
    } catch (error) {
      spinner.fail(`User Not Created | ${error.message}`);
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
  } catch (error) {
    console.log(`Password Validation Error: (${error.message})`);
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
    } catch (error) {
      spinner.fail(`Delete All Users: (${error.message})`);
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
  } catch (error) {
    spinner.fail(`Email ${email}: (${error.message})`);
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
  } catch (error) {
    console.log(error.message);
  }
};
// createTrip({
//   name: 'Florida, 2022',
//   location: 'Orlando, FL',
//   startDate: new Date('2022-01-01'),
//   endDate: new Date('2022-01-14'),
//   users: '6067f96091c8d5696ee77acf',
// });

// GET TRIP BY ID:
const getTripById = async (tripId) => {
  try {
    const trip = await database.Trip.findById(tripId);
    console.log(trip);
    return trip;
  } catch (error) {
    console.log(error.message);
  }
};
// getTripById('6069376b0148ce65adf36d9a');

// GET TRIP BY ID WITH TRAVELERS:
const getTripWithTravelers = async (tripId) => {
  try {
    const trip = await database.Trip.findById(tripId).populate('travelers');
    console.log(trip);
    return trip;
  } catch (error) {
    console.log(error.message);
  }
};
getTripWithTravelers('6069376b0148ce65adf36d9a');

const addTraveler = async (tripId, userId) => {
  try {
    const trip = await database.Trip.findById(tripId);

    if (!trip) throw new Error('Trip Not Found.');
    // console.log(trip);

    const user = await database.User.findById(userId);

    if (!user) throw new Error('User Not Found.');

    await trip.addTravelerById(userId);
    console.log(trip);
  } catch (error) {
    console.log(error.message);
  }
};
// addTraveler('6069376b0148ce65adf36d9a', '6068ee3931f47237968e9f1a');
