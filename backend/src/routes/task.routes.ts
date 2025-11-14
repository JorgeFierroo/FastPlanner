import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { authMiddleware } from "../middleware/auth.middleware";
import { requireProjectPermission } from "../middleware/authorization.middleware";
import permissionsLib, { Permission } from "../lib/permissions";
import { taskController } from "../controllers/task.controller";

const router = Router();

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => cb(null, uploadDir),
  filename: (req: any, file: any, cb: any) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Obtener una tarea (protegida - view_tasks)
router.get(
  "/:taskId",
  authMiddleware,
  requireProjectPermission(Permission.VIEW_TASKS),
  taskController.getTask
);

// Actualizar una tarea (protegida - edit_tasks)
router.put(
  "/:taskId",
  authMiddleware,
  requireProjectPermission(Permission.EDIT_TASKS),
  taskController.updateTask
);

// Adjuntar archivo a una tarea (protegida - attach_files)
router.post(
  "/:taskId/attachments",
  authMiddleware,
  requireProjectPermission(Permission.ATTACH_FILES),
  upload.single("file"),
  taskController.uploadAttachment
);

export default router;
