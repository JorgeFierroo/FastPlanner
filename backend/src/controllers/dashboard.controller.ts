import { Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service";

export const dashboardController = {
  async getDashboard(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      if (!user || !user.id) return res.status(401).json({ error: "Usuario no autenticado" });

      const page = Number(req.query.page || 1);
      const limit = Number(req.query.limit || 20);
      const projectId = req.query.projectId ? Number(req.query.projectId) : undefined;
      const taskStatus = req.query.taskStatus ? String(req.query.taskStatus) : undefined;
      const historyLimit = req.query.historyLimit ? Number(req.query.historyLimit) : undefined;

      const result = await dashboardService.getUserDashboard(user.id, { page, limit, projectId, taskStatus, historyLimit });

      res.json(result);
    } catch (error: any) {
      console.error("getDashboard error:", error);
      res.status(500).json({ error: error.message || "Error interno" });
    }
  }
};

export default dashboardController;
