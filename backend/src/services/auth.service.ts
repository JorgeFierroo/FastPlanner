// src/services/auth.service.ts
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "tu_clave_secreta_super_segura_2024";

export const authService = {
  // Registrar un nuevo usuario
  async register(data: { name: string; email: string; password: string }) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new Error("El email ya está registrado");
      }

      // Crear el usuario (sin encriptación por ahora)
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password, // Sin encriptar por ahora
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      // Generar token JWT
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: "7d" } // Token válido por 7 días
      );

      return {
        user,
        token,
      };
    } catch (error: any) {
      throw new Error(error.message || "Error al registrar usuario");
    }
  },

  // Iniciar sesión
  async login(data: { email: string; password: string }) {
    try {
      // Buscar el usuario por email
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new Error("Credenciales inválidas");
      }

      // Verificar contraseña (sin encriptación por ahora - comparación directa)
      if (user.password !== data.password) {
        throw new Error("Credenciales inválidas");
      }

      // Generar token JWT
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email
        },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Devolver usuario sin la contraseña
      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        token,
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
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
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
};
