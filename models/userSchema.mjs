import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import ora from "ora";
const { Schema, model } = mongoose;

const saltRounds = 10;

// User Schema
//-----------------------------------------------------------------------------
const UserSchema = new Schema({
  full_name: {
      type: String,
      required: true
  },
  display_name: {
      type: String
  },
  email: {
      type: String,
      required: true,
      unique: true,
      uniqueCaseInsensitive: true
  },
  password: {
      type: String,
      required: true,
      minLength: 8
  },
  date: {
      type: Date,
      default: Date.now()
  }
});

// Middleware
//-----------------------------------------------------------------------------
// Throw validation error when "unique" constraint is not met
UserSchema.plugin(uniqueValidator);

// Password Authentication bcrypt
// https://mongodb.com/blog/post/password-authentication-with-mongoose-part-1
//-----------------------------------------------------------------------------

UserSchema.pre("save", async function(next) {
  var user = this;

  // Only hash the password if it is modified or new.
  if (!user.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(user.password, saltRounds);
    
    // Override the clear text password with the hashed one.
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});
   
// Validate a candidate password against the user’s current password.
UserSchema.methods.validPassword = async function(candidatePassword) {
  const spinner = ora(`Password: ${this.email}`).start();
  try {
    const isValidPass = await bcrypt.compareSync(candidatePassword, this.password);
    if (!isValidPass) {
      spinner.fail();
      return isValidPass;
    }
    spinner.succeed();
    return isValidPass;
  } catch (error) {
    spinner.fail();
    return false;
  }
};

export default model("User", UserSchema);