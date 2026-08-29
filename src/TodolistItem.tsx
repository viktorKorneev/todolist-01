import {Task} from "./App.tsx";
import {Button} from "./Button.tsx";

type Props = {
    title: string
    tasks: Task[]
    date?: string
    deleteTask: (taskId: number) => void
}

export const TodolistItem = ({title, tasks, date, deleteTask}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
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
                <Button title={"All"} />
                <Button title={"Active"} />
                <Button title={"Completed"} />
                <div>{date}</div>
            </div>
        </div>
    )
}
