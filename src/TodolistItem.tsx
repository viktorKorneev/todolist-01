import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
// import {v} from "vitest/dist/chunks/reporters.D7Jzd9GS";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: () => void
}

export const TodolistItem = ({title, tasks, date, deleteTask, changeFilter, createTask}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"} onClick={createTask} />
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
                                <Button title={"x"} onClick={ () => deleteTask(task.id) } />
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
