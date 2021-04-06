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

// POST ROUTE: "/add"
// Add a new trip with a single traveler.
router.post('/add', passport.authenticate('jwt'), controller.trip.add);

export default router;
