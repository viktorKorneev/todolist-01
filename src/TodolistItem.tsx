import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {useRef, useState} from "react";
// import {v} from "vitest/dist/chunks/reporters.D7Jzd9GS";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export const TodolistItem = ({title, tasks, date, deleteTask, changeFilter, createTask}: Props) => {
    // const inputRef = useRef<HTMLInputElement>(null); ❗-- useRef() -- ❗

    const [taskTitle, setTaskTitle] = useState("")

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle("")
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={event => setTaskTitle(event.currentTarget.value)}
                       onKeyDown={event => {
                           if (event.key === "Enter") {
                               createTaskHandler()
                           }
                       }}/>
                <Button title={"+"} onClick={createTaskHandler}/>

                {/*/!*<input ref={inputRef}/>*!/---------------------*/}
                {/*/!*<Button title={"+"} onClick={() => {*!/      --*/}
                {/*/!*    if (inputRef.current) {*!/               --*/}
                {/*/!*        createTask(inputRef.current.value)*!/-------❗ useRef()*/}
                {/*/!*        inputRef.current.value = ""*!/   ------*/}
                {/*/!*    }*!/                                   ----*/}
                {/*/!*}}/>*!/----------------------------------------*/}

            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={"x"} onClick={() => deleteTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={"All"} onClick={() => changeFilter("all")}/>
                <Button title={"Active"} onClick={() => changeFilter("active")}/>
                <Button title={"Completed"} onClick={() => changeFilter("completed")}/>
                <div>{date}</div>
            </div>
        </div>
    )
}
