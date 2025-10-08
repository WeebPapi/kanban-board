import { CardType, ColumnType, KanbanActions, KanbanState } from "@/types/types"
import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

const initialCards: Record<string, CardType> = {
  "card-1": {
    id: "card-1",
    title: "Design Landing Page",
    due: "Oct 15th",
    author: "Alex",
  },
  "card-2": {
    id: "card-2",
    title: "Implement User Authentication",
    due: "Oct 20th",
    description: "Use OAuth 2.0 for Google and GitHub.",
  },
  "card-3": { id: "card-3", title: "Setup CI/CD Pipeline", due: "Oct 18th" },
  "card-4": {
    id: "card-4",
    title: "Write API Documentation",
    due: "Nov 1st",
    description: "Use Swagger/OpenAPI specification.",
  },
  "card-5": {
    id: "card-5",
    title: "Final QA Testing",
    due: "Oct 28th",
    author: "Casey",
  },
}

const initialColumns: Record<string, ColumnType> = {
  "col-1": {
    id: "col-1",
    categoryName: "Backlog",
    color: "#D838A8",
    cardIds: ["card-1", "card-4"],
  },
  "col-2": {
    id: "col-2",
    categoryName: "In Progress",
    color: "#3498DB",
    cardIds: ["card-2", "card-3"],
  },
  "col-3": {
    id: "col-3",
    categoryName: "Done",
    color: "#2ECC71",
    cardIds: ["card-5"],
  },
}

const initialColumnOrder: string[] = ["col-1", "col-2", "col-3"]

export const useKanbanStore = create<KanbanState & KanbanActions>((set) => ({
  addColumn: (categoryName: string, color: string) => {
    const newColId = `col-${uuidv4()}`
    const newColumn: ColumnType = {
      id: newColId,
      categoryName,
      color,
      cardIds: [],
    }
    set((state) => ({
      columns: {
        ...state.columns,
        [newColId]: newColumn,
      },
      columnOrder: [...state.columnOrder, newColId],
    }))
  },
  cards: initialCards,
  columns: initialColumns,
  columnOrder: initialColumnOrder,

  setBoard: (board) => set(board),

  addCard: (columnId, title, due, description) => {
    const newCardId = `card-${uuidv4()}`
    const newCard: CardType = { id: newCardId, title, due, description }

    set((state) => ({
      // updates the cards record to contain the new card with the id as the key
      cards: {
        ...state.cards,
        [newCardId]: newCard,
      },
      // updates the column which the new card is supposed to go into by adding  the new card into the cardIds array
      columns: {
        ...state.columns,
        [columnId]: {
          ...state.columns[columnId],
          cardIds: [...state.columns[columnId].cardIds, newCardId],
        },
      },
    }))
  },

  updateCard: (cardId, newTitle, newDue, newDescription, newAuthor) => {
    set((state) => {
      // saves copy of the card which is being updated, indicated by id
      const cardToUpdate = state.cards[cardId]
      if (!cardToUpdate) return state

      return {
        cards: {
          ...state.cards,
          [cardId]: {
            // Populates the card which is being updated with the data it already contains and then replaces anything that the user has provided as input
            ...cardToUpdate,
            title: newTitle ?? cardToUpdate.title,
            due: newDue ?? cardToUpdate.due,
            description: newDescription ?? cardToUpdate.description,
            author: newAuthor ?? cardToUpdate.author,
          },
        },
      }
    })
  },

  deleteCard: (cardId, columnId) => {
    set((state) => {
      // Removes the card from the cards object
      const newCards = { ...state.cards }
      delete newCards[cardId]

      // Removes the card id from the column which contained it
      const newColumn = { ...state.columns[columnId] }
      newColumn.cardIds = newColumn.cardIds.filter((id) => id !== cardId)

      return {
        cards: newCards,
        columns: {
          ...state.columns,
          [columnId]: newColumn,
        },
      }
    })
  },

  moveCardWithinColumn: (columnId, sourceIndex, destinationIndex) => {
    set((state) => {
      const column = state.columns[columnId]
      const newCardIds = Array.from(column.cardIds)
      const [movedCard] = newCardIds.splice(sourceIndex, 1)
      newCardIds.splice(destinationIndex, 0, movedCard)

      return {
        columns: {
          ...state.columns,
          [columnId]: {
            ...column,
            cardIds: newCardIds,
          },
        },
      }
    })
  },

  moveCardBetweenColumns: (
    sourceColumnId,
    destinationColumnId,
    sourceIndex,
    destinationIndex
  ) => {
    set((state) => {
      // Return early if columns are the same; moveCardWithinColumn should be used instead
      if (sourceColumnId === destinationColumnId) return state

      const sourceColumn = state.columns[sourceColumnId]
      const destColumn = state.columns[destinationColumnId]

      const sourceCardIds = Array.from(sourceColumn.cardIds)
      const destCardIds = Array.from(destColumn.cardIds)

      const [movedCard] = sourceCardIds.splice(sourceIndex, 1)
      destCardIds.splice(destinationIndex, 0, movedCard)

      return {
        columns: {
          ...state.columns,
          [sourceColumnId]: {
            ...sourceColumn,
            cardIds: sourceCardIds,
          },
          [destinationColumnId]: {
            ...destColumn,
            cardIds: destCardIds,
          },
        },
      }
    })
  },
}))
