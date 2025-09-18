import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al crear usuario" });
    }
  },

  async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json(users);
  },

  async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    res.json(user);
  },

  async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await userService.updateUser(id, req.body);
    res.json(user);
  },

  async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    res.json({ message: "Usuario eliminado" });
  },
};
