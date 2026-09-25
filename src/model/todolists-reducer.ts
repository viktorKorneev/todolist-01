import {Todolist} from "../App.tsx";


const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case "delete_todolist" : {
            return state
        }
        default:
            return state
    }
}

const action = {
    type: "todos/todoAdded",
    payload: {
        id: '1eb42cac-f809-4c16-b6b0-f3c6169d83b0',
    },
}

type Actions = {
    type: string,
    payload: any
}