import { Request, Response } from "express";
import { getSystemStats } from "../../services/Stats/stats.services";

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await getSystemStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error obteniendo estadísticas:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener estadísticas del sistema",
    });
  }
};
