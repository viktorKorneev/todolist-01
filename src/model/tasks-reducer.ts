import {TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case "create_todolist": {
            return { ...state, [action.payload.id]: [] };
        }
        case "delete_todolist": {
            const newState = {...state};
            delete newState[action.payload.id];
            return newState;
        }
        case "delete_task": {
            const newState = {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(ts => ts.id !== action.payload.taskId)
            };
            return newState;
        }
        default:
            return state
    }
}

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction
type DeleteTaskAction = ReturnType<typeof deleteTaskAC>


export const deleteTaskAC = ({todolistId, taskId}:{todolistId: string, taskId: string}) => {
    return {type: "delete_task", payload: {todolistId, taskId}} as const
}
