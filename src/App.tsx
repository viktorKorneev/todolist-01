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
    // ---------------------- Список тудулистов
    const [todolists, setTodolist] = useState<Todolist[]>([
        {id: v1(), title: "What to learn", filter: "all"},
        {id: v1(), title: "What to buy", filter: "all"}
    ])

    // ---------------------- Текущий фильтр
    const [filter, setFilter] = useState<FilterValues>("all")

    // ---------------------- Список задач
    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Typescript", isDone: false},
        {id: v1(), title: "RTK query", isDone: false},
    ])

    // ------------------------------❗Delete-Task ---------------------------

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    // ------------------------------❗Change-Filter ---------------------------

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === "active") {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(task => task.isDone)
    }

    // -------------------------------❗Create-Task ------------------------------------------

    const createTask = (title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }


    // -------------------------------❗Change-Task-Status -------------------------------------

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
        setTasks(newState)

        // const task = tasks.find(t => t.id === taskId)
        // if (task) {
        //     task.isDone = isDone
        //     setTasks([...tasks])
        // }
    }

    return (
        <div className="app">
            {/* ----------------------❗ Рендерим каждый тудулист */}
            {todolists.map(todolist => {
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


