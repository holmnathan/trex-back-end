// Routes: API (<HOSTNAME>/api/) ----------------------------------------------
import { Router } from 'express'; // Express Router,
import controller from '../controllers/controllers.mjs'; // Controllers

// Global Variables -----------------------------------------------------------
const router = Router(); // Return Express Router

// Sub-Routes -----------------------------------------------------------------
import userRoutes from './user.mjs'; // User Routes

// Middleware -----------------------------------------------------------------
router.use('/user', userRoutes);

// Routes ---------------------------------------------------------------------
// GET ROUTE: "/"
// Return basic App information.
router.get('/', controller.api);

export default router;
