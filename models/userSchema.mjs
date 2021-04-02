import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  full_name: {
      type: String,
      required: true
  },
  display_name: {
      type: String
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true,
      minLength: 8
  },
  creation_date: {
      type: Date,
      default: Date.now()
  }
})

const User = mongoose.model("User", userSchema);

export default User;