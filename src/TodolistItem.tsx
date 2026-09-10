import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
    todolist: Todolist;
    tasks: Task[]
    date?: string
    deleteTask: (todolistId:string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId:string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
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
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = props


    const createTaskHandler = (title: string) => {
        createTask(id, title)
    }


    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(id)
    }

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(id, title)
    }


    return (
        <div>
            <div className={"container"}>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                <Button title={"x"} onClick={deleteTodolistHandler} />
            </div>
            <CreateItemForm onCreateItem={createTaskHandler} />
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

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(id, task.id, title)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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
