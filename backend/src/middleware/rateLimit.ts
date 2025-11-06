import rateLimit from "express-rate-limit";
import { Request } from "express";

// Helper para mensajes consistentes
const message = (req: Request) => ({
  error: "Demasiadas solicitudes",
  detail: "Has superado el límite de peticiones. Intenta nuevamente más tarde.",
  path: req.originalUrl,
});

// Límite global: 300 req / 15 min por IP
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message,
  skip: (req) => req.path === "/api/health",
});

// Límite para autenticación: 10 intentos / 10 min por IP
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message,
});

// Límite para refresh token: 60 req / 10 min por IP
export const refreshLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message,
});

// Límite para endpoints sensibles (opcional extra estricto)
export const strictLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message,
});
