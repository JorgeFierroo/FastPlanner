import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import permissionsLib, { Permission } from "../lib/permissions";

const prisma = new PrismaClient();

/**
 * Middleware factory para verificar permisos en el contexto de un proyecto.
 * Uso ejemplo:
 * router.put('/projects/:projectId/tasks/:taskId', authMiddleware, requireProjectPermission(Permission.EDIT_TASKS), editTaskHandler)
 *
 * Este middleware busca `projectId` en req.params, req.body o req.query.
 */
export function requireProjectPermission(required: Permission | Permission[]) {
  const requiredList = Array.isArray(required) ? required : [required];

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // `authMiddleware` debe haber puesto `req.user`
      const user = (req as any).user;
      if (!user || !user.id) {
        return res.status(401).json({ error: "Usuario no autenticado" });
      }

      // Intentar obtener projectId desde params, body o query
      let projectId = Number(req.params.projectId || req.body.projectId || req.query.projectId);

      // Si no se proporciona projectId, intentar resolverlo desde taskId (cuando la ruta usa taskId)
      if (!projectId || Number.isNaN(projectId)) {
        const taskId = Number(req.params.taskId || req.body.taskId || req.query.taskId);
        if (!taskId || Number.isNaN(taskId)) {
          return res.status(400).json({ error: "projectId o taskId no proporcionado" });
        }

        // Buscar la tarea para obtener su projectId
        const task = await prisma.task.findUnique({ where: { id: taskId } });
        if (!task) {
          return res.status(404).json({ error: "Tarea no encontrada" });
        }

        projectId = task.projectId;
      }

      // Buscar la relación UserProject para saber el rol del usuario en el proyecto
      const userProject = await prisma.userProject.findFirst({
        where: {
          userId: user.id,
          projectId: projectId,
        },
      });

      if (!userProject) {
        return res.status(403).json({ error: "No estás asignado a este proyecto" });
      }

      const role = userProject.role as string;

      // Verificar que el rol tenga al menos uno de los permisos requeridos
      const allowed = requiredList.every((perm) => permissionsLib.roleHasPermission(role, perm));

      if (!allowed) {
        return res.status(403).json({ error: "Permisos insuficientes" });
      }

      // Adjuntar rol y permisos al request por si el handler los necesita
      (req as any).projectRole = role;
      (req as any).projectPermissions = permissionsLib.getPermissionsForRole(role);

      next();
    } catch (error: any) {
      console.error("Error en requireProjectPermission:", error);
      res.status(500).json({ error: error.message || "Error interno" });
    }
  };
}

export default requireProjectPermission;
