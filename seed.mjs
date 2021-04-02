import database from "./models/index.mjs";
import ora from "ora";

const createUser = async (candidateUser) => {
  
  const spinner = ora("Create User").start();
  try {
    const user = await new database.User(candidateUser);
    
    await user.save();
    
    setTimeout(
      () => {
        spinner.succeed(`User Created | ${user.full_name}`);
        process.exit();
      }, 1000
    );
  } catch (error) {
    spinner.fail(`User Not Created | ${error.message}`);
    process.exit(1);
  }
}

const testPassword = async (userId, candidatePassword) => {
  const spinner = ora("Validating Password…").start();
  try {
    const user = await database.User.findById(userId);
    
    user.validPassword(candidatePassword, function(err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        setTimeout(
          () => {
            spinner.succeed(`Password Valid: User “${user.email}”`);
            process.exit();
          }, 1000
        );
      }
        setTimeout(
          () => {
            spinner.fail(`Incorrect Password: User “${user.email}”`);
            process.exit(1);
          }, 1000
        );
    });
  } catch (error) {
    spinner.fail(`Password Validation Error: “${error.message}”`);
    process.exit(1);
  }
}

// Create a new User
// createUser({
//   full_name: "Tester",
//   email: "ronald@mcdonald.com",
//   password: "1234test"
// });

// Test if password is valid
testPassword("60678478d9d8073cd36e50eb", "1234test");