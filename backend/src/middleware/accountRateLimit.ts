import { Request, Response, NextFunction, RequestHandler } from "express";

type LimitEntry = {
  count: number;
  expiresAt: number;
};

/**
 * Middleware simple en memoria para limitar intentos por cuenta (email).
 * WARNING: Esto es in-memory y no es adecuado para producción en múltiples instancias.
 * Recomendar usar Redis o `rate-limiter-flexible` en ambientes distribuidos.
 */
export function accountLimiter(options?: { max?: number; windowMs?: number; message?: any }): RequestHandler {
  const max = options?.max ?? 5;
  const windowMs = options?.windowMs ?? 10 * 60 * 1000; // 10 minutos
  const message = options?.message ?? {
    error: "Demasiados intentos",
    detail: "Se han excedido los intentos permitidos para esta cuenta. Intenta más tarde.",
  };

  const store = new Map<string, LimitEntry>();

  // Cleanup periódicamente para evitar crecimiento indefinido
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (entry.expiresAt <= now) store.delete(key);
    }
  }, Math.max(60_000, Math.floor(windowMs / 2)));

  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const emailRaw = (req.body && (req.body.email || req.body.username)) || "";
      const email = String(emailRaw || "").trim().toLowerCase();

      if (!email) {
        // Si no hay email en body, no aplicamos límite por cuenta (se usa IP u otro middleware)
        return next();
      }

      const now = Date.now();
      const existing = store.get(email);

      if (!existing || existing.expiresAt <= now) {
        store.set(email, { count: 1, expiresAt: now + windowMs });
        return next();
      }

      existing.count += 1;
      store.set(email, existing);

      if (existing.count > max) {
        res.status(429).json(message);
        return;
      }

      next();
    } catch (err) {
      // Si falla el middleware, no bloquear la autenticación: seguir al siguiente
      next();
    }
  };
}

export default accountLimiter;
