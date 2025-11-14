import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { dashboardController } from "../controllers/dashboard.controller";

const router = Router();

// GET /api/dashboard
router.get("/", authMiddleware, dashboardController.getDashboard);

export default router;
