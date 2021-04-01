import { Router } from "express";
import controller from '../controllers/user.mjs';

const router = Router();

// Routes
//-----------------------------------------------------------------------------
router.get("/", controller.index);

export default router