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

type Task = {
  id: number;
  title: string;
  description: string;
  label?: string;
};

type Column = {
  id: string;
  title: string;
  cards: Task[];
};

const initialData: Column[] = [
  {
    id: "todo",
    title: "Por hacer",
    cards: [
      { id: 1, title: "Tarea 1", description: "Pendiente de empezar", label: "Baja" },
      { id: 2, title: "Tarea 2", description: "Revisar requisitos", label: "Media" },
    ],
  },
  {
    id: "inProgress",
    title: "En progreso",
    cards: [{ id: 3, title: "Tarea 3", description: "En desarrollo", label: "Alta" }],
  },
  {
    id: "done",
    title: "Completado",
    cards: [{ id: 4, title: "Tarea 4", description: "Completada", label: "Hecho" }],
  },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [newListTitle, setNewListTitle] = useState("");

  // --- Mover tarjetas entre columnas ---
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    setColumns(cols => {
      const newCols = cols.map(col => ({ ...col, cards: [...col.cards] }));
      let movingCard: Task | null = null;
      let sourceColId = "";

      // Buscar y remover tarjeta del origen
      newCols.forEach(col => {
        const index = col.cards.findIndex(card => card.id === active.id);
        if (index > -1) {
          movingCard = col.cards.splice(index, 1)[0];
          sourceColId = col.id;
        }
      });

      if (!movingCard) return newCols;

      // Insertar en destino
      const targetColId = over.data.current?.columnId || sourceColId;
      const targetCol = newCols.find(c => c.id === targetColId);
      if (targetCol) targetCol.cards.push(movingCard);

      return newCols;
    });
  };

  // --- Agregar nueva lista ---
  const addNewList = () => {
    if (newListTitle.trim() === "") return;
    const newColumn: Column = {
      id: `col-${Date.now()}`,
      title: newListTitle,
      cards: [],
    };
    setColumns([...columns, newColumn]);
    setNewListTitle("");
  };

  // --- Agregar nueva tarjeta ---
  const addNewCard = (columnId: string, title: string, description: string) => {
    if (!title.trim()) return;

    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? {
              ...col,
              cards: [
                ...col.cards,
                { id: Date.now(), title, description, label: "Nueva" },
              ],
            }
          : col
      )
    );
  };

  // --- Eliminar lista ---
  const deleteList = (columnId: string) => {
    setColumns(cols => cols.filter(col => col.id !== columnId));
  };

  // --- Eliminar tarjeta ---
  const deleteCard = (columnId: string, cardId: number) => {
    setColumns(cols =>
      cols.map(col =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          : col
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tablero Kanban</h1>

      {/* Crear nueva lista */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newListTitle}
          onChange={e => setNewListTitle(e.target.value)}
          placeholder="Nombre de nueva lista..."
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <button
          onClick={addNewList}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Agregar lista
        </button>
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
                onDeleteList={deleteList}
                onDeleteCard={deleteCard}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
