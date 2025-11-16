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
import { useProject } from "../context/ProjectContext";

type Column = {
  id: string;
  title: string;
  cards: Task[];
};

export function KanbanBoard() {
  const { tasks, loading, moveTask, addTask, deleteTask } = useTask();
  const { projects, selectedProject, selectProject, loading: projectsLoading } = useProject();
  const [newListTitle, setNewListTitle] = useState("");

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
  const deleteCard = async (columnId: string, cardId: number) => {
    console.log('Intentando eliminar tarea:', cardId);
    try {
      await deleteTask(cardId);
      console.log('Tarea eliminada exitosamente');
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  if (projectsLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando proyectos...</div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-600 mb-4">
            No tienes proyectos creados
          </div>
          <a href="/projects" className="text-blue-600 hover:underline">
            Ir a crear un proyecto
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#EFE0B4] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#574D33]">Tablero Kanban</h1>

      {/* Crear nueva lista */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newListTitle}
          onChange={e => setNewListTitle(e.target.value)}
          placeholder="Nombre de nueva lista..."
          className="border-2 border-[#A89663] bg-[#F5DA91] rounded-lg px-3 py-2 flex-1 text-[#574D33] placeholder-[#A89663]"
        />
        <button
          onClick={addNewList}
          className="text-white px-4 py-2 rounded-lg bg-[#a89663] hover:bg-[#7f724b]"
        >
          Agregar lista
        </button>
      </div>

      {!selectedProject ? (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">
            Selecciona un proyecto del menú superior para ver las tareas
          </div>
        </div>
      ) : loading ? (
        <div className="text-center py-8">
          <div className="text-gray-600">Cargando tareas...</div>
        </div>
      ) : (
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
      )}
    </div>
  );
}