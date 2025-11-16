import { Request, Response, NextFunction } from "express";

function isEnvAdmin(userEmail?: string) {
  const list = (process.env.ADMINS || "").split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return userEmail ? list.includes(userEmail.toLowerCase()) : false;
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: "No autenticado" });

  if (user.isAdmin === true || isEnvAdmin(user.email)) {
    return next();
  }

  return res.status(403).json({ error: "Acceso denegado" });
};

export default requireAdmin;
