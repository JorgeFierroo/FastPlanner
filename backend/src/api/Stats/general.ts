import { Router } from "express";
import { getSystemStats } from "../../services/Stats/stats.services";

const router = Router();

router.get("/general", async (req, res) => {
  try {
    const stats = await getSystemStats();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo estadísticas" });
  }
});

export default router;
