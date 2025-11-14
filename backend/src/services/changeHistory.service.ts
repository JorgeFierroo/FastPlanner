import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const changeHistoryService = {
  async createEntry(data: { userId: number; description: string; action: string; taskId?: number; projectId?: number }) {
    const { userId, description, action, taskId, projectId } = data;
    return await prisma.changeHistory.create({
      data: {
        userId,
        description,
        action: action as any,
        taskId: taskId || null,
        projectId: projectId || null,
      },
    });
  },
};

export default changeHistoryService;
