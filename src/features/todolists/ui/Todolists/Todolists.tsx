import { Grid, Paper } from "@mui/material"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { selectTodolists, setTodolistsAC } from "@/features/todolists/model/todolists-slice.ts"
import { useEffect } from "react"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

export const TodoLists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    todolistsApi.getTodolists().then((todolists) => {
      dispatch(setTodolistsAC({todolists}))
    })
  }, [])

  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
