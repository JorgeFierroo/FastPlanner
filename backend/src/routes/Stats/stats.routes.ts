import express from "express";
import { getStats } from "../../controllers/Stats/stats.controller";

const router = express.Router();

router.get("/", getStats);

export default router;
