import { CardType, ColumnType, KanbanActions, KanbanState } from "@/types/types"
import { create } from "zustand"

const initialCards: Record<string, CardType> = {
  "task-1": {
    id: "task-1",
    title: "Setup project repository",
    description: "Initialize git, create main branch, add README.",
    due: "Oct. 5th",
  },
  "task-2": {
    id: "task-2",
    title: "Design the database schema",
    description: "Define tables for users, tasks, and columns.",
    due: "Oct. 5th",
  },
  "task-3": {
    id: "task-3",
    title: "Develop the authentication API",
    description: "Implement user login and registration endpoints.",
    due: "Oct. 5th",
  },
  "task-4": {
    id: "task-4",
    title: "Create UI mockups",
    description: "Use Figma to design the main board view.",
    due: "Oct. 5th",
  },
  "task-5": {
    id: "task-5",
    title: "Deploy to staging server",
    description: "Setup CI/CD pipeline.",
    due: "Oct. 5th",
  },
}
const initialColumns: Record<string, ColumnType> = {
  "column-1": {
    id: "column-1",
    categoryName: "To Do",
    cardIds: ["task-1", "task-2", "task-4"],
    color: "green",
  },
  "column-2": {
    id: "column-2",
    categoryName: "In Progress",
    cardIds: ["task-3"],
    color: "blue",
  },
  "column-3": {
    id: "column-3",
    categoryName: "Done",
    cardIds: ["task-5"],
    color: "red",
  },
}

const initialColumnOrder: string[] = ["column-1", "column-2", "column-3"]

const useBoard = create<KanbanState & KanbanActions>((set, get) => ({
  cards: initialCards,
  columns: initialColumns,
  columnOrder: initialColumnOrder,
  addCard: (columnId, title, due, description) => {},
  updateCard: (cardId, newTitle, newDue, newDescription) => {},
  deleteCard: (cardId, columnId) => {},
  moveCardBetweenColumns: (
    sourceColumnId,
    destinationColumnId,
    sourceIndex,
    destinationIndex
  ) => {},
  moveCardWithinColumn: (columnId, sourceIndex, destinationIndex) => {},
  setBoard: (board) => {},
}))
