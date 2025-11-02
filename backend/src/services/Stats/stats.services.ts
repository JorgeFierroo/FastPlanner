import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSystemStats = async () => {
  // Totales globales
  const users = await prisma.user.count();
  const boards = await prisma.board.count();
  const lists = await prisma.list.count();
  const tasks = await prisma.task.count();

  // Tareas agrupadas por estado
  const tasksByStatus = await prisma.task.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  // Tareas agrupadas por usuario (usando boards.ownerId)
  const tasksByUser = await prisma.task.groupBy({
    by: ["listId"],
    _count: { listId: true },
  });

  // Relacionar con usuarios (para mostrar nombre y email)
  const usersData = await prisma.user.findMany({
    include: {
      boards: {
        include: {
          lists: {
            include: {
              tasks: true,
            },
          },
        },
      },
    },
  });

  const userStats = usersData.map((user) => {
    const allTasks = user.boards.flatMap((b) =>
      b.lists.flatMap((l) => l.tasks)
    );

    const completed = allTasks.filter((t) => t.status === "done").length;
    const inProgress = allTasks.filter((t) => t.status === "in_progress").length;
    const todo = allTasks.filter((t) => t.status === "todo").length;

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      totalTasks: allTasks.length,
      completed,
      inProgress,
      todo,
    };
  });

  // Próximas tareas por vencer
  const upcomingTasks = await prisma.task.findMany({
    where: {
      dueDate: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      dueDate: true,
      status: true,
    },
    take: 5,
    orderBy: { dueDate: "asc" },
  });

  return {
    totals: { users, boards, lists, tasks },
    tasksByStatus,
    upcomingTasks,
    userStats,
  };
};
