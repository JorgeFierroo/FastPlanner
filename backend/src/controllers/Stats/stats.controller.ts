import { Request, Response } from "express";
import { getSystemStats } from "../../services/Stats/stats.services";

export const getGeneralStats = async (req: Request, res: Response) => {
    try {
        const stats = await getSystemStats();
        res.json(stats);
    } catch (error) {
        console.error("Error en stats.controller:", error);
        res.status(500).json({ error: "Error obteniendo estadísticas" });
    }
};
