import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import requireAdmin from "../middleware/requireAdmin";
import requireSelfOrAdmin from "../middleware/requireSelfOrAdmin";

const router = Router();

// Crear y listar usuarios: solo admin
router.post("/", authMiddleware, requireAdmin, userController.createUser);
router.get("/", authMiddleware, requireAdmin, userController.getUsers);

// Operaciones por id: solo el propio usuario o admin
router.get("/:id", authMiddleware, requireSelfOrAdmin, userController.getUserById);
router.put("/:id", authMiddleware, requireSelfOrAdmin, userController.updateUser);
router.delete("/:id", authMiddleware, requireSelfOrAdmin, userController.deleteUser);
// Promover a admin: solo admin puede hacerlo
router.post("/:id/promote", authMiddleware, requireAdmin, userController.promoteToAdmin);

export default router;
