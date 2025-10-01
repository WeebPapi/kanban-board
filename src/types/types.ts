export interface CardType {
  id: string
  title: string
  due: string
  description?: string
  author?: string
}
export interface ColumnType {
  id: string
  categoryName: string
  color: string
  cardIds: string[]
}
export interface KanbanState {
  cards: Record<string, CardType>
  columns: Record<string, ColumnType>
  columnOrder: string[]
}

export interface KanbanActions {
  addCard: (
    columnId: string,
    title: string,
    due: string,
    description?: string
  ) => void
  updateCard: (
    cardId: string,
    newTitle?: string,
    newDue?: string,
    newDescription?: string
  ) => void
  deleteCard: (cardId: string, columnId: string) => void
  moveCardWithinColumn: (
    columnId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void
  moveCardBetweenColumns: (
    sourceColumnId: string,
    destinationColumnId: string,
    sourceIndex: number,
    destinationIndex: number
  ) => void
  setBoard: (board: KanbanState) => void
}
