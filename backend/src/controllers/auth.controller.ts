// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  // Registrar usuario
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }

      const result = await authService.register({ name, email, password });

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: result.user,
        token: result.token,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  // Iniciar sesión
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email y contraseña son requeridos" });
      }

      const result = await authService.login({ email, password });

      res.json({
        message: "Inicio de sesión exitoso",
        user: result.user,
        token: result.token,
      });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },

  // Obtener usuario actual
  async me(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
      }

      const user = await authService.getUserFromToken(token);

      res.json({ user });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },

  // Verificar token
  async verifyToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
      }

      const decoded = authService.verifyToken(token);

      res.json({ valid: true, decoded });
    } catch (error: any) {
      res.status(401).json({ valid: false, error: error.message });
    }
  },
};
