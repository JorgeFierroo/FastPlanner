import { Router } from "express";
import { BoardController } from "../controllers/board.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const boardController = new BoardController();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Rutas de tableros
router.get("/", boardController.getBoards);
router.post("/", boardController.createBoard);
router.get("/:id", boardController.getBoardById);
router.put("/:id", boardController.updateBoard);
router.delete("/:id", boardController.deleteBoard);

// Rutas de listas dentro de tableros
router.post("/:id/lists", boardController.createList);

// Rutas de tareas dentro de listas
router.post("/lists/:listId/tasks", boardController.createTask);

export default router;