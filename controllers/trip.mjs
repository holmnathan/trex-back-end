// Controllers: User (<HOSTNAME>/api/trip) ------------------------------------
import { Trip } from '../models/database.mjs';
import * as logger from '../lib/logger.mjs';

// Global Variables -----------------------------------------------------------
const controllerUrl = '/api/trip';

// Controllers ----------------------------------------------------------------
// GET ROUTE: "/test"
// Test Route is valid.
const test = (request, response) => {
  const where = request.where();
  const successMessage = {
    name: 'Endpoint Valid',
    message: 'Endpoint Valid',
    where,
  };
  logger.success(successMessage);
  response.json(successMessage);
};

// GET ROUTE: "/test-authorized"
// Test Request Header for valid JSON Web Authentication Token.
const testAuthorized = (request, response) => {
  const { email } = request.user;
  const successMessage = {
    name: 'Authorized User',
    message: email,
    where: request.where(),
  };
  logger.success(successMessage);
  response.json(successMessage);
};

// POST ROUTE: "/add"
// Add a new trip with a single traveler.
const add = async (request, response) => {
  const where = request.where();
  const { travelers } = request.body;
  try {
    const trip = new Trip(request.body);
    await trip.save();
    const successMessage = {
      name: 'Trip Created',
      message: request.body.name,
      where,
    };
    logger.success(successMessage);
    response.json(successMessage);
  } catch (error) {
    const errorMessage = logger.mongooseErrors(error, where);
    response.status(400).json(errorMessage);
    return;
  }
};

// GET ROUTE: "/get/:id"
// Get all trips for a user
const get = async (request, response) => {
  console.log('GET!GET!GET!GET!GET!GET!GET!GET!GET!GET!GET!GET!GET!');
  const where = request.where();
  const user = request.params.id;
  try {
    const trips = await Trip.find({ travelers: user });
    const successMessage = {
      name: 'Trips Found',
      message: `User: ${user}`,
      where,
    };
    logger.success(successMessage);
    response.json(trips);
  } catch (error) {
    const errorMessage = logger.mongooseErrors(error, where);
    response.status(400).json(errorMessage);
    return;
  }
};

export default {
  test,
  testAuthorized,
  add,
  get,
};
