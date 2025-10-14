import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { useState } from "react";

type KanbanListProps = {
  title: string;
  cards: { id: number; title: string; description: string; label?: string }[];
  columnId: string;
  onAddCard: (columnId: string, title: string, description: string) => void;
  onDeleteList: (columnId: string) => void;
  onDeleteCard: (columnId: string, cardId: number) => void;
};

export function KanbanList({
  title,
  cards,
  columnId,
  onAddCard,
  onDeleteList,
  onDeleteCard,
}: KanbanListProps) {
  const { setNodeRef } = useDroppable({ id: columnId, data: { columnId } });
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    onAddCard(columnId, newTask, "Nueva tarea");
    setNewTask("");
  };

  return (
    <div className="flex-1 bg-gray-50 rounded-xl p-4 border shadow-sm min-w-[250px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-700">{title}</h2>
        <button
          onClick={() => onDeleteList(columnId)}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          ✕
        </button>
      </div>

      <div ref={setNodeRef} className="min-h-[80px] flex flex-col gap-3">
        {cards.map(card => (
          <KanbanCard
            key={card.id}
            {...card}
            columnId={columnId}
            onDeleteCard={onDeleteCard}
          />
        ))}
      </div>

      <div className="mt-4">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Nueva tarea..."
          className="border rounded-md px-2 py-1 text-sm w-full"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md w-full hover:bg-blue-700 text-sm"
        >
          Agregar tarea
        </button>
      </div>
    </div>
  );
}
