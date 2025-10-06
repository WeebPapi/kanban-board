"use client"
import { useKanbanStore } from "@/zustand/boardStore"
import React from "react"

interface TaskCardProps {
  cardId: string
  color: string
}

const TaskCard: React.FC<TaskCardProps> = ({ cardId, color }) => {
  const store = useKanbanStore()
  const card = store.cards[cardId]
  return (
    <div
      className=" h-[100px] mb-6 bg-gray-50 flex flex-col justify-between"
      style={{ borderBottom: `2px solid ${color}` }}
    >
      <h3 style={{ color }} className="font-[600] p-2">
        {card.title}
      </h3>
      <p className="px-2 text-sm" style={{ color }}>
        {card.description ?? ""}
      </p>
      <div className="p-2 flex justify-between">
        <p>Due {card.due}</p>
        <p>{card.author}</p>
      </div>
    </div>
  )
}

export default TaskCard
