import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const attachmentService = {
  async createAttachment(data: { taskId: number; filename: string; mimetype: string; originalName: string; path: string; size: number }) {
    return await prisma.attachment.create({ data });
  },

  async getAttachmentsByTask(taskId: number) {
    return await prisma.attachment.findMany({ where: { taskId } });
  },
};

export default attachmentService;
