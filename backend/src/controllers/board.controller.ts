import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BoardController {
  // Obtener todos los tableros del usuario
  async getBoards(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const boards = await prisma.board.findMany({
        where: {
          ownerId: userId
        },
        include: {
          lists: {
            include: {
              tasks: true
            }
          }
        },
        orderBy: {
          id: 'desc'
        }
      });

      res.json(boards);
    } catch (error) {
      console.error('Error al obtener tableros:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Obtener un tablero específico
  async getBoardById(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const boardId = parseInt(req.params.id);

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const board = await prisma.board.findFirst({
        where: {
          id: boardId,
          ownerId: userId
        },
        include: {
          lists: {
            include: {
              tasks: {
                orderBy: {
                  id: 'asc'
                }
              }
            },
            orderBy: {
              id: 'asc'
            }
          }
        }
      });

      if (!board) {
        return res.status(404).json({ error: 'Tablero no encontrado' });
      }

      res.json(board);
    } catch (error) {
      console.error('Error al obtener tablero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Crear un nuevo tablero
  async createBoard(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const { title } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'El título es requerido' });
      }

      const board = await prisma.board.create({
        data: {
          title: title.trim(),
          ownerId: userId
        },
        include: {
          lists: true
        }
      });

      res.status(201).json(board);
    } catch (error) {
      console.error('Error al crear tablero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Actualizar un tablero
  async updateBoard(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const boardId = parseInt(req.params.id);
      const { title } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'El título es requerido' });
      }

      // Verificar que el tablero pertenece al usuario
      const existingBoard = await prisma.board.findFirst({
        where: {
          id: boardId,
          ownerId: userId
        }
      });

      if (!existingBoard) {
        return res.status(404).json({ error: 'Tablero no encontrado' });
      }

      const board = await prisma.board.update({
        where: {
          id: boardId
        },
        data: {
          title: title.trim()
        },
        include: {
          lists: true
        }
      });

      res.json(board);
    } catch (error) {
      console.error('Error al actualizar tablero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Eliminar un tablero
  async deleteBoard(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const boardId = parseInt(req.params.id);

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      // Verificar que el tablero pertenece al usuario
      const existingBoard = await prisma.board.findFirst({
        where: {
          id: boardId,
          ownerId: userId
        }
      });

      if (!existingBoard) {
        return res.status(404).json({ error: 'Tablero no encontrado' });
      }

      await prisma.board.delete({
        where: {
          id: boardId
        }
      });

      res.json({ 
        message: 'Tablero eliminado exitosamente',
        deletedId: boardId
      });
    } catch (error) {
      console.error('Error al eliminar tablero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Crear una lista en un tablero
  async createList(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const boardId = parseInt(req.params.id);
      const { title } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'El título es requerido' });
      }

      // Verificar que el tablero pertenece al usuario
      const board = await prisma.board.findFirst({
        where: {
          id: boardId,
          ownerId: userId
        }
      });

      if (!board) {
        return res.status(404).json({ error: 'Tablero no encontrado' });
      }

      const list = await prisma.list.create({
        data: {
          title: title.trim(),
          boardId: boardId
        },
        include: {
          tasks: true
        }
      });

      res.status(201).json(list);
    } catch (error) {
      console.error('Error al crear lista:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Crear una tarea en una lista
  async createTask(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const listId = parseInt(req.params.listId);
      const { title, desc, status, dueDate } = req.body;

      if (!userId) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'El título es requerido' });
      }

      // Verificar que la lista pertenece a un tablero del usuario
      const list = await prisma.list.findFirst({
        where: {
          id: listId,
          board: {
            ownerId: userId
          }
        }
      });

      if (!list) {
        return res.status(404).json({ error: 'Lista no encontrada' });
      }

      const task = await prisma.task.create({
        data: {
          title: title.trim(),
          desc: desc?.trim() || null,
          status: status || 'todo',
          dueDate: dueDate ? new Date(dueDate) : null,
          listId: listId
        }
      });

      res.status(201).json(task);
    } catch (error) {
      console.error('Error al crear tarea:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}