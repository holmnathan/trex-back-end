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
    travelers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: true }
);

// Middleware -----------------------------------------------------------------
// Throw validation error when "unique" constraint is not met.
TripSchema.plugin(uniqueValidator);

// Hooks ----------------------------------------------------------------------

// Methods --------------------------------------------------------------------

// Statics --------------------------------------------------------------------

export default TripSchema;
