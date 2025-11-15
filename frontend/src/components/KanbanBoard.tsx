import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanList } from "./KanbanList";
import { useTask, Task } from "../context/TaskContext";

type Column = {
  id: string;
  title: string;
  cards: Task[];
};

export function KanbanBoard() {
  const { tasks, loading, projectId, setProjectId, moveTask, addTask, deleteTask } = useTask();
  const [newListTitle, setNewListTitle] = useState("");

  // TODO: Obtener projectId del contexto de proyecto o de la URL
  // Por ahora, si no hay projectId, usar uno por defecto
  if (!projectId) {
    // Intentar obtener de localStorage o usar un valor por defecto
    const savedProjectId = localStorage.getItem('currentProjectId');
    if (savedProjectId) {
      setProjectId(parseInt(savedProjectId));
    }
  }

  // Organizar tareas por columnas
  const columns: Column[] = [
    {
      id: "todo",
      title: "Por hacer",
      cards: tasks.filter((task: Task) => task.status === 'todo'),
    },
    {
      id: "inProgress", 
      title: "En progreso",
      cards: tasks.filter((task: Task) => task.status === 'inProgress'),
    },
    {
      id: "done",
      title: "Completado", 
      cards: tasks.filter((task: Task) => task.status === 'done'),
    },
  ];

  // --- Mover tarjetas entre columnas ---
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const taskId = Number(active.id);
    const targetColId = over.data.current?.columnId;
    
    if (targetColId) {
      let newStatus: Task['status'];
      switch (targetColId) {
        case 'todo':
          newStatus = 'todo';
          break;
        case 'inProgress':
          newStatus = 'inProgress';
          break;
        case 'done':
          newStatus = 'done';
          break;
        default:
          return;
      }
      
      moveTask(taskId, newStatus);
    }
  };

  // --- Agregar nueva tarjeta ---
  const addNewCard = (columnId: string, title: string, description: string) => {
    if (!title.trim()) return;

    let status: Task['status'];
    switch (columnId) {
      case 'todo':
        status = 'todo';
        break;
      case 'inProgress':
        status = 'inProgress';
        break;
      case 'done':
        status = 'done';
        break;
      default:
        status = 'todo';
    }

    addTask({
      title,
      description,
      status,
      priority: 'media',
      assignedTo: [],
      tags: ["Nueva"],
      dueDate: new Date().toISOString().split('T')[0],
      createdBy: "Usuario"
    });
  };

  // --- Eliminar tarjeta ---
  const deleteCard = (columnId: string, cardId: number) => {
    deleteTask(cardId);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando tareas...</div>
      </div>
    );
  }

  if (!projectId) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">
          Por favor selecciona un proyecto para ver las tareas
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Tablero Kanban</h1>
        
        {/* Selector temporal de proyecto */}
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Proyecto ID:</label>
          <input
            type="number"
            value={projectId || ''}
            onChange={(e) => {
              const id = parseInt(e.target.value);
              if (id) {
                setProjectId(id);
                localStorage.setItem('currentProjectId', id.toString());
              }
            }}
            className="px-3 py-2 border border-gray-300 rounded-md w-24"
            placeholder="ID"
          />
        </div>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-6">
          {columns.map(col => (
            <SortableContext
              key={col.id}
              items={col.cards.map(c => c.id)}
              strategy={rectSortingStrategy}
            >
              <KanbanList
                title={col.title}
                cards={col.cards}
                columnId={col.id}
                onAddCard={addNewCard}
                onDeleteList={() => {}}
                onDeleteCard={deleteCard}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}