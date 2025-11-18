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
      className={`rounded-xl border-2 p-4 shadow-md transition-all duration-200 ${
        isDragging 
          ? "opacity-40 scale-105 border-dashed border-blue-400 bg-blue-50 shadow-2xl z-50" 
          : "border-[#a89663] bg-[#d1ba7b] hover:shadow-xl hover:border-[#7f724b]"
      }`}
    >
      <div className="flex justify-between items-center gap-2">
        <div 
          {...attributes}
          {...listeners}
          className={`font-semibold flex-1 cursor-grab active:cursor-grabbing ${isDragging ? "text-blue-600" : "text-[#574d33]"}`}
        >
          {title}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteCard(columnId, id);
          }}
          className="text-[#7f724b] hover:text-[#574D33] text-sm font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>
      <p 
        {...attributes}
        {...listeners}
        className={`text-sm mt-1 cursor-grab active:cursor-grabbing ${isDragging ? "text-blue-500" : "text-[#6b603f]"}`}
      >
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
