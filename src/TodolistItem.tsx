import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    todolist: Todolist;
    tasks: Task[]
    date?: string
    deleteTask: (todolistId:string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId:string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const TodolistItem = (props: Props) => {
    const {
        // Деструктурируем только поля id, title и filter из props.todolist.
        // Переменная todolist здесь НЕ создаётся, поэтому используем id,
        // а обратиться как todolist.id нельзя — такой переменной нет.
        todolist: {id, title, filter},
        tasks,
        date,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus
    } = props

    // const inputRef = useRef<HTMLInputElement>(null); ❗-- useRef() -- ❗

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (taskTitle !== "") {
            createTask(id, trimmedTitle)
            setTaskTitle("")
        } else {
            setError("Title is required")
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            createTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? "error" : ""}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={"+"} onClick={createTaskHandler}/>
                {error && <div className={"error-message"}>{error}</div>}

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
                        const deleteTaskHandler = () => {
                            deleteTask(id, task.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(id, task.id, newStatusValue)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={"x"} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
                <div>{date}</div>
            </div>
        </div>
    )
}
