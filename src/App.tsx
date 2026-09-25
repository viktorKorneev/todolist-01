import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useReducer, useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {containerSx} from './TodolistItem.styles'
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

type ThemeMode = 'dark' | 'light'

// ------------------------- Тип задачи
export type Task = {
    id: string
    title: string
    isDone: boolean
}
// ------------------------- Тип тудулиста
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
// ------------------------- Тип для state
export type TasksState = Record<string, Task[]>
//❗ Record<string, Task[]> — объект-словарь, где ключ — строковый id тудулиста,
// а значение — массив его задач (Task[])
// ----------------

// export type TasksState = {
//     [key: string]: Task[]
// }

// ------------------------- Тип фильтра
export type FilterValues = "all" | "active" | "completed"


export const App = () => {

    // ---------------------- Список тудулистов
    // Храним массив тудулистов, каждый со своим id, названием и фильтром
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    // ---------------------- Текущий фильтр
    // Значения фильтра каждого тудулиста теперь хранятся в самих объектах, поэтому нужно удалить state для значения фильтра:
    // const [filter, setFilter] = useState<FilterValues>("all")
    //-------------------------------------------------------------

    // ---------------------- Список задач
    // tasks — объект, где ключ = id тудулиста, значение = массив его задач
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    // ------------------------------❗Delete-Task ---------------------------

    // const deleteTask = (taskId: string) => {
    //     const filteredTasks = tasks.filter(task => {
    //         return task.id !== taskId
    //     })
    //     setTasks(filteredTasks)
    // }

    const deleteTask = (todolistId: string, taskId: string) => {
        const action = deleteTaskAC({todolistId, taskId})
        dispatchToTasks(action)
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
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }


    // ------------------------------❗Change-Filter ---------------------------

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        const action = changeTodolistFilterAC({todolistId, filter})
        dispatchToTodolists(action)
    }

    // -------------------------------❗Create-TodoList ------------------------------------------
    const createTodolist = (title: string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }


    // -------------------------------❗Create-Task ------------------------------------------

    // const createTask = (title: string) => {
    //     const newTask = {id: v1(), title, isDone: false}
    //     const newTasks = [newTask, ...tasks]
    //     setTasks(newTasks)
    // }

    const createTask = (todolistId: string, title: string) => {
        const action = createTaskAC({todolistId, title})
        dispatchToTasks(action)
    }


    // -------------------------------❗Change-Task-Status -------------------------------------
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const action = changeTaskStatusAC({todolistId, taskId, isDone})
        dispatchToTasks(action)
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
        const action = changeTaskTitleAC({todolistId, taskId, title})
        dispatchToTasks(action)
    }
    // -------------------------------❗Change-Todolist-Title -------------------------------------

    const changeTodolistTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC({id: todolistId, title}))
    }


    return (
        <ThemeProvider theme={theme}>
            <div className={'app'}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar>
                        <Container maxWidth={'lg'} sx={containerSx}>
                                <IconButton color="inherit">
                                    <MenuIcon/>
                                </IconButton>
                                <Button color={"inherit"}>Sign in</Button>
                            <div>
                                <NavButton color="inherit">Sign in</NavButton>
                                <NavButton color="inherit">Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark} color="inherit">Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
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
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    )
}


