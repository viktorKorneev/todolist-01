import {FilterValues, Todolist} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";



const initialState: Todolist[] = []

// export type DeleteTodolistAction = {
//     type: "delete_todolist",
//     payload: {
//         id: string
//     }
// }

export type Actions = DeleteTodolistAction | CreateTodolistAction
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
// export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
// export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
// const action = {
//     type: "todos/todoAdded",
//     payload: {
//         id: '1eb42cac-f809-4c16-b6b0-f3c6169d83b0',
//     },
// }

// export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
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

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})

export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{todolistId: string, filter: FilterValues}>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({ ...action.payload, filter: "all" })
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state[index].title = action.payload.title
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })
})


