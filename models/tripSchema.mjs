// Model Schema: Trip ---------------------------------------------------------
import mongoose from 'mongoose'; // Mongoose.js MongoDB ORM,
import uniqueValidator from 'mongoose-unique-validator'; // Mongoose Validator Plugin.

// Global Variables -----------------------------------------------------------
const { Schema } = mongoose;

// Schema ---------------------------------------------------------------------
const TripSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    description: {
      type: Date,
    },
    travelers: [
      {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// Middleware -----------------------------------------------------------------
// Throw validation error when "unique" constraint is not met.
TripSchema.plugin(uniqueValidator);

// Hooks ----------------------------------------------------------------------

// Methods --------------------------------------------------------------------
// Add Traveler:
// Add a traveler to a trip by email
TripSchema.methods.addTravelerById = function (user) {
  try {
    this.travelers.addToSet(user);
    this.save();
    return this;
  } catch (error) {
    console.log(error.message);
  }
};

// Statics --------------------------------------------------------------------

export default TripSchema;
