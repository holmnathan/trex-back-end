import { Router } from 'express';
import passport from 'passport';
import controller from '../controllers/user.mjs';

const router = Router();
// Routes
// -----------------------------------------------------------------------------
router.get('/', controller.index);
router.post('/login', passport.authenticate('login'), controller.login);
router.get(
  '/test',
  passport.authenticate('jwt', { session: false }),
  controller.test
);

export default router;
