// src/services/user.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userService = {
  // Crear un usuario
  async createUser(data: { name: string; email: string; password: string }) {
    return await prisma.user.create({
      data,
    });
  },

  // Obtener todos los usuarios
  async getUsers() {
    return await prisma.user.findMany();
  },

  // Obtener un usuario por ID
  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  // Actualizar un usuario
  async updateUser(id: number, data: { name?: string; email?: string }) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  // Eliminar un usuario
  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id },
    });
  },
};
