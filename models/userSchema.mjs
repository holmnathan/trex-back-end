import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import argon2 from 'argon2';
import ora from 'ora';
const { Schema, model } = mongoose;

// User Schema
// ----------------------------------------------------------------------------
const UserSchema = new Schema({
  full_name: {
    type: String,
    required: true,
  },
  display_name: {
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
  date: {
    type: Date,
    default: Date.now(),
  },
});

// Middleware
// ----------------------------------------------------------------------------
// Throw validation error when "unique" constraint is not met
UserSchema.plugin(uniqueValidator);

// Password Authentication bcrypt
// https://mongodb.com/blog/post/password-authentication-with-mongoose-part-1
// ----------------------------------------------------------------------------

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

    const hash = await argon2.hash(user.password, argonOptions);

    // Override the clear text password with the hashed one.
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Validate a candidate password against the user’s current password.
UserSchema.methods.validPassword = async function (candidatePassword) {
  const spinner = ora(`Password: ${this.email}`).start();
  try {
    const isValidPass = await argon2.verify(this.password, candidatePassword);
    if (!isValidPass) {
      throw new Error('Unauthorized');
    }
    spinner.succeed(`Password: ${this.email} (Authorized)`);
    return isValidPass;
  } catch (error) {
    spinner.fail(`Password: ${this.email} (${error.message})`);
    return false;
  }
};

// Find a user by their email address
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

export default model('User', UserSchema);
