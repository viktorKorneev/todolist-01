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
            const {todolistId, taskId} = action.payload;
            const newState = {
                ...state,
                [todolistId]: state[todolistId].filter(ts => ts.id !== taskId)
            };
            return newState;
        }
        case "create_task": {
            const {todolistId, title} = action.payload;
            const newTask = {id: v1(), title, isDone: false};
            const newTasks = {
                ...state,
                [todolistId]: [newTask, ...state[todolistId]]
            }
            return newTasks
        }
        case "change_task_status": {
            const {todolistId, taskId, isDone} = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone} : t),
            }
        }
        case "change_task_title": {
            const {todolistId, taskId, title} = action.payload;
            return {
                ...state,
                [todolistId]: state[todolistId].map(t => t.id === taskId ? { ...t, title } : t),
            }
        }
        default:
            return state
    }
}

type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction
type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>


export const deleteTaskAC = ({todolistId, taskId}: { todolistId: string, taskId: string }) => {
    return {type: "delete_task", payload: {todolistId, taskId}} as const
}

export const createTaskAC = ({todolistId, title}: { todolistId: string, title: string }) => {
    return {type: "create_task", payload: {todolistId, title}} as const
}

export const changeTaskStatusAC = ({todolistId, taskId, isDone}: {
    todolistId: string,
    taskId: string,
    isDone: boolean
}) => {
    return {type: "change_task_status", payload: {todolistId, taskId, isDone}} as const
}

export const changeTaskTitleAC = ({todolistId, taskId, title}: {
    todolistId: string,
    taskId: string,
    title: string
}) => {
    return {type: "change_task_title", payload: {todolistId, taskId, title}} as const
}
