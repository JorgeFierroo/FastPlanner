// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
  // Registro de usuario
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const userAgent = req.get("user-agent");

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

      const result = await authService.register({ name, email, password }, userAgent);
      
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
      const userAgent = req.get("user-agent");

      // Validaciones básicas
      if (!email || !password) {
        return res.status(400).json({ 
          error: "Email y contraseña son requeridos" 
        });
      }

      const result = await authService.login({ email, password }, userAgent);
      
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

  // Renovar access token
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ 
          error: "Refresh token no proporcionado" 
        });
      }

      const result = await authService.refreshAccessToken(refreshToken);
      
      res.json({
        message: "Token renovado exitosamente",
        ...result,
      });
    } catch (error: any) {
      console.error("Error al renovar token:", error);
      res.status(401).json({ 
        error: error.message || "Error al renovar token" 
      });
    }
  },

  // Logout (revocar refresh token)
  async logout(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ 
          error: "Refresh token no proporcionado" 
        });
      }

      const result = await authService.revokeRefreshToken(refreshToken);
      
      res.json(result);
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error);
      res.status(500).json({ 
        error: error.message || "Error al cerrar sesión" 
      });
    }
  },

  // Logout de todos los dispositivos
  async logoutAll(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ 
          error: "Token no proporcionado" 
        });
      }

      const decoded: any = authService.verifyToken(token);
      const result = await authService.revokeAllUserTokens(decoded.userId);
      
      res.json(result);
    } catch (error: any) {
      console.error("Error al cerrar todas las sesiones:", error);
      res.status(500).json({ 
        error: error.message || "Error al cerrar todas las sesiones" 
      });
    }
  },
};
