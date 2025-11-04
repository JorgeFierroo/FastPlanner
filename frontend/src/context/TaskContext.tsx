import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipo unificado para las tareas
export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done' | 'pendiente' | 'completada' | 'en progreso' | 'sin empezar';
  priority: 'alta' | 'media' | 'baja';
  assignedTo?: string[];
  tags?: string[];
  dueDate?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
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
  'pendiente': 'todo',
  'en progreso': 'inProgress',
  'completada': 'done',
  'sin empezar': 'todo'
};

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  moveTask: (id: number, newStatus: Task['status'], newDate?: string) => void;
  getTasksByStatus: (status: Task['status']) => Task[];
  getTasksByDate: (date: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Datos iniciales unificados
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Crear componentes iniciales de UI",
    description: "Implementar componentes base con shadcn/ui para el sistema colaborativo",
    status: 'done',
    priority: 'alta',
    assignedTo: ["MG"],
    tags: ["Frontend", "Completado"],
    dueDate: "2025-01-15",
    createdBy: "Admin",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15"
  },
  {
    id: 2,
    title: "Implementar funcionalidad de arrastrar y soltar",
    description: "Agregar react-dnd para mover tarjetas entre listas con permisos",
    status: 'inProgress',
    priority: 'media',
    assignedTo: ["JP", "AN"],
    tags: ["Desarrollo", "Frontend"],
    dueDate: "2025-01-20",
    createdBy: "Admin",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-10"
  },
  {
    id: 3,
    title: "Implementar sistema de roles",
    description: "Crear admin, editor, colaborador y visualizador con permisos diferenciados",
    status: 'todo',
    priority: 'alta',
    assignedTo: ["FR"],
    tags: ["Desarrollo", "Backend"],
    dueDate: "2025-01-25",
    createdBy: "Admin",
    createdAt: "2025-01-02",
    updatedAt: "2025-01-02"
  },
  {
    id: 4,
    title: "Diseñar interfaz de usuario",
    description: "Crear mockups y prototipos para la aplicación",
    status: 'inProgress',
    priority: 'media',
    assignedTo: ["Designer"],
    tags: ["Diseño", "UI/UX"],
    dueDate: "2025-01-18",
    createdBy: "Admin",
    createdAt: "2025-01-03",
    updatedAt: "2025-01-08"
  },
  {
    id: 5,
    title: "Configurar base de datos",
    description: "Establecer conexión y esquemas de base de datos",
    status: 'done',
    priority: 'alta',
    assignedTo: ["Backend Dev"],
    tags: ["Backend", "Database"],
    dueDate: "2025-01-12",
    createdBy: "Admin",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-12"
  }
];

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.max(...tasks.map(t => t.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const moveTask = (id: number, newStatus: Task['status'], newDate?: string) => {
    const updates: Partial<Task> = { status: newStatus };
    if (newDate) {
      updates.dueDate = newDate;
    }
    updateTask(id, updates);
  };

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter(task => task.dueDate === date);
  };

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
    getTasksByDate
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