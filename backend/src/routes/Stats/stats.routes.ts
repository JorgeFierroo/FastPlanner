import { Router } from "express";
import { getGeneralStats } from "../../controllers/Stats/stats.controller";

const router = Router();

router.get("/general", getGeneralStats);

export default router;
