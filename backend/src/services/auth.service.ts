// src/services/auth.service.ts
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta_super_segura_2024";
const ACCESS_TOKEN_EXPIRY = "15m"; // Access token expira en 15 minutos
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos
const REFRESH_TOKEN_EXPIRY_EXTENDED = 30 * 24 * 60 * 60 * 1000; // 30 días si "recordarme"

// Función auxiliar para generar refresh token
function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString("hex");
}

// Función auxiliar para generar access token
function generateAccessToken(userId: number, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

export const authService = {
  // Registrar un nuevo usuario
  async register(data: { name: string; email: string; password: string }, userAgent?: string) {
    try {
      const email = data.email.trim().toLowerCase();
      const name = data.name.trim();
      const plainPassword = data.password;

      if (!name || !email || !plainPassword) {
        throw new Error("Todos los campos son requeridos");
      }

      if (plainPassword.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("El email ya está registrado");
      }

      // Hash de contraseña
      const passwordHash = await bcrypt.hash(plainPassword, 10);

      // Crear el usuario
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      // Generar tokens
  const accessToken = generateAccessToken(user.id, user.email);
      const refreshToken = generateRefreshToken();
      const refreshTokenExpiry = new Date(Date.now() + REFRESH_TOKEN_EXPIRY);

      // Guardar refresh token en la base de datos
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          userAgent: userAgent,
          expiresAt: refreshTokenExpiry,
        },
      });

      return {
        user,
        accessToken,
        refreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
      };
    } catch (error: any) {
      throw new Error(error.message || "Error al registrar usuario");
    }
  },

  // Iniciar sesión
  async login(data: { email: string; password: string; rememberMe?: boolean }, userAgent?: string) {
    try {
      const email = data.email.trim().toLowerCase();
      const plainPassword = data.password;
      const rememberMe = data.rememberMe || false;

      if (!email || !plainPassword) {
        throw new Error("Email y contraseña son requeridos");
      }

      // Buscar el usuario por email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Credenciales inválidas");
      }

      // Verificar contraseña
      const isValid = await bcrypt.compare(plainPassword, user.password);
      if (!isValid) {
        throw new Error("Credenciales inválidas");
      }

      // Generar tokens
      const accessToken = generateAccessToken(user.id, user.email);
      const refreshToken = generateRefreshToken();
      // Usar expiración extendida si "recordarme" está activo
      const expiryTime = rememberMe ? REFRESH_TOKEN_EXPIRY_EXTENDED : REFRESH_TOKEN_EXPIRY;
      const refreshTokenExpiry = new Date(Date.now() + expiryTime);

      // Guardar refresh token en la base de datos
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
          userAgent: userAgent,
          expiresAt: refreshTokenExpiry,
        },
      });

      // Obtener datos relacionados del usuario (proyectos, tareas, historial)
      const fullUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
          UserProject: {
            select: {
              projectId: true,
              role: true,
              Project: {
                select: { id: true, name: true, description: true }
              }
            }
          },
          Task_Task_assigneeIdToUser: {
            select: { id: true, title: true, status: true, projectId: true, dueDate: true }
          },
          Task_Task_creatorIdToUser: {
            select: { id: true, title: true, status: true, projectId: true, dueDate: true }
          },
          ChangeHistory: {
            select: { id: true, date: true, description: true, action: true, projectId: true, taskId: true }
          }
        }
      });

      return {
        user: fullUser,
        accessToken,
        refreshToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
      };
    } catch (error: any) {
      throw new Error(error.message || "Error al iniciar sesión");
    }
  },

  // Verificar token
  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  },

  // Obtener información del usuario por token
  async getUserFromToken(token: string) {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      
      // Devolver usuario con datos relacionados para mostrar dashboard previo
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
          UserProject: {
            select: {
              projectId: true,
              role: true,
              Project: { select: { id: true, name: true } }
            }
          },
          Task_Task_assigneeIdToUser: { select: { id: true, title: true, status: true, projectId: true } },
          Task_Task_creatorIdToUser: { select: { id: true, title: true, status: true, projectId: true } },
        },
      });

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message || "Error al obtener usuario");
    }
  },

  // Renovar access token usando refresh token
  async refreshAccessToken(refreshToken: string) {
    try {
      // Buscar el refresh token en la base de datos
      const storedToken = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken) {
        throw new Error("Refresh token inválido");
      }

      // Verificar si el token ha expirado
      if (storedToken.expiresAt < new Date()) {
        // Eliminar el token expirado
        await prisma.refreshToken.delete({
          where: { id: storedToken.id },
        });
        throw new Error("Refresh token expirado");
      }

      // Generar nuevo access token
      const accessToken = generateAccessToken(storedToken.user.id, storedToken.user.email);

      return {
        accessToken,
        expiresIn: ACCESS_TOKEN_EXPIRY,
      };
    } catch (error: any) {
      throw new Error(error.message || "Error al renovar token");
    }
  },

  // Revocar refresh token (logout)
  async revokeRefreshToken(refreshToken: string) {
    try {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
      return { message: "Sesión cerrada exitosamente" };
    } catch (error: any) {
      throw new Error(error.message || "Error al cerrar sesión");
    }
  },

  // Revocar todos los refresh tokens de un usuario
  async revokeAllUserTokens(userId: number) {
    try {
      await prisma.refreshToken.deleteMany({
        where: { userId },
      });
      return { message: "Todas las sesiones han sido cerradas" };
    } catch (error: any) {
      throw new Error(error.message || "Error al cerrar sesiones");
    }
  },

  // Limpiar tokens expirados (ejecutar periódicamente)
  async cleanExpiredTokens() {
    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });
      return { deletedCount: result.count };
    } catch (error: any) {
      throw new Error(error.message || "Error al limpiar tokens expirados");
    }
  },
};
