import { KanbanCard } from "./KanbanCard"

type KanbanListProps = {
  title: string
  cards: { id: number; title: string; description: string; label?: string }[]
  columnId: string
}

export function KanbanList({ title, cards, columnId }: KanbanListProps) {
  return (
    <div className="flex-1 bg-gray-50 rounded-xl p-4 border shadow-sm">
      <h2 className="font-bold text-lg mb-4">{title}</h2>
      <div className="space-y-3">
        {cards.map(card => (
          <KanbanCard key={card.id} {...card} columnId={columnId} />
        ))}
      </div>
    </div>
  )
}
