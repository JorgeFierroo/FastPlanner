import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useProject } from './ProjectContext';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// Función auxiliar para obtener headers con token
function getAuthHeaders() {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Tipo unificado para las tareas
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done' | 'pendiente' | 'completada' | 'en progreso' | 'sin empezar' | 'created' | 'in_progress' | 'completed' | 'archived';
  priority: 'alta' | 'media' | 'baja' | 'high' | 'medium' | 'low';
  assignedTo?: string[];
  tags?: string[];
  dueDate?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
  assigneeId?: number;
  creatorId?: number;
  projectId?: number;
  sprintId?: number;
}

// Mapeo de estados para normalizar entre vistas
export const statusMapping = {
  // Estados del Kanban
  'todo': 'Por Hacer',
  'inProgress': 'En Progreso', 
  'done': 'Completado',
  // Estados de la Tabla
  'Por Hacer': 'todo',
  'En Progreso': 'inProgress',
  'Completado': 'done',
  // Estados del Calendario
  'por hacer': 'todo',
  'en progreso': 'inProgress',
  'completada': 'done'
};

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  projectId: number | null;
  setProjectId: (id: number) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  moveTask: (id: number, newStatus: Task['status'], newDate?: string) => Promise<void>;
  getTasksByStatus: (status: Task['status']) => Task[];
  getTasksByDate: (date: string) => Task[];
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [projectId, setProjectId] = useState<number | null>(null);
  const projectContext = useProject();

  // Mapear estados del backend al frontend
  const mapBackendStatus = (status: string): Task['status'] => {
    const statusMap: Record<string, Task['status']> = {
      'created': 'todo',
      'in_progress': 'inProgress',
      'completed': 'done',
      'archived': 'done'
    };
    return statusMap[status] || status as Task['status'];
  };

  // Mapear estados del frontend al backend
  const mapFrontendStatus = (status: Task['status']): string => {
    const statusMap: Record<string, string> = {
      'todo': 'created',
      'inProgress': 'in_progress',
      'done': 'completed'
    };
    return statusMap[status] || status;
  };

  // Mapear prioridad del backend al frontend
  const mapBackendPriority = (priority: string): Task['priority'] => {
    const priorityMap: Record<string, Task['priority']> = {
      'high': 'alta',
      'medium': 'media',
      'low': 'baja'
    };
    return priorityMap[priority] || priority as Task['priority'];
  };

  // Mapear prioridad del frontend al backend
  const mapFrontendPriority = (priority: Task['priority']): string => {
    const priorityMap: Record<string, string> = {
      'alta': 'high',
      'media': 'medium',
      'baja': 'low'
    };
    return priorityMap[priority] || priority;
  };

  // Cargar tareas desde el backend
  const refreshTasks = async () => {
    if (!projectId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks/projects/${projectId}/tasks`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al cargar tareas');
      }

      const data = await response.json();
      
      // Mapear datos del backend al formato del frontend
      const mappedTasks = data.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        status: mapBackendStatus(task.status),
        priority: mapBackendPriority(task.priority),
        assignedTo: task.User_Task_assigneeIdToUser ? [task.User_Task_assigneeIdToUser.name] : [],
        tags: task.TaskTag?.map((tt: any) => tt.Tag.name) || [],
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : undefined,
        createdBy: task.User_Task_creatorIdToUser?.name || 'Usuario',
        createdAt: task.createdAt,
        updatedAt: task.createdAt,
        assigneeId: task.assigneeId,
        creatorId: task.creatorId,
        projectId: task.projectId,
        sprintId: task.sprintId
      }));

      setTasks(mappedTasks);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Sincronizar con el proyecto seleccionado del contexto
  useEffect(() => {
    if (projectContext.selectedProject) {
      setProjectId(projectContext.selectedProject.id);
    }
  }, [projectContext.selectedProject]);

  // Cargar tareas cuando cambia el projectId
  useEffect(() => {
    if (projectId) {
      refreshTasks();
    }
  }, [projectId]);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!projectId) {
      console.error('No hay proyecto seleccionado');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${projectId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          status: mapFrontendStatus(taskData.status),
          priority: mapFrontendPriority(taskData.priority),
          dueDate: taskData.dueDate,
          assigneeId: taskData.assigneeId,
          sprintId: taskData.sprintId
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear tarea');
      }

      await refreshTasks();
    } catch (error) {
      console.error('Error al crear tarea:', error);
      throw error;
    }
  };

  const updateTask = async (id: number, updates: Partial<Task>) => {
    if (!projectId) return;

    // Actualización optimista: actualizar UI inmediatamente
    const previousTasks = [...tasks];
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );

    try {
      const updateData: any = {};
      
      if (updates.title) updateData.title = updates.title;
      if (updates.description) updateData.description = updates.description;
      if (updates.priority) updateData.priority = mapFrontendPriority(updates.priority);
      if (updates.status) updateData.status = mapFrontendStatus(updates.status);
      if (updates.dueDate) updateData.dueDate = updates.dueDate;
      if (updates.assigneeId !== undefined) updateData.assigneeId = updates.assigneeId;
      if (updates.sprintId !== undefined) updateData.sprintId = updates.sprintId;

      const response = await fetch(`${API_URL}/tasks/projects/${projectId}/tasks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        // Si falla, revertir cambios
        setTasks(previousTasks);
        throw new Error('Error al actualizar tarea');
      }

      // Refrescar en segundo plano para sincronizar
      refreshTasks();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      throw error;
    }
  };

  const deleteTask = async (id: number) => {
    if (!projectId) return;

    try {
      const response = await fetch(`${API_URL}/tasks/projects/${projectId}/tasks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al eliminar tarea');
      }

      await refreshTasks();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      throw error;
    }
  };

  const moveTask = async (id: number, newStatus: Task['status'], newDate?: string) => {
    const updates: Partial<Task> = { status: newStatus };
    if (newDate) {
      updates.dueDate = newDate;
    }
    await updateTask(id, updates);
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter(task => task.dueDate === date);
  };

  const value: TaskContextType = {
    tasks,
    loading,
    projectId,
    setProjectId,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
    getTasksByDate,
    refreshTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};