import database from "./models/index.mjs";
import ora from "ora";

const { User } = database;

const createUser = (candidateUser) => {
  const spinner = ora("Create User").start();
  setTimeout(async () => {
    try {
      const user = await new User(candidateUser);

      await user.save();

      spinner.succeed(`User Created | ${user.full_name}`);
      process.exit();
    } catch (error) {
      spinner.fail(`User Not Created | ${error.message}`);
      process.exit(1);
    }
  }, 1000);
};

const validatePassword = async (candidateEmail, candidatePassword) => {
  try {
    // Find User by candidate email address
    const user = await User.findOne({
      email: candidateEmail,
    });

    // Throw error if the user is not found.
    if (!user) throw new Error("User Not Found.");

    // Validate password in database against candidate password
    await user.validPassword(candidatePassword);
    process.exit();
  } catch (error) {
    console.log(`Password Validation Error: (${error.message})`);
    process.exit(1);
  }
};

const deleteAllUsers = () => {
  const spinner = ora("Delete All Users").start();
  setTimeout(async () => {
    try {
      const deletedUsers = await User.deleteMany();
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

// Create a new User
createUser({
  full_name: "Tester",
  email: "burger@king.com",
  password: "1234test",
});

// Test if password is valid
// validatePassword("wendy@wendys.com", "1234test");

// Delete all Users
// deleteAllUsers();
