import { Request, Response } from "express";
import { getSystemStats } from "../../services/Stats/stats.services";
import { getUserStats } from "../../services/Stats/stats.services";
import { getTaskStats } from "../../services/Stats/stats.services";

export const getGeneralStats = async (req: Request, res: Response) => {
    try {
        const stats = await getSystemStats();
        res.json(stats);
    } catch (error) {
        console.error("Error en stats.controller:", error);
        res.status(500).json({ error: "Error obteniendo estadísticas" });
    }
};

export const getUserStatsController = async (req: Request, res: Response) => {
    try{
        const userId = parseInt(req.params.userId, 10);
        const stats = await getUserStats(userId);
        res.json(stats);
    } catch (error) {
        console.error("Error en getUserStatsController:", error);
        res.status(404).json({error: "Usuario no encontrado"});
    }
};

export const getTaskStatsController = async (req: Request, res: Response) => {
    try{
        const taskId = parseInt(req.params.taskId, 10);
        const stats = await getTaskStats(taskId);
        res.json(stats);
    } catch (error) {
        console.error("Error en getTaskStatsController:", error);
        res.status(404).json({error: "Tarea no encontrada"});
    }
};