import {Grid, Paper} from "@mui/material";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    deleteTodolistAC,
    FilterValues
} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistItem} from "@/TodolistItem.tsx";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";

export const TodoLists = () => {
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()
    // ------------------------------❗Delete-Task ---------------------------

    // const deleteTask = (taskId: string) => {
    //     const filteredTasks = tasks.filter(task => {
    //         return task.id !== taskId
    //     })
    //     setTasks(filteredTasks)
    // }

    const deleteTask = (todolistId: string, taskId: string) => {
        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    // ------------------------------❗Delete-Todolist ---------------------------

    // const deleteTodolist = (todolistId: string) => {
    //     setTodolist(todolists.filter((todolist) => todolist.id !== todolistId))
    //      // Удаляем таски нужного тудулиста из стейта тасок:
    //     delete tasks[todolistId]
    //      // Устанавливаем в state копию объекта:
    //     setTasks({ ...tasks })
    // }
    // -------------

    const deleteTodolist = (todolistId: string) => {
        dispatch(deleteTodolistAC({id: todolistId}))
    }


    // ------------------------------❗Change-Filter ---------------------------

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }

    // -------------------------------❗Create-Task ------------------------------------------

    // const createTask = (title: string) => {
    //     const newTask = {id: v1(), title, isDone: false}
    //     const newTasks = [newTask, ...tasks]
    //     setTasks(newTasks)
    // }

    const createTask = (todolistId: string, title: string) => {
        dispatch(createTaskAC({todolistId, title}))
    }


    // -------------------------------❗Change-Task-Status -------------------------------------
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    // const changeTaskStatus = (taskId: string, isDone: boolean) => {
    //     const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
    //     setTasks(newState)
    // --------------------------
    // const task = tasks.find(t => t.id === taskId)
    // if (task) {
    //     task.isDone = isDone
    //     setTasks([...tasks])
    // }

    // -------------------------------❗Change-Task-Title -------------------------------------
    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }
    // -------------------------------❗Change-Todolist-Title -------------------------------------

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC({id: todolistId, title}))
    }

    return (
        <>
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === 'active') {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === 'completed') {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }

                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem todolist={todolist}
                                          tasks={filteredTasks}
                                          deleteTask={deleteTask}
                                          changeFilter={changeFilter}
                                          createTask={createTask}
                                          changeTaskStatus={changeTaskStatus}
                                          deleteTodolist={deleteTodolist}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}