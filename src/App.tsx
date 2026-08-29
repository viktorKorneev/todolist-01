import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {
    const [tasks, setTasks] = useState<Task[]> ([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "Typescript", isDone: false},
        {id: 6, title: "RTK query", isDone: false},
    ])

    const deleteTask = (taskId: number) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    return (
        <div className="app">
            <TodolistItem title="What to learn" tasks={tasks} date="27.01.2027" deleteTask={deleteTask} />
        </div>
    )
}


