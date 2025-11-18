import { Router } from "express";
import { getGeneralStats, getUserStatsController, getTaskStatsController } from "../../controllers/Stats/stats.controller";

const router = Router();

router.get("/general", getGeneralStats);
router.get("/user/:userId", getUserStatsController);
router.get("/task/:taskId", getTaskStatsController);

export default router;
