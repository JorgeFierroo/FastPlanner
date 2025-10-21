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
      className={`rounded-xl border bg-white p-4 shadow-sm transition cursor-grab ${
        isDragging ? "opacity-50 border-dashed" : "hover:shadow-md"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold text-gray-800">{title}</div>
        <button
          onClick={() => onDeleteCard(columnId, id)}
          className="text-purple-400 hover:text-purple-800 text-sm"
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      {label && (
        <span className="inline-block mt-3 text-xs font-medium px-2 py-1 rounded bg-gray-200 text-gray-700">
          {label}
        </span>
      )}
    </div>
  );
}
