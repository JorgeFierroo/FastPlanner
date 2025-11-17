import { Router } from "express";
import { getGeneralStats, getUserStatsController } from "../../controllers/Stats/stats.controller";

const router = Router();

router.get("/general", getGeneralStats);
router.get("/user/:userId", getUserStatsController);

export default router;
