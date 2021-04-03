import database from "./models/index.mjs";
import ora from "ora";

const createUser = (candidateUser) => {
  
  const spinner = ora("Create User").start();
  setTimeout(
    async () => {
      try {
        const user = await new database.User(candidateUser);
        
        await user.save();
        
        spinner.succeed(`User Created | ${user.full_name}`);
        process.exit();
      } catch (error) {
        spinner.fail(`User Not Created | ${error.message}`);
        process.exit(1);
      }
  }, 1000);
}

const testPassword = (userId, candidatePassword) => {
  const spinner = ora("Validating Password…").start();
  setTimeout(
    async () => {
      try {
        const user = await database.User.findById(userId);
        
        user.validPassword(candidatePassword, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            spinner.succeed(`Password Valid: User “${user.email}”`);
            process.exit();
          }
          
          spinner.fail(`Incorrect Password: User “${user.email}”`);
          process.exit(1);
        });
      } catch (error) {
        spinner.fail(`Password Validation Error: “${error.message}”`);
        process.exit(1);
      }
  }, 1000);
}

// Create a new User
createUser({
  full_name: "Tester",
  email: "burger@king.com",
  password: "1234test"
});

// Test if password is valid
// testPassword("60678478d9d8073cd36e50eb", "1234test");