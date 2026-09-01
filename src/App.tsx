import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

// ---------------------- Тип задачи
export type Task = {
    id: string
    title: string
    isDone: boolean
}
// -------------------- Тип тудулиста
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
// ------------------------- Тип фильтра
export type FilterValues = "all" | "active" | "completed"


export const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    // ---------------------- Список тудулистов
    const [todolists, setTodolist] = useState<Todolist[]>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    // ---------------------- Текущий фильтр
    // Значения фильтра каждого тудулиста теперь хранятся в самих объектах, поэтому нужно удалить state для значения фильтра:
    // const [filter, setFilter] = useState<FilterValues>("all")
    //-------------------------------------------------------------

    // ---------------------- Список задач
    const [tasks, setTasks] = useState({
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "Typescript", isDone: false},
                {id: v1(), title: "RTK query", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "Typescript", isDone: false},
                {id: v1(), title: "RTK query", isDone: false},
            ]
        }
    )

    // ------------------------------❗Delete-Task ---------------------------

    // const deleteTask = (taskId: string) => {
    //     const filteredTasks = tasks.filter(task => {
    //         return task.id !== taskId
    //     })
    //     setTasks(filteredTasks)
    // }

    const deleteTask = (todolistId: string, taskId: string) => {
        const newTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].filter(task => task.id !== taskId),
        }
        setTasks(newTasks)
    }

    // ------------------------------❗Change-Filter ---------------------------

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        setTodolist(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
    }


    // -------------------------------❗Create-Task ------------------------------------------

    // const createTask = (title: string) => {
    //     const newTask = {id: v1(), title, isDone: false}
    //     const newTasks = [newTask, ...tasks]
    //     setTasks(newTasks)
    // }

    const createTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTasks)
    }


    // -------------------------------❗Change-Task-Status -------------------------------------
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        const newTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, isDone } : task),
        }
        setTasks(newTasks)
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


    return (
        <div className="app">
            {/* ----------------------❗ Рендерим каждый тудулист */}
            {todolists.map(todolist => {
                const todolistTasks = tasks[todolist.id]
                let filteredTasks = todolistTasks
                if (todolist.filter === "active") {
                    filteredTasks = todolistTasks.filter(task => !task.isDone)
                }
                if (todolist.filter === "completed") {
                    filteredTasks = todolistTasks.filter(task => task.isDone)
                }
                return (
                    <TodolistItem key={todolist.id}
                                  todolist={todolist}
                                  tasks={filteredTasks}
                                  date="27.01.2027"
                                  deleteTask={deleteTask}
                                  changeFilter={changeFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}/>
                )
            })}
        </div>
    )
}


