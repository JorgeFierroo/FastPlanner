import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dashboardService = {
  async getUserDashboard(userId: number, options: { page?: number; limit?: number; projectId?: number; taskStatus?: string | null; historyLimit?: number }) {
    const page = options.page && options.page > 0 ? options.page : 1;
    const limit = options.limit && options.limit > 0 ? options.limit : 20;
    const offset = (page - 1) * limit;

    // Proyectos del usuario
    const projects = await prisma.userProject.findMany({
      where: { userId },
      include: { Project: { select: { id: true, name: true, description: true } } },
    });

    // Si se pasó projectId, filtrar tasks por ese proyecto; si no, traer tareas del usuario en todos sus proyectos
    const projectFilter = options.projectId ? { projectId: options.projectId } : undefined;

    // Tareas asignadas al usuario
    const assignedWhere: any = { assigneeId: userId };
    if (projectFilter) assignedWhere.projectId = projectFilter.projectId;
    if (options.taskStatus) assignedWhere.status = options.taskStatus;

    const assignedTasks = await prisma.task.findMany({
      where: assignedWhere,
      orderBy: { createdAt: "desc" as any },
      skip: offset,
      take: limit,
      select: { id: true, title: true, status: true, priority: true, dueDate: true, projectId: true }
    });

    // Tareas creadas por el usuario
    const createdWhere: any = { creatorId: userId };
    if (projectFilter) createdWhere.projectId = projectFilter.projectId;
    if (options.taskStatus) createdWhere.status = options.taskStatus;

    const createdTasks = await prisma.task.findMany({
      where: createdWhere,
      orderBy: { createdAt: "desc" as any },
      skip: offset,
      take: limit,
      select: { id: true, title: true, status: true, priority: true, dueDate: true, projectId: true }
    });

    // ChangeHistory: últimas N entradas del usuario
    const historyLimit = options.historyLimit && options.historyLimit > 0 ? options.historyLimit : 50;
    const changeHistory = await prisma.changeHistory.findMany({
      where: { userId },
      orderBy: { date: "desc" as any },
      take: historyLimit,
      select: { id: true, date: true, description: true, action: true, projectId: true, taskId: true }
    });

    return {
      projects,
      assignedTasks,
      createdTasks,
      changeHistory,
      page,
      limit,
    };
  }
};

export default dashboardService;
