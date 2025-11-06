// src/routes/auth.routes.ts
import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authLimiter, refreshLimiter } from "../middleware/rateLimit";
import type { RequestHandler } from "express";

const router = Router();

// Rutas de autenticación
router.post("/register", authLimiter as unknown as RequestHandler, authController.register);
router.post("/login", authLimiter as unknown as RequestHandler, authController.login);
router.get("/me", authController.me);
router.get("/verify", authController.verifyToken);
router.post("/refresh", refreshLimiter as unknown as RequestHandler, authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/logout-all", authController.logoutAll);

export default router;
