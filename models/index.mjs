import mongoose from "mongoose";
import chalk from "chalk";
import ora from "ora";

import User from "./UserSchema.mjs"

// Environment Variables
//-----------------------------------------------------------------------------
const { DATABASE_NAME, DATABASE_HOST, DATABASE_PORT } = process.env;

// MongoDB Database Connection
//-----------------------------------------------------------------------------

// Ora CLI Spinner options

const connectDatabase = async () => {
  
  const OraOptions = { // Ora Spinner options
    text: "MongoDB Database Connection",
    color: "blue"
  }
  // Database connection URL
  const databaseUrl = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
  // Database connection options
  const databaseOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  ora.promise(mongoose.connect( databaseUrl, databaseOptions ), OraOptions)
}

// Connect to Database
connectDatabase();

export default {
  User
}