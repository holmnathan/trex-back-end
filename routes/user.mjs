// Routes: User (<HOSTNAME>/api/user) -----------------------------------------
import { Router } from 'express'; // Express Router,
import passport from 'passport'; // Passport.js Authentication
import controller from '../controllers/controllers.mjs'; // Controllers

// Global Variables -----------------------------------------------------------
const router = Router(); // Return Express Router

// Routes ---------------------------------------------------------------------
// GET ROUTE: "/test"
// Test Route is valid.
router.get('/test', controller.user.test);

// GET ROUTE: "/test-authorized"
// Test Request Header for valid JSON Web Authentication Token.
router.get(
  '/test-authorized',
  passport.authenticate('jwt'),
  controller.user.testAuthorized
);

// POST ROUTE: "/login"
// User Log In.
router.post('/login', passport.authenticate('login'), controller.user.login);

// POST ROUTE: "/register"
// User Registration.
router.post(
  '/register',
  passport.authenticate('create'),
  controller.user.register
);

export default router;
