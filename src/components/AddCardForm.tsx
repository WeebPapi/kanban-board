"use client"
import React from "react"
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import RequiredAsterisk from "./RequiredAsterisk"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useKanbanStore } from "@/zustand/boardStore"
import moment from "moment"

interface Props {
  colId: string
}

const AddCardForm: React.FC<Props> = ({ colId }) => {
  const formSchema = z.object({
    title: z.string().min(1, {
      message: "Title can't be empty",
    }),
    due: z.string().nonoptional(),
    author: z.string().optional(),
    description: z.string().nonoptional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      due: new Date().toISOString(),
    },
  })
  const store = useKanbanStore()

  function onSubmit(values: z.infer<typeof formSchema>) {
    store.addCard(
      colId,
      values.title,
      moment(values.due).format("MMM Do"),
      values.description
    )
  }

  return (
    <AlertDialogContent className="bg-green-200">
      <AlertDialogHeader>
        <AlertDialogTitle>Task Details</AlertDialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title {<RequiredAsterisk />}</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="due"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title {<RequiredAsterisk />}</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Due" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <div>
              <AlertDialogCancel className="border-green-800 text-green-800 mr-4 bg-gray-100">
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                className="border-green-800 text-green-800 bg-gray-100"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogHeader>
    </AlertDialogContent>
  )
}

export default AddCardForm
