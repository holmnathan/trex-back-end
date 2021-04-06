// Routes: API (<HOSTNAME>/api/) ----------------------------------------------
import { Router } from 'express'; // Express Router,
import controller from '../controllers/controllers.mjs'; // Controllers

// Global Variables -----------------------------------------------------------
const router = Router(); // Return Express Router

// Sub-Routes -----------------------------------------------------------------
import userRoutes from './user.mjs'; // User Routes
import tripRoutes from './trip.mjs'; // User Routes

// Middleware -----------------------------------------------------------------
router.use('/user', userRoutes);
router.use('/trip', tripRoutes);

// Routes ---------------------------------------------------------------------
// GET ROUTE: "/"
// Return basic App information.
router.get('/', controller.api);

export default router;
