import { PrismaClient } from "@prisma/client";

export const getSystemStats = async () => {
    const prisma = new PrismaClient();
    // ---------- TOTALES GENERALES ----------
    const totalUsers = await prisma.user.count();
    const totalProjects = await prisma.project.count();
    const totalTasks = await prisma.task.count();

    const completedTasks = await prisma.task.count({
        where: { status: "completed" }
    });

    const completionPercentage =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // ---------- TAREAS POR USUARIO ----------
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            Task_Task_assigneeIdToUser: {
                select: {
                    status: true
                }
            }
        }
    });

    const tasksPerUser = users.map((user: typeof users[number]) => {
        const tasks = user.Task_Task_assigneeIdToUser;

        const completed = tasks.filter((t: { status: string }) => t.status === "completed").length;
        const inProgress = tasks.filter((t: { status: string }) => t.status === "in_progress").length;
        const created = tasks.filter((t: { status: string }) => t.status === "created").length;
        const archived = tasks.filter((t: { status: string }) => t.status === "archived").length;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            totalTasks: tasks.length,
            completed,
            inProgress,
            created,
            archived
        };
    });

    // ---------- RESPUESTA FINAL ----------
    return {
        totals: {
            users: totalUsers,
            projects: totalProjects,
            tasks: totalTasks,
            completedTasks,
            completionPercentage
        },
        tasksPerUser
    };
};

export const getUserStats = async (userId : number) =>{

    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {
            id: true,
            name: true,
            email:true,
            Task_Task_assigneeIdToUser: {
                select: {status:true}
            }
        }
    });

    if(!user){
        throw new Error("Usuario no encontrado");
    }

    const tasks = user.Task_Task_assigneeIdToUser;
    const completed = tasks.filter(t => t.status === "completed").length;
    const inProgress = tasks.filter(t => t.status === "in_progress").length;
    const created = tasks.filter(t => t.status === "created").length;
    const archived = tasks.filter(t => t.status === "archived").length;

    return{
        id: user.id,
        name: user.name,
        email: user.email,
        totalTasks: tasks.length,
            completed,
            inProgress,
            created,
            archived,
            completionPercentage: tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100)
    };
}

export const getTaskStats = async (taskId : number) => {
    const task = await prisma.task.findUnique({
        where: {id: taskId},
        include:{
            User_Task_assigneeIdToUser: {
                select: {id:true, name:true, email:true}
            },
            User_Task_creatorIdToUser: {
                select: {id:true, name:true, email:true}
            },
            Project: {
                select: {id:true, name:true}
            }
        }

    });

    if(!task){
        throw new Error("Tarea no encontrada");
    }

    return{
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        createdAt: task.createdAt,
        dueDate: task.dueDate,
        creatorId: task.User_Task_creatorIdToUser,
        assignee: task.User_Task_assigneeIdToUser,
        project: task.Project
    };
};