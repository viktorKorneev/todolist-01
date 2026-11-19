import { useAppDispatch } from "@/common/hooks"
import {
  changeTodolistTitleTC,
  deleteTodolistAC,
  type DomainTodolist,
} from "@/features/todolists/model/todolists-slice.ts"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title } = todolist

  const dispatch = useAppDispatch()

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({ id }))
  }

  const changeTodolistTitleHandler = (title: string) => {
    dispatch(changeTodolistTitleTC({ id, title }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      </h3>
      <IconButton onClick={deleteTodolistHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
