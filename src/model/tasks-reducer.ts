import {TasksState} from "../App.tsx";
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case "create_todolist": {
            return {...state, [action.payload.id]: []};
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
        case "create_task": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false};
            const newTasks = {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            }
            return newTasks
        }
        default:
            return state
    }
}

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction
type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>


export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string, taskId: string }) => {
    return {type: "delete_task", payload: {todolistId, taskId}} as const
}

export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => {
    return {type: "create_task", payload: {todolistId, title}} as const
}
