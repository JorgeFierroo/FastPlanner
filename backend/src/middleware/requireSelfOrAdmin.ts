import { Request, Response, NextFunction } from "express";
import { requireAdmin } from "./requireAdmin";

function isOwnResource(req: Request) {
  const user = (req as any).user;
  const paramId = Number(req.params.id || req.body.id || req.query.id);
  if (!user || !user.id) return false;
  if (!paramId || Number.isNaN(paramId)) return false;
  return Number(user.id) === Number(paramId);
}

export const requireSelfOrAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (isOwnResource(req)) return next();

    // Delega a requireAdmin (que devuelve 401 si no autenticado)
    return requireAdmin(req, res, next);
  } catch (err) {
    return res.status(403).json({ error: "Acceso denegado" });
  }
};

export default requireSelfOrAdmin;
