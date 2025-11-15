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
      {...attributes}
      {...listeners}
      style={style}
      className={`rounded-xl border border-[#a89663] bg-[#d1ba7b] p-4 shadow-md transition cursor-grab ${
        isDragging ? "opacity-50 border-dashed" : "hover:shadow-lg hover:border-[#7f724b]"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold text-[#574d33]">{title}</div>
        <button
          onClick={() => onDeleteCard(columnId, id)}
          className="text-[#7f724b] hover:text-[#574D33] text-sm font-bold"
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-[#6b603f] mt-1">{description}</p>
      {label && (
        <span className="inline-block mt-3 text-xs font-medium px-2 py-1 rounded bg-[#a89663] text-white border border-[#7f724b]">
          {label}
        </span>
      )}
    </div>
  );
}
