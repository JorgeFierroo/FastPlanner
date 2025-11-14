import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSystemStats = async () => {
  // -------- Totales globales --------
  const totalUsers = await prisma.user.count();
  const totalTasks = await prisma.task.count();

  const completedTasks = await prisma.task.count({
    where: { status: "completed" }
  });

  const completionPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // -------- Stats por usuario --------
  const users = await prisma.user.findMany({
    include: {
      Task_Task_assigneeIdToUser: true, // tareas asignadas al usuario
      Task_Task_creatorIdToUser: true,  // tareas creadas por el usuario
    },
  });

  const userStats = users.map((user) => {
    const assignedTasks = user.Task_Task_assigneeIdToUser;
    const createdTasks = user.Task_Task_creatorIdToUser;

    const allUserTasks = [...assignedTasks, ...createdTasks];

    const completed = allUserTasks.filter(
      (t) => t.status === "completed"
    ).length;

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      totalTasks: allUserTasks.length,
      completedTasks: completed,
    };
  });

  return {
    totalUsers,
    totalTasks,
    completedTasks,
    completionPercentage: Number(completionPercentage.toFixed(2)),
    userStats,
  };
};
