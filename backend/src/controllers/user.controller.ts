import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error crear usuario:", error);
      res.status(500).json({ error: "Error al crear usuario" });
    }
  },

  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  },

  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const user = await userService.getUserById(id);
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener usuario" });
    }
  },

  async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const user = await userService.updateUser(id, req.body);
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Error al actualizar usuario" });
    }
  },

  async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const result = await userService.deleteUser(id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: "Error al eliminar usuario" });
    }
  },
  
  // Promover usuario a administrador (admin only)
  async promoteToAdmin(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      if (!id || Number.isNaN(id)) return res.status(400).json({ error: "ID inválido" });

      const requester = (req as any).user;
      // Evitar que un admin se despromocione a sí mismo por accidente vía este endpoint
      if (requester && Number(requester.id) === id) {
        return res.status(400).json({ error: "No puedes promocionarte/alterar tu propio rol aquí" });
      }

      const user = await userService.updateUser(id, { isAdmin: true });
      res.json(user);
    } catch (err: any) {
      console.error("Error promoviendo usuario:", err);
      res.status(500).json({ error: err.message || "Error al promover usuario" });
    }
  },
};
