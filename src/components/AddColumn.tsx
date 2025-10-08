import React, { useState } from "react"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
} from "./ui/alert-dialog"
import AddColumnForm from "./AddColumnForm"
import { X } from "lucide-react"

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
          <div className="flex justify-between items-center">
            <AlertDialogTitle>Add New Column</AlertDialogTitle>
            <AlertDialogCancel className="border-none">
              <X />
            </AlertDialogCancel>
          </div>
          <AddColumnForm onClose={() => setOpen(false)} />
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}

export default AddColumn
