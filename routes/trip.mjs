// Routes: User (<HOSTNAME>/api/trip) -----------------------------------------
import { Router } from 'express'; // Express Router,
import passport from 'passport'; // Passport.js Authentication
import controller from '../controllers/controllers.mjs'; // Controllers

// Global Variables -----------------------------------------------------------
const router = Router(); // Return Express Router

// Routes ---------------------------------------------------------------------
// GET ROUTE: "/test"
// Test Route is valid.
router.get('/test', controller.trip.test);

// GET ROUTE: "/test-authorized"
// Test Request Header for valid JSON Web Authentication Token.
router.get(
  '/test-authorized',
  passport.authenticate('jwt'),
  controller.trip.testAuthorized
);

// GET ROUTE: "/get/:userId"
// Get all trips for a user
router.get(
  '/get/:userId',
  passport.authenticate('jwt'),
  controller.trip.getByUser
);

// POST ROUTE: "/add"
// Add a new trip with a single traveler.
router.post('/add', passport.authenticate('jwt'), controller.trip.add);

// GET ROUTE: "/:tripId/events"
// Get all events for a trip
router.get(
  '/:tripId/events',
  passport.authenticate('jwt'),
  controller.trip.getEvents
);

// POST ROUTE: "/:tripId/add"
// Add a new trip event
router.post(
  '/:tripId/add',
  passport.authenticate('jwt'),
  controller.trip.addEvent
);

// GET ROUTE: "/:tripId"
// Get trip by ID
router.get('/:tripId', passport.authenticate('jwt'), controller.trip.get);

export default router;
