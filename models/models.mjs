// Database Models ------------------------------------------------------------
import mongoose from 'mongoose'; // Mongoose.js ORM
import ora from 'ora'; // CLI Spinner

// Schema ---------------------------------------------------------------------
import UserSchema from './userSchema.mjs'; // User Model
import TripSchema from './tripSchema.mjs'; // Trip Model

// Global Variables -----------------------------------------------------------
const { DATABASE_NAME, DATABASE_HOST, DATABASE_PORT } = process.env; // Environment Variables
const { model } = mongoose;

// Models
const Trip = model('trip', TripSchema);
const User = model('user', UserSchema);

// MongoDB Database Connection ------------------------------------------------
// CONNECT DATABASE:
const connectDatabase = async () => {
  // Ora CLI Spinner options.
  const OraOptions = {
    text: 'MongoDB Database Connection',
    color: 'blue',
  };
  // Database connection URL.
  const databaseUrl = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;
  // Database connection options
  const databaseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  // Ora Promise response.
  ora.promise(mongoose.connect(databaseUrl, databaseOptions), OraOptions);
};
// Connect to Database
connectDatabase();

export default {
  User,
  Trip,
};
