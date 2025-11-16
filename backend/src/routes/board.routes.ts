import { Router } from "express";
import { BoardController } from "../controllers/board.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const boardController = new BoardController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas de tareas (board)
// POST /tasks/{projectId} - Crear nueva tarea
router.post("/:projectId", boardController.createTask.bind(boardController));

// GET /tasks/projects/{projectId}/tasks/{taskId} - Obtener tarea por ID
router.get("/projects/:projectId/tasks/:taskId", boardController.getTaskById.bind(boardController));

// PUT /tasks/projects/{projectId}/tasks/{taskId} - Actualizar tarea
router.put("/projects/:projectId/tasks/:taskId", boardController.updateTask.bind(boardController));

// DELETE /tasks/projects/{projectId}/tasks/{taskId} - Eliminar tarea
router.delete("/projects/:projectId/tasks/:taskId", boardController.deleteTask.bind(boardController));

// GET /tasks/projects/{projectId}/tasks - Obtener tareas por proyecto
router.get("/projects/:projectId/tasks", boardController.getTasksByProject.bind(boardController));

// POST /tasks/{projectId}/{taskId}/assign - Asignar tarea
router.post("/:projectId/:taskId/assign", boardController.assignTask.bind(boardController));

// POST /tasks/{projectId}/{taskId}/status - Cambiar estado de tarea
router.post("/:projectId/:taskId/status", boardController.changeTaskStatus.bind(boardController));

export default router;