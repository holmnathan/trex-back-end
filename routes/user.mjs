import { Router } from "express";
import controller from '../controllers/user.mjs';
import passport from "passport";

const router = Router();

// Routes
//-----------------------------------------------------------------------------
router.get("/", controller.index);
router.post("/login", passport.authenticate('local', { successRedirect: '/' }), controller.login);

export default router