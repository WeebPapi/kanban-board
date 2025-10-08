"use client"
import { useKanbanStore } from "@/zustand/boardStore"
import React, { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Pencil, Trash2, GripVertical } from "lucide-react"
import EditCardDialog from "./EditCardDialog"

interface TaskCardProps {
  cardId: string
  color: string
}

const TaskCard: React.FC<TaskCardProps> = ({ cardId, color }) => {
  const store = useKanbanStore()
  const card = store.cards[cardId]
  const [showEdit, setShowEdit] = useState(false)

  // Find columnId for delete
  const columnId = React.useMemo(() => {
    return Object.values(store.columns).find((col) =>
      col.cardIds.includes(cardId)
    )?.id
  }, [store.columns, cardId])

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: cardId })
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className="h-[120px] mb-6 bg-gray-50 flex flex-col justify-between relative"
      style={{ ...style, borderBottom: `2px solid ${color}` }}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {/* Drag handle */}
          <button
            type="button"
            className="p-1 cursor-grab hover:bg-gray-200 rounded"
            {...listeners}
            aria-label="Drag"
            tabIndex={0}
          >
            <GripVertical size={18} color="#bbb" />
          </button>
          <h3 style={{ color }} className="font-[600] p-2">
            {card.title}
          </h3>
        </div>
        <div className="flex flex-col gap-2 pr-2 items-end">
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              setShowEdit(true)
            }}
            aria-label="Edit"
          >
            <Pencil size={18} color="#888" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-gray-200 rounded"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              if (columnId) store.deleteCard(cardId, columnId)
            }}
            aria-label="Delete"
          >
            <Trash2 size={18} color="#888" />
          </button>
        </div>
      </div>
      <p className="px-2 text-sm" style={{ color }}>
        {card.description ?? ""}
      </p>
      <div className="p-2 flex justify-between">
        <p>Due {card.due}</p>
        <p>{card.author}</p>
      </div>
      <EditCardDialog
        open={showEdit}
        onOpenChange={setShowEdit}
        cardId={cardId}
      />
    </div>
  )
}

export default TaskCard
