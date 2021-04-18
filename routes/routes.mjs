// Routes: API (<HOSTNAME>/api/) ----------------------------------------------
import { Router } from 'express'; // Express Router,
import controller from '../controllers/controllers.mjs'; // Controllers

// Global Variables -----------------------------------------------------------
const router = Router(); // Return Express Router

// Sub-Routes -----------------------------------------------------------------
import userRoutes from './user.mjs'; // User Routes
import tripRoutes from './trip.mjs'; // Trip Routes
import eventRoutes from './event.mjs'; // Event Routes

// Middleware -----------------------------------------------------------------
router.use('/user', userRoutes);
router.use('/trip', tripRoutes);
router.use('/event', eventRoutes);

// Routes ---------------------------------------------------------------------
// GET ROUTE: "/"
// Return basic App information.
router.get('/', controller.api);

export default router;
