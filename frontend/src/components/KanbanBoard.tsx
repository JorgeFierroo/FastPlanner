import { useState } from "react"
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable"
import { KanbanList } from "./KanbanList"

type Task = {
  id: number
  title: string
  description: string
  label?: string
}

type Column = {
  id: string
  title: string
  cards: Task[]
}

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
]

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialData)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    if (active.id === over.id) return

    setColumns(cols => {
      const newCols = cols.map(col => ({ ...col, cards: [...col.cards] }))

      let movingCard: Task | null = null
      let sourceColId = ""

      // Encontrar la tarjeta a mover y la columna origen
      newCols.forEach(col => {
        const index = col.cards.findIndex(card => card.id === active.id)
        if (index > -1) {
          movingCard = col.cards.splice(index, 1)[0]
          sourceColId = col.id
        }
      })

      if (!movingCard) return newCols

      // Columna destino
      const targetColId = over.data.current?.columnId || sourceColId
      const targetCol = newCols.find(c => c.id === targetColId)
      if (targetCol) targetCol.cards.push(movingCard)

      return newCols
    })
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6 min-h-screen bg-gray-100">
        {columns.map(col => (
          <SortableContext
            key={col.id}
            items={col.cards.map(c => c.id)}
            strategy={rectSortingStrategy}
          >
            <KanbanList title={col.title} cards={col.cards} columnId={col.id} />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  )
}
