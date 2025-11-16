// src/services/user.service.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const userService = {
  // Crear un usuario (admin)
  async createUser(data: { name: string; email: string; password?: string; isAdmin?: boolean }) {
    const payload: any = {
      name: data.name,
      email: data.email,
    };

    if (data.password) {
      payload.password = await bcrypt.hash(data.password, 10);
    } else {
      // Si no se proporciona password, se genera uno aleatorio (no ideal, admin debe enviar password)
      payload.password = await bcrypt.hash(Math.random().toString(36).slice(2, 10), 10);
    }

    if (typeof data.isAdmin === "boolean") {
      payload.isAdmin = data.isAdmin;
    }

    const user = await prisma.user.create({
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        isAdmin: true,
        createdAt: true,
      } as any,
    });

    return user;
  },

  // Obtener todos los usuarios (solo campos no sensibles)
  async getUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        isAdmin: true,
        createdAt: true,
      } as any,
    });
  },

  // Obtener un usuario por ID (sin password)
  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        isAdmin: true,
        createdAt: true,
      } as any,
    });
  },

  // Actualizar un usuario (no permite establecer password aquí)
  async updateUser(id: number, data: { name?: string; email?: string; isAdmin?: boolean }) {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (typeof data.isAdmin === "boolean") updateData.isAdmin = data.isAdmin;

    return await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        isAdmin: true,
        createdAt: true,
      } as any,
    });
  },

  // Eliminar un usuario
  async deleteUser(id: number) {
    await prisma.user.delete({ where: { id } });
    return { message: "Usuario eliminado" };
  },
};
