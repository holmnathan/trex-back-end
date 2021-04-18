// Controllers: User (<HOSTNAME>/api/event) ------------------------------------
import { Event } from '../models/database.mjs';
import * as logger from '../lib/logger.mjs';

// Global Variables -----------------------------------------------------------
const controllerUrl = '/api/event';

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
  const where = request.where();
  const { email } = request.user;
  const successMessage = {
    name: 'Authorized User',
    message: email,
    where,
  };
  logger.success(successMessage);
  response.json(successMessage);
};

// DELETE ROUTE: "/:eventId"
// Delete an event
const deleteOne = async (request, response) => {
  const where = request.where();
  try {
    const { eventId } = request.params;
    const event = await Event.findByIdAndDelete(eventId);
    const successMessage = {
      name: 'Deleted Event',
      message: `Successfully deleted the event “${event.name}”`,
      where,
    };
    logger.success(successMessage);
    response.json(successMessage);
  } catch (error) {
    const errorMessage = logger.mongooseErrors(error, where);
    response.status(400).json(errorMessage);
  }
};

export default {
  test,
  testAuthorized,
  deleteOne,
};
