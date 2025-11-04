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
  const { tasks, moveTask, addTask, deleteTask } = useTask();
  const [newListTitle, setNewListTitle] = useState("");

  // Organizar tareas por columnas
  const columns: Column[] = [
    {
      id: "todo",
      title: "Por hacer",
      cards: tasks.filter(task => task.status === 'todo'),
    },
    {
      id: "inProgress", 
      title: "En progreso",
      cards: tasks.filter(task => task.status === 'inProgress'),
    },
    {
      id: "done",
      title: "Completado", 
      cards: tasks.filter(task => task.status === 'done'),
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tablero Kanban</h1>



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