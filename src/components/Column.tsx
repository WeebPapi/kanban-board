import { ColumnType } from "@/types/types"
import React from "react"
import { Card, CardAction, CardContent, CardHeader } from "./ui/card"
import TaskCard from "./TaskCard"
import AddButton from "./AddButton"

interface ColumnProps extends ColumnType {}

const Column: React.FC<ColumnProps> = ({
  categoryName,
  cardIds,
  color,
  id,
}) => {
  return (
    <Card className={` w-[400px] pt-0`}>
      <CardHeader style={{ backgroundColor: color }} className="py-4">
        <h2 className="text-white text-xl font-semibold">{categoryName}</h2>
      </CardHeader>
      <CardContent>
        {cardIds.map((cardId) => (
          <TaskCard color={color} key={cardId} cardId={cardId} />
        ))}
      </CardContent>
      <CardAction className="w-full flex justify-center">
        <AddButton colId={id} />
      </CardAction>
    </Card>
  )
}

export default Column
