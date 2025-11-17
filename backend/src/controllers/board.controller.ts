import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BoardController {
  // Crear nueva tarea - POST /tasks/{projectId}
  async createTask(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = parseInt(req.params.projectId);
      const { title, description, dueDate, assigneeId, priority, status, sprintId } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'El título es requerido' });
      }

      // Verificar que el usuario pertenece al proyecto
      const userProject = await prisma.userProject.findFirst({
        where: {
          userId: userId,
          projectId: projectId
        }
      });

      if (!userProject) {
        return res.status(403).json({ error: 'No tienes acceso a este proyecto' });
      }

      const task = await prisma.task.create({
        data: {
          title: title.trim(),
          description: description?.trim() || null,
          dueDate: dueDate ? new Date(dueDate) : null,
          creatorId: userId,
          assigneeId: assigneeId || null,
          projectId: projectId,
          status: status || 'created',
          sprintId: sprintId || null
        },
        include: {
          User_Task_assigneeIdToUser: true,
          User_Task_creatorIdToUser: true,
          Sprint: true
        }
      });

      res.status(201).json(task);
    } catch (error) {
      console.error('Error al crear tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Obtener tarea por ID - GET /tasks/projects/{projectId}/tasks/{taskId}
  async getTaskById(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = parseInt(req.params.projectId);
      const taskId = parseInt(req.params.taskId);

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      // Verificar acceso al proyecto
      const userProject = await prisma.userProject.findFirst({
        where: {
          userId: userId,
          projectId: projectId
        }
      });

      if (!userProject) {
        return res.status(403).json({ error: 'No tienes acceso a este proyecto' });
      }

      const task = await prisma.task.findFirst({
        where: {
          id: taskId,
          projectId: projectId
        },
        include: {
          User_Task_assigneeIdToUser: true,
          User_Task_creatorIdToUser: true,
          Sprint: true,
          TaskTag: {
            include: {
              Tag: true
            }
          }
        }
      });

      if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      res.json(task);
    } catch (error) {
      console.error('Error al obtener tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Obtener tareas por proyecto - GET /tasks/projects/{projectId}/tasks
  async getTasksByProject(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = parseInt(req.params.projectId);

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      // Verificar acceso al proyecto
      const userProject = await prisma.userProject.findFirst({
        where: {
          userId: userId,
          projectId: projectId
        }
      });

      if (!userProject) {
        return res.status(403).json({ error: 'No tienes acceso a este proyecto' });
      }

      const tasks = await prisma.task.findMany({
        where: {
          projectId: projectId
        },
        include: {
          User_Task_assigneeIdToUser: true,
          User_Task_creatorIdToUser: true,
          Sprint: true,
          TaskTag: {
            include: {
              Tag: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json(tasks);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Actualizar tarea - PUT /tasks/projects/{projectId}/tasks/{taskId}
  async updateTask(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = parseInt(req.params.projectId);
      const taskId = parseInt(req.params.taskId);
      const { title, description, dueDate, assigneeId, priority, sprintId, status } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      // Verificar acceso al proyecto
      const userProject = await prisma.userProject.findFirst({
        where: {
          userId: userId,
          projectId: projectId
        }
      });

      if (!userProject) {
        return res.status(403).json({ error: 'No tienes acceso a este proyecto' });
      }

      const task = await prisma.task.update({
        where: {
          id: taskId
        },
        data: {
          title: title?.trim(),
          description: description?.trim(),
          dueDate: dueDate ? new Date(dueDate) : undefined,
          assigneeId: assigneeId,
          priority: priority,
          sprintId: sprintId,
          status: status
        },
        include: {
          User_Task_assigneeIdToUser: true,
          User_Task_creatorIdToUser: true,
          Sprint: true
        }
      });

      res.json(task);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Eliminar tarea - DELETE /tasks/projects/{projectId}/tasks/{taskId}
  async deleteTask(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = parseInt(req.params.projectId);
      const taskId = parseInt(req.params.taskId);

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      // Verificar acceso al proyecto
      const userProject = await prisma.userProject.findFirst({
        where: {
          userId: userId,
          projectId: projectId
        }
      });

      if (!userProject) {
        return res.status(403).json({ error: 'No tienes acceso a este proyecto' });
      }

      await prisma.task.delete({
        where: {
          id: taskId
        }
      });

      res.json({ 
        message: 'Tarea eliminada exitosamente',
        deletedId: taskId
      });
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Asignar tarea - POST /tasks/{projectId}/{taskId}/assign
  async assignTask(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = parseInt(req.params.projectId);
      const taskId = parseInt(req.params.taskId);
      const { assigneeId } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      // Verificar acceso al proyecto
      const userProject = await prisma.userProject.findFirst({
        where: {
          userId: userId,
          projectId: projectId
        }
      });

      if (!userProject) {
        return res.status(403).json({ error: 'No tienes acceso a este proyecto' });
      }

      const task = await prisma.task.update({
        where: {
          id: taskId
        },
        data: {
          assigneeId: assigneeId
        },
        include: {
          User_Task_assigneeIdToUser: true,
          User_Task_creatorIdToUser: true
        }
      });

      res.json(task);
    } catch (error) {
      console.error('Error al asignar tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Cambiar estado de tarea - POST /tasks/{projectId}/{taskId}/status
  async changeTaskStatus(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = parseInt(req.params.projectId);
      const taskId = parseInt(req.params.taskId);
      const { status } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!status) {
        return res.status(400).json({ error: 'El estado es requerido' });
      }

      // Verificar acceso al proyecto
      const userProject = await prisma.userProject.findFirst({
        where: {
          userId: userId,
          projectId: projectId
        }
      });

      if (!userProject) {
        return res.status(403).json({ error: 'No tienes acceso a este proyecto' });
      }

      const task = await prisma.task.update({
        where: {
          id: taskId
        },
        data: {
          status: status
        },
        include: {
          User_Task_assigneeIdToUser: true,
          User_Task_creatorIdToUser: true
        }
      });

      res.json(task);
    } catch (error) {
      console.error('Error al cambiar estado de tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}