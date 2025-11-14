import { Request, Response } from "express";
import { taskService } from "../services/task.service";
import { attachmentService } from "../services/attachment.service";

export const taskController = {
  async getTask(req: Request, res: Response) {
    try {
      const taskId = Number(req.params.taskId);
      if (!taskId || Number.isNaN(taskId)) return res.status(400).json({ error: "taskId inválido" });

      const task = await taskService.getTaskById(taskId);
      if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

      res.json({ task });
    } catch (error: any) {
      console.error("getTask error:", error);
      res.status(500).json({ error: error.message || "Error interno" });
    }
  },

  async updateTask(req: Request, res: Response) {
    try {
      const taskId = Number(req.params.taskId);
      if (!taskId || Number.isNaN(taskId)) return res.status(400).json({ error: "taskId inválido" });

      const payload = req.body;
      const updated = await taskService.updateTask(taskId, payload);

      // Registrar un cambio en ChangeHistory sería ideal aquí (opcional)

      res.json({ message: "Tarea actualizada", task: updated });
    } catch (error: any) {
      console.error("updateTask error:", error);
      res.status(500).json({ error: error.message || "Error interno" });
    }
  },

  async uploadAttachment(req: Request, res: Response) {
    try {
      const taskId = Number(req.params.taskId);
      if (!taskId || Number.isNaN(taskId)) return res.status(400).json({ error: "taskId inválido" });

      const file = (req as any).file;
      if (!file) return res.status(400).json({ error: "Archivo no proporcionado" });

      const record = await attachmentService.createAttachment({
        taskId,
        filename: file.filename,
        mimetype: file.mimetype,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
      });

      res.status(201).json({ message: "Archivo adjuntado", attachment: record });
    } catch (error: any) {
      console.error("uploadAttachment error:", error);
      res.status(500).json({ error: error.message || "Error interno" });
    }
  },
};

export default taskController;
