import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
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

UserSchema.pre("save", function(next) {
  var user = this;

  // Only hash the password if it is modified or new.
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    
    // Override the clear text password with the hashed one.
    user.password = hash;
    next();
  });
});
   
// Validate a candidate password against the user’s current password.
UserSchema.methods.validPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

export default model("User", UserSchema);