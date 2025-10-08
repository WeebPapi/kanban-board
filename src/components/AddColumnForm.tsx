"use client"
import React, { useState } from "react"
import { useKanbanStore } from "@/zustand/boardStore"
import { Button } from "./ui/button"

const COLORS = [
  "#D838A8",
  "#3498DB",
  "#2ECC71",
  "#F39C12",
  "#E74C3C",
  "#9B59B6",
  "#34495E",
]

interface Props {
  onClose: () => void
}

const AddColumnForm: React.FC<Props> = ({ onClose }) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState(COLORS[0])
  const store = useKanbanStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    store.addColumn(name, color)
    setName("")
    setColor(COLORS[0])
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <label className="font-semibold">Column Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-2 py-1"
        placeholder="Enter column name"
        required
      />
      <label className="font-semibold">Color</label>
      <div className="flex gap-2 flex-wrap">
        {COLORS.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setColor(c)}
            style={{
              background: c,
              border: color === c ? "2px solid #333" : "2px solid #fff",
            }}
            className="w-8 h-8 rounded-full focus:outline-none"
          />
        ))}
      </div>
      <Button type="submit" style={{ background: color, color: "#fff" }}>
        Add Column
      </Button>
    </form>
  )
}

export default AddColumnForm
