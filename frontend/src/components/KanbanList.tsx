import { useDroppable } from "@dnd-kit/core";
import { KanbanCard } from "./KanbanCard";
import { useState } from "react";

type KanbanListProps = {
  title: string;
  cards: { id: number; title: string; description: string; label?: string }[];
  columnId: string;
  onAddCard: (columnId: string, title: string, description: string) => void;
  onDeleteCard: (columnId: string, cardId: number) => void;
};

export function KanbanList({
  title,
  cards,
  columnId,
  onAddCard,
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
    <div className="flex-1 bg-[#F5DA91] rounded-xl p-4 border-2 border-[#a89663] shadow-md min-w-[250px]">
      <div className="mb-4">
        <h2 className="font-bold text-lg text-[#574d33]">{title}</h2>
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
          className="border-2 border-[#a89663] bg-[#EFE0B4] rounded-md px-2 py-1 text-sm w-full text-[#574D33] placeholder-[#A89663]"
        />
        <button
          onClick={handleAddTask}
          className="mt-2 text-white px-3 py-1 rounded-md w-full bg-[#a89663] hover:bg-[#7f724b] text-sm"
        >
          Agregar tarea
        </button>
      </div>
    </div>
  );
}
