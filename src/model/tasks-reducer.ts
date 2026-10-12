import {TasksState} from "../app/App.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}
//
// export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
//     switch (action.type) {
//         case "create_todolist": {
//             return {...state, [action.payload.id]: []};
//         }
//         case "delete_todolist": {
//             const newState = {...state};
//             delete newState[action.payload.id];
//             return newState;
//         }
//         case "delete_task": {
//             const {todolistId, taskId} = action.payload;
//             const newState = {
//                 ...state,
//                 [todolistId]: state[todolistId].filter(ts => ts.id !== taskId)
//             };
//             return newState;
//         }
//         case "create_task": {
//             const {todolistId, title} = action.payload;
//             const newTask = {id: nanoid(), title, isDone: false};
//             const newTasks = {
//                 ...state,
//                 [todolistId]: [newTask, ...state[todolistId]]
//             }
//             return newTasks
//         }
//         case "change_task_status": {
//             const {todolistId, taskId, isDone} = action.payload;
//             return {
//                 ...state,
//                 [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone} : t),
//             }
//         }
//         case "change_task_title": {
//             const {todolistId, taskId, title} = action.payload;
//             return {
//                 ...state,
//                 [todolistId]: state[todolistId].map(t => t.id === taskId ? { ...t, title } : t),
//             }
//         }
//         default:
//             return state
//     }
// }

// type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction
// type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
// type CreateTaskAction = ReturnType<typeof createTaskAC>
// type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
// type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>


export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>("tasks/deleteTask")
// ({todolistId, taskId}: { todolistId: string, taskId: string }) => {
//     return {type: "delete_task", payload: {todolistId, taskId}} as const
// }
export const createTaskAC = createAction("tasks/createTask", ({todolistId, title}: { todolistId: string, title: string }) => {
    return {payload: {todolistId, title}}
})
// ({todolistId, title}: { todolistId: string, title: string }) => {
//     return {type: "create_task", payload: {todolistId, title}} as const
// }
export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>("tasks/changeTaskStatus")
// ({todolistId, taskId, isDone}: {
//     todolistId: string,
//     taskId: string,
//     isDone: boolean
// }) => {
//     return {type: "change_task_status", payload: {todolistId, taskId, isDone}} as const
// }
export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    title: string
}>("tasks/changeTaskTitle")
// ({todolistId, taskId, title}: {
//     todolistId: string,
//     taskId: string,
//     title: string
// }) => {
//     return {type: "change_task_title", payload: {todolistId, taskId, title}} as const
// }

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id];
        })
        .addCase(deleteTaskAC, (state, action) => {
            const index = state[action.payload.todolistId].findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                state[action.payload.todolistId].splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const { todolistId, title } = action.payload;

            state[todolistId].unshift({
                id: nanoid(),
                title,
                isDone: false,
            });
        })
})
