import {Todolist} from "../App.tsx";


const initialState: Todolist[] = []

// export type DeleteTodolistAction = {
//     type: "delete_todolist",
//     payload: {
//         id: string
//     }
// }

export type Actions = DeleteTodolistAction

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
        default:
            return state
    }
}

export const deleteTodolistAC = (id: string) => {
    return {type: "delete_todolist", payload: {id}}as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>


