import { Router } from "express";
import controller from "../controllers/index.mjs";
import user from "./user.mjs";

const router = Router();

// Routes
// -----------------------------------------------------------------------------
router.get("/", controller.index);

// Sub-Routes
// -----------------------------------------------------------------------------
router.use("/user", user);

export default router;
