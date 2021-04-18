// Controllers: User (<HOSTNAME>/api/trip) ------------------------------------
import { Trip, Event } from '../models/database.mjs';
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

// GET ROUTE: "/get/:userId"
// Get all trips for a user
const getByUser = async (request, response) => {
  const where = request.where();
  const user = request.params.userId;
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

// GET ROUTE: "/:tripId/events"
// Get all events for a trip
const getEvents = async (request, response) => {
  const where = request.where();
  const trip = request.params.tripId;
  try {
    const events = await Event.find({ trip });
    const successMessage = {
      name: 'Events Found',
      message: `Trip: ${trip}`,
      where,
    };
    logger.success(successMessage);
    response.json(events);
  } catch (error) {
    const errorMessage = logger.mongooseErrors(error, where);
    response.status(400).json(errorMessage);
    return;
  }
};

/* GET ROUTE: "/:tripId"
Get all events for a trip */
const get = async (request, response) => {
  const where = request.where();
  const trip = request.params.tripId;
  try {
    const events = await Trip.findById(trip);
    const successMessage = {
      name: 'Events Found',
      message: `Trip: ${trip}`,
      where,
    };
    logger.success(successMessage);
    response.json(events);
  } catch (error) {
    const errorMessage = logger.mongooseErrors(error, where);
    response.status(400).json(errorMessage);
    return;
  }
};

// POST ROUTE: "/:tripId/add"
// Add a new trip event
const addEvent = async (request, response) => {
  const where = request.where();
  try {
    const event = new Event(request.body);
    await event.save();
    const successMessage = {
      name: 'Event Created',
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

export default {
  test,
  testAuthorized,
  add,
  getByUser,
  getEvents,
  addEvent,
  get,
};
