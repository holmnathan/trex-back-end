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
      type: String,
    },
    travelers: [
      {
        type: mongoose.ObjectId,
        ref: "User",
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

// Hooks ----------------------------------------------------------------------
// PRE-SAVE HOOK:
// Validate 1 user is supplied at time of creation
TripSchema.pre('save', async function (next) {
  const trip = this;
  if (!trip.isNew) next(); // Only throw error if the document is new
  try {
    if (trip.travelers.length !== 1) {
      // Create a new Mongoose error to return
      const validatorError = new mongoose.Error.ValidationError(null);
      validatorError.addError(
        'travelers',
        new mongoose.Error.ValidatorError({
          message:
            'Exactly 1 traveler must be supplied when creating a new trip.',
        })
      );
      return next(validatorError);
    }
    next();
  } catch (error) {
    next(error);
  }
});

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

// Add Flight:
// Add a Flight to a trip by ID
TripSchema.methods.addFlightById = function (flight) {
  try {
    this.travelers.addToSet(flight);
    this.save();
    return this;
  } catch (error) {
    console.log(error.message);
  }
};

// Statics --------------------------------------------------------------------

export default TripSchema;
