import { Request, Response } from "express";
import { taskService } from "../services/task.service";
import { attachmentService } from "../services/attachment.service";
import { changeHistoryService } from "../services/changeHistory.service";

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

      // Obtener la tarea actual para comparar cambios
      const existing = await taskService.getTaskById(taskId);
      if (!existing) return res.status(404).json({ error: "Tarea no encontrada" });

      const updated = await taskService.updateTask(taskId, payload);

      // Determinar tipo de acción para ChangeHistory
      const user = (req as any).user;
      let action = "UPDATED";
      let description = `Tarea actualizada`;

      if (payload.status && payload.status !== (existing as any).status) {
        action = "STATUS_CHANGED";
        description = `Estado cambiado de ${(existing as any).status} a ${payload.status}`;
      } else {
        // describir campos cambiados mínimamente
        const changedFields: string[] = [];
        if (payload.title && payload.title !== (existing as any).title) changedFields.push("title");
        if (payload.description && payload.description !== (existing as any).description) changedFields.push("description");
        if (payload.dueDate && new Date(payload.dueDate).toISOString() !== (existing as any).dueDate?.toISOString()) changedFields.push("dueDate");
        if (payload.priority && payload.priority !== (existing as any).priority) changedFields.push("priority");
        if (payload.assigneeId && payload.assigneeId !== (existing as any).assigneeId) changedFields.push("assigneeId");
        if (changedFields.length) description = `Campos cambiados: ${changedFields.join(", ")}`;
      }

      // Crear entrada de ChangeHistory
      try {
        await changeHistoryService.createEntry({
          userId: user?.id || 0,
          description,
          action,
          taskId: updated.id,
          projectId: (updated as any).projectId,
        });
      } catch (err) {
        console.error("No se pudo crear ChangeHistory:", err);
      }

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

      // Registrar en ChangeHistory que se añadió un attachment
      const user = (req as any).user;
      try {
        // Obtener task para projectId
        const task = await taskService.getTaskById(taskId);
        await changeHistoryService.createEntry({
          userId: user?.id || 0,
          description: `Adjunto agregado: ${file.originalname}`,
          action: "CREATED",
          taskId: taskId,
          projectId: (task as any)?.projectId,
        });
      } catch (err) {
        console.error("No se pudo crear ChangeHistory por attachment:", err);
      }

      res.status(201).json({ message: "Archivo adjuntado", attachment: record });
    } catch (error: any) {
      console.error("uploadAttachment error:", error);
      res.status(500).json({ error: error.message || "Error interno" });
    }
  },
};

export default taskController;
