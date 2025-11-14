import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const taskService = {
  async getTaskById(id: number) {
    return await prisma.task.findUnique({ where: { id }, include: { Attachment: true, ChangeHistory: true } });
  },

  async updateTask(id: number, data: Partial<{ title: string; description: string; dueDate: string; status: any; priority: any; assigneeId: number }>) {
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.dueDate !== undefined) updateData.dueDate = new Date(data.dueDate as string);
    if (data.status !== undefined) updateData.status = data.status;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.assigneeId !== undefined) updateData.assigneeId = data.assigneeId;

    return await prisma.task.update({ where: { id }, data: updateData });
  },

  async getTasksByProject(projectId: number) {
    return await prisma.task.findMany({ where: { projectId } });
  },
};

export default taskService;
