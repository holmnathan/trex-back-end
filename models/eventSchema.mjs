// Model Schema: Event ---------------------------------------------------------
import mongoose from 'mongoose'; // Mongoose.js MongoDB ORM,
import uniqueValidator from 'mongoose-unique-validator'; // Mongoose Validator Plugin.

// Global Variables -----------------------------------------------------------
const { Schema } = mongoose;

// Schema ---------------------------------------------------------------------
const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
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
      type: String,
    },
    trip: {
      type: mongoose.ObjectId,
      ref: 'Trip',
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware -----------------------------------------------------------------
// Throw validation error when "unique" constraint is not met.
EventSchema.plugin(uniqueValidator);

// Hooks ----------------------------------------------------------------------

// Hooks ----------------------------------------------------------------------

// Methods --------------------------------------------------------------------
// Add Trip:
// Add an event to a trip
EventSchema.methods.addTripById = function (trip) {
  try {
    this.trip = trip;
    this.save();
    return this;
  } catch (error) {
    console.log(error.message);
  }
};

// Statics --------------------------------------------------------------------

export default EventSchema;
