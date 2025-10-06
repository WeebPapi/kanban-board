"use client"
import { useKanbanStore } from "@/zustand/boardStore"
import React from "react"
import Column from "./Column"

const Board = () => {
  const store = useKanbanStore()
  const { columnOrder, cards, columns } = store
  return (
    <div className="w-full flex justify-between ">
      {columnOrder.map((colId) => (
        <Column
          key={colId}
          id={colId}
          cardIds={columns[colId].cardIds}
          categoryName={columns[colId].categoryName}
          color={columns[colId].color}
        />
      ))}
    </div>
  )
}

export default Board
