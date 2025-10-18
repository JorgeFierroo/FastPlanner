// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  // Registro de usuario
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Validaciones básicas
      if (!name || !email || !password) {
        return res.status(400).json({ 
          error: "Todos los campos son requeridos" 
        });
      }

      if (password.length < 6) {
        return res.status(400).json({ 
          error: "La contraseña debe tener al menos 6 caracteres" 
        });
      }

      const result = await authService.register({ name, email, password });
      
      res.status(201).json({
        message: "Usuario registrado exitosamente",
        ...result,
      });
    } catch (error: any) {
      console.error("Error en registro:", error);
      res.status(400).json({ 
        error: error.message || "Error al registrar usuario" 
      });
    }
  },

  // Login de usuario
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validaciones básicas
      if (!email || !password) {
        return res.status(400).json({ 
          error: "Email y contraseña son requeridos" 
        });
      }

      const result = await authService.login({ email, password });
      
      res.json({
        message: "Inicio de sesión exitoso",
        ...result,
      });
    } catch (error: any) {
      console.error("Error en login:", error);
      res.status(401).json({ 
        error: error.message || "Error al iniciar sesión" 
      });
    }
  },

  // Obtener usuario actual (basado en el token)
  async me(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ 
          error: "Token no proporcionado" 
        });
      }

      const user = await authService.getUserFromToken(token);
      
      res.json({ user });
    } catch (error: any) {
      console.error("Error al obtener usuario:", error);
      res.status(401).json({ 
        error: error.message || "Error al obtener información del usuario" 
      });
    }
  },

  // Verificar token
  async verifyToken(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ 
          error: "Token no proporcionado",
          valid: false 
        });
      }

      const decoded = authService.verifyToken(token);
      
      res.json({ 
        valid: true,
        decoded 
      });
    } catch (error: any) {
      res.status(401).json({ 
        error: error.message || "Token inválido",
        valid: false 
      });
    }
  },
};
