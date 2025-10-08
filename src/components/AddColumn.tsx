import React, { useState } from "react"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import AddColumnForm from "./AddColumnForm"

const AddColumn = () => {
  const [open, setOpen] = useState(false)
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          className="text-white text-4xl rounded-xl cursor-pointer p-6 bg-blue-500 absolute left-[100%]"
        >
          +
        </Button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle>Add New Column</AlertDialogTitle>
          <AddColumnForm onClose={() => setOpen(false)} />
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}

export default AddColumn
