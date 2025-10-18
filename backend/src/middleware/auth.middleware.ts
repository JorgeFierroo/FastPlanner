// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

// Extender el tipo Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ 
        error: "Token no proporcionado. Acceso denegado." 
      });
    }

    const user = await authService.getUserFromToken(token);
    req.user = user;
    
    next();
  } catch (error: any) {
    res.status(401).json({ 
      error: error.message || "Token inválido o expirado" 
    });
  }
};
