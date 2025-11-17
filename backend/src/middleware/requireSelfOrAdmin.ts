import { Request, Response, NextFunction } from "express";
import { requireAdmin } from "./requireAdmin";

/**
 * Comprueba si el recurso pertenece al usuario autenticado.
 * Soporta varios nombres comunes de parámetro: id, userId, ownerId, user_id, profileId, etc.
 */
function isOwnResource(req: Request) {
  const user = (req as any).user;
  if (!user || !user.id) return false;

  // Nombres comunes de parámetros/propiedades donde puede venir el id del usuario
  const paramCandidates = [
    // params
    () => req.params.id,
    () => req.params.userId,
    () => req.params.userID,
    () => req.params.ownerId,
    () => req.params.profileId,
    () => req.params.accountId,
    // body
    () => req.body.id,
    () => req.body.userId,
    () => req.body.ownerId,
    () => req.body.profileId,
    () => req.body.accountId,
    // query
    () => req.query.id,
    () => req.query.userId,
    () => req.query.ownerId,
    () => req.query.profileId,
    () => req.query.accountId,
  ];

  for (const getter of paramCandidates) {
    const maybe = getter();
    if (maybe === undefined || maybe === null) continue;

    const paramId = Number(maybe);
    if (!paramId || Number.isNaN(paramId)) continue;

    if (Number(user.id) === Number(paramId)) return true;
  }

  // También soportar identificación por email en rutas que envían email en params/body/query
  const emailCandidates = [() => req.params.email, () => req.body.email, () => req.query.email];
  for (const g of emailCandidates) {
    const maybeEmail = g();
    if (!maybeEmail) continue;
    if ((user.email || "").toLowerCase() === String(maybeEmail).toLowerCase()) return true;
  }

  return false;
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
