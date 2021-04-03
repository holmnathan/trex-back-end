import { Router } from 'express';
import passport from 'passport';
import userController from '../controllers/user.mjs';

const router = Router();
// Routes
// -----------------------------------------------------------------------------
// Test Route Validty
router.get('/test', userController.test);
// Test JSON Web Authorization Token
router.get(
  '/test-authorized',
  passport.authenticate('jwt'),
  userController.testAuthorized
);
// User Log In
router.post('/login', passport.authenticate('login'), userController.login);
// User Creation
router.post(
  '/register',
  passport.authenticate('create'),
  userController.register
);

export default router;
