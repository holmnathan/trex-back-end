// Model Schema: Flight ---------------------------------------------------------
import mongoose from 'mongoose'; // Mongoose.js MongoDB ORM
// Global Variables -----------------------------------------------------------
const { Schema } = mongoose;

// User Schema ----------------------------------------------------------------
const FlightSchema = new Schema(
  {
    airline: {
      type: String,
      required: true,
    },
    flightNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Middleware -----------------------------------------------------------------

// Hooks ----------------------------------------------------------------------

// Methods --------------------------------------------------------------------

// Statics --------------------------------------------------------------------

export default FlightSchema;
