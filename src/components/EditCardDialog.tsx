"use client"
import React, { useState, useEffect } from "react"
import { useKanbanStore } from "@/zustand/boardStore"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "./ui/alert-dialog"

interface EditCardDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cardId: string
}

const EditCardDialog: React.FC<EditCardDialogProps> = ({
  open,
  onOpenChange,
  cardId,
}) => {
  const store = useKanbanStore()
  const card = store.cards[cardId]
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [due, setDue] = useState("")
  const [author, setAuthor] = useState("")

  useEffect(() => {
    if (card) {
      setTitle(card.title ?? "")
      setDescription(card.description ?? "")
      setDue(card.due ?? "")
      setAuthor(card.author ?? "")
    }
  }, [card])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    store.updateCard(cardId, title, due, description, author)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle>Edit Task</AlertDialogTitle>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
            <label className="font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-2 py-1"
              required
            />
            <label className="font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-2 py-1"
              rows={2}
            />
            <label className="font-semibold">Due Date</label>
            <input
              type="text"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <label className="font-semibold">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border rounded px-2 py-1"
            />
            <Button type="submit" variant="default">
              Save
            </Button>
          </form>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}

export default EditCardDialog
