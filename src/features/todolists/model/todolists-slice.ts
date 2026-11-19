import { createSlice, nanoid } from "@reduxjs/toolkit"
// import type { ThemeMode } from "@/app/app-slice.ts"

// ------------------------- Тип тудулиста
export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

// ------------------------- Тип фильтра
export type FilterValues = "all" | "active" | "completed"

// export type DeleteTodolistAction = {
//     type: "delete_todolist",
//     payload: {
//         id: string
//     }
// }

// export type Actions = DeleteTodolistAction | CreateTodolistAction
// export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
// export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
// export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
// export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
// const action = {
//     type: "todos/todoAdded",
//     payload: {
//         id: '1eb42cac-f809-4c16-b6b0-f3c6169d83b0',
//     },
// }

// export const todolistsSlice = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
//     switch (action.type) {
//         case 'todolists/deleteTodolist' : {
//             return state.filter(todolist => todolist.id !== action.payload.id)
//         }
//         case 'todolists/createTodolist': {
//             const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: "all"}
//             return [...state, newTodolist]
//         }
//         case 'todolists/changeTodolistTitle': {
//             return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
//         }
//         case 'todolists/changeTodolistFilter': {
//             return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
//         }
//         default:
//             return state
//     }
// }

// export const deleteTodolistAC = createAction<{ id: string }>("todolists/deleteTodolist")
// export const createTodolistAC = createAction("todolists/createTodolist", (title: string) => {
//   return { payload: { title, id: nanoid() } }
// })
// export const changeTodolistTitleAC = createAction<{ id: string; title: string }>("todolists/changeTodolistTitle")
// export const changeTodolistFilterAC = createAction<{ todolistId: string; filter: FilterValues }>(
//   "todolists/changeTodolistFilter",
// )

// const initialState: Todolist[] = []

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as Todolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistFilterAC: create.reducer<{ todolistId: string; filter: FilterValues }>((state, action) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    }),
    createTodolistAC: create.preparedReducer(
      (title: string) => ({ payload: { title, id: nanoid() } }),
      (state, action) => {
        state.push({ ...action.payload, filter: "all" })
      },
    ),
  }),
})

export const { selectTodolists } = todolistsSlice.selectors
export const { deleteTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, createTodolistAC } =
  todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

// export const todolistsSlice2 = createReducer(initialState, (builder) => {
//   builder
//     .addCase(deleteTodolistAC, (state, action) => {
//       const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//       if (index !== -1) {
//         state.splice(index, 1)
//       }
//     })
//     .addCase(createTodolistAC, (state, action) => {
//       state.push({ ...action.payload, filter: "all" })
//     })
//     .addCase(changeTodolistTitleAC, (state, action) => {
//       const index = state.findIndex((todolist) => todolist.id === action.payload.id)
//       if (index !== -1) {
//         state[index].title = action.payload.title
//       }
//     })
//     .addCase(changeTodolistFilterAC, (state, action) => {
//       const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
//       if (todolist) {
//         todolist.filter = action.payload.filter
//       }
//     })
// })
