// Model Schema: User ---------------------------------------------------------
import mongoose from 'mongoose'; // Mongoose.js MongoDB ORM,
import uniqueValidator from 'mongoose-unique-validator'; // Mongoose Validator Plugin,
import argon2 from 'argon2'; // Argon2 Encryption Algorithm,
import ora from 'ora'; // Ora CLI Spinner.

// Global Variables -----------------------------------------------------------
const { Schema } = mongoose;

// User Schema ----------------------------------------------------------------
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  { timestamps: true }
);

// Middleware -----------------------------------------------------------------
// Throw validation error when "unique" constraint is not met
UserSchema.plugin(uniqueValidator);

// Hooks ----------------------------------------------------------------------
// PRE-SAVE HOOK:
// Hash a User’s password before saving to database.
UserSchema.pre('save', async function (next) {
  const user = this;
  // Only hash the password if it is modified or new.
  if (!user.isModified('password')) return next();
  try {
    const argonOptions = {
      // argon2i slower and resistant against tradeoff attacks,
      // which is preferred for password hashing and key derivation.
      type: argon2.argon2id,
      hashLength: 50,
      timeCost: 20, //
    };
    // Hash Password
    const hash = await argon2.hash(user.password, argonOptions);
    // Override the clear text password with the hashed one.
    user.password = hash;
    next();
  } catch (error) {
    // Return Server Error
    return next(error);
  }
});

// Methods --------------------------------------------------------------------
// VALIDATE HASHED PASSWORD:
// Validate candidate password against User’s current password.
UserSchema.methods.validPassword = async function (candidatePassword) {
  const spinner = ora(`Password: ${this.email}`).start();
  try {
    // De-hash User’s password and validate against candidate.
    const isValidPassword = await argon2.verify(
      this.password,
      candidatePassword
    );
    // If the passwords do not match, throw "Unauthorized" error.
    if (!isValidPassword) {
      throw new Error('Unauthorized');
    }
    // If the passwords match, return boolean True (isValidPassword.)
    spinner.succeed(`Password: ${this.email} (Authorized)`);
    return isValidPassword;
  } catch (error) {
    // Return Server error.
    spinner.fail(`Password: ${this.email} (${error.message})`);
    return false;
  }
};

// Statics --------------------------------------------------------------------
// FIND BY EMAIL:
// Find a user by their email address.
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

export default UserSchema;
