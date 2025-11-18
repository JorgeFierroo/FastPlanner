import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type KanbanCardProps = {
  id: number;
  title: string;
  description: string;
  label?: string;
  columnId: string;
  onDeleteCard: (columnId: string, cardId: number) => void;
};

export function KanbanCard({
  id,
  title,
  description,
  label,
  columnId,
  onDeleteCard,
}: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-xl border-2 p-4 shadow-md transition-all duration-200 ${
        isDragging 
          ? "opacity-40 scale-105 border-dashed border-blue-400 bg-blue-50 cursor-grabbing shadow-2xl z-50" 
          : "border-[#a89663] bg-[#d1ba7b] cursor-grab hover:shadow-xl hover:border-[#7f724b] hover:scale-102 active:cursor-grabbing"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className={`font-semibold ${isDragging ? "text-blue-600" : "text-[#574d33]"}`}>
          {title}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteCard(columnId, id);
          }}
          className="text-[#7f724b] hover:text-[#574D33] text-sm font-bold transition-colors"
        >
          ✕
        </button>
      </div>
      <p className={`text-sm mt-1 ${isDragging ? "text-blue-500" : "text-[#6b603f]"}`}>
        {description}
      </p>
      {label && (
        <span className="inline-block mt-3 text-xs font-medium px-2 py-1 rounded bg-[#a89663] text-white border border-[#7f724b]">
          {label}
        </span>
      )}
    </div>
  );
}
