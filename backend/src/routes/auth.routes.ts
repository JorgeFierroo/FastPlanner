// src/routes/auth.routes.ts
import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

// Rutas de autenticación
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authController.me);
router.get("/verify", authController.verifyToken);

export default router;
