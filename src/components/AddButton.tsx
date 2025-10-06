"use client"
import React from "react"
import { Button } from "./ui/button"
import { useKanbanStore } from "@/zustand/boardStore"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import AddCardForm from "./AddCardForm"

interface Props {
  colId: string
}

const AddButton: React.FC<Props> = ({ colId }) => {
  const store = useKanbanStore()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size={"icon"}
          className="text-white text-4xl rounded-xl cursor-pointer p-6"
          style={{ backgroundColor: store.columns[colId].color }}
        >
          +
        </Button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AddCardForm colId={colId} />
      </AlertDialogPortal>
    </AlertDialog>
  )
}

export default AddButton
