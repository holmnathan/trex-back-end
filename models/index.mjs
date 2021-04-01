import mongoose from "mongoose";
import chalk from "chalk";
import ora from "ora";

// Environment Variables
//-----------------------------------------------------------------------------
const { DATABASE_NAME, DATABASE_HOST, DATABASE_PORT } = process.env;

// MongoDB Database Connection
//-----------------------------------------------------------------------------

const connectDatabase = async () => {
  
  // Database connection URL
  const databaseUrl = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
  // Database connection options
  const databaseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  
  // Ora CLI Spinner options
  const OraOptions = {
    text: chalk`{blue MongoDB:} Connecting`,
    color: "blue"
  }
  
  const spinner = ora(OraOptions).start(); // Start spinner
  try {
    await mongoose.connect( databaseUrl, databaseOptions );
    setTimeout(() => {
      spinner.succeed(chalk`{green MongoDB:} Connected (${databaseUrl})`) // Success Message
    }, 2000);
  } catch ( error ) {
    spinner.fail(chalk`{red MongoDB:} Connection Error (${error.message})`) // Error Message
    process.exit() // Exit app if database connection fails
  }
}

connectDatabase(); // Connect to Database

export default {}