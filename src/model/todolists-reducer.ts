import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";



const initialState: Todolist[] = []

// export type DeleteTodolistAction = {
//     type: "delete_todolist",
//     payload: {
//         id: string
//     }
// }

export type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction
export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
// const action = {
//     type: "todos/todoAdded",
//     payload: {
//         id: '1eb42cac-f809-4c16-b6b0-f3c6169d83b0',
//     },
// }

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case "delete_todolist" : {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case "create_todolist": {
            const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: "all"}
            return [...state, newTodolist]
        }
        case "change_todolist_title": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case "change_todolist_filter": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: "delete_todolist", payload: {id}}as const
}

export const createTodolistAC = (title:string) => {
    return {type: "create_todolist", payload: {id:v1(), title}} as const
}

export const changeTodolistTitleAC = ({id, title}:{id: string, title: string}) => {
    return {type: "change_todolist_title", payload: {id, title}} as const
}

export const changeTodolistFilterAC = ({todolistId, filter}: {todolistId: string, filter: FilterValues}) => {
    return {type: "change_todolist_filter", payload: {todolistId, filter}} as const
}


