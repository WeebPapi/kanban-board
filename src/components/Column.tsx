"use client"
import { ColumnType } from "@/types/types"
import React from "react"
import { Card, CardAction, CardContent, CardHeader } from "./ui/card"
import TaskCard from "./TaskCard"
import AddButton from "./AddButton"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

interface ColumnProps extends ColumnType {}

const Column: React.FC<ColumnProps> = ({
  categoryName,
  cardIds,
  color,
  id,
}) => {
  const { setNodeRef } = useDroppable({ id })
  return (
    <div ref={setNodeRef} className="h-full">
      <SortableContext strategy={verticalListSortingStrategy} items={cardIds}>
        <Card className={` w-[400px] pt-0 `}>
          <CardHeader style={{ backgroundColor: color }} className="py-4">
            <h2 className="text-white text-xl font-semibold">{categoryName}</h2>
          </CardHeader>
          <CardContent className="min-h-[200px]">
            {cardIds.length === 0 ? (
              <div className="h-[80px] flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-md">
                Drop here
              </div>
            ) : (
              cardIds.map((cardId) => (
                <TaskCard color={color} key={cardId} cardId={cardId} />
              ))
            )}
          </CardContent>
          <CardAction className="w-full flex justify-center">
            <AddButton colId={id} />
          </CardAction>
        </Card>
      </SortableContext>
    </div>
  )
}

export default Column
