"use client"
import { useKanbanStore } from "@/zustand/boardStore"
import React from "react"
import Column from "./Column"
import TaskCard from "./TaskCard"
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core"
import { rectIntersection, pointerWithin } from "@dnd-kit/core"
import AddColumn from "./AddColumn"

const Board = () => {
  const store = useKanbanStore()
  const { columnOrder, columns, cards } = store
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    if (!over) return

    let sourceColId: string | undefined
    let destColId: string | undefined
    let sourceIndex: number | undefined
    let destIndex: number | undefined

    for (const colId of columnOrder) {
      const col = columns[colId]
      const idx = col.cardIds.indexOf(active.id as string)
      if (idx !== -1) {
        sourceColId = colId
        sourceIndex = idx
      }
      // If over.id is a card, get its index
      const destIdx = col.cardIds.indexOf(over.id as string)
      if (destIdx !== -1) {
        destColId = colId
        destIndex = destIdx
      }
      // If over.id is a column, set destColId and destIndex = 0 (empty or top)
      if (over.id === colId) {
        destColId = colId
        destIndex = 0
      }
    }

    if (
      sourceColId &&
      destColId &&
      typeof sourceIndex === "number" &&
      typeof destIndex === "number"
    ) {
      if (sourceColId === destColId) {
        store.moveCardWithinColumn(sourceColId, sourceIndex, destIndex)
      } else {
        store.moveCardBetweenColumns(
          sourceColId,
          destColId,
          sourceIndex,
          destIndex
        )
      }
    }
  }

  // Custom collision detection: prioritize pointerWithin (cards), fallback to rectIntersection (columns/empty)
  const customCollisionDetection = (args: any) => {
    const pointerIntersections = pointerWithin(args)
    if (pointerIntersections.length > 0) {
      return pointerIntersections
    }
    return rectIntersection(args)
  }

  return (
    <DndContext
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="w-[90%] grid grid-cols-3 gap-1 min-h-[442px] relative">
        {columnOrder.map((colId) => (
          <Column
            key={colId}
            id={colId}
            cardIds={columns[colId].cardIds}
            categoryName={columns[colId].categoryName}
            color={columns[colId].color}
          />
        ))}
        <AddColumn />
      </div>
      <DragOverlay>
        {activeId ? (
          <TaskCard
            cardId={activeId}
            color={(() => {
              for (const colId of columnOrder) {
                if (columns[colId].cardIds.includes(activeId)) {
                  return columns[colId].color
                }
              }
              return "#ccc"
            })()}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Board
