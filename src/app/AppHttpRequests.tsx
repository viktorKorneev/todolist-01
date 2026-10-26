import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan'
import axios from "axios";

const token = "ce2a389c-959e-4f19-a632-2c55ee336c57"
const apiKey = "7bfe4383-41a9-4115-811b-1d150babe2b6"

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<any>({})

    useEffect(() => {
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data)
        })
    }, [])

    const createTodolist = (title: string) => {
        axios.post<any>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {
            headers: {
                Authorization: `Bearer ${token}`,
                "API-KEY": apiKey
            }
        }).then((res) => {
            //
        })
    }

    const deleteTodolist = (id: string) => {}

    const changeTodolistTitle = (id: string, title: string) => {}

    const createTask = (todolistId: string, title: string) => {}

    const deleteTask = (todolistId: string, taskId: string) => {}

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {}

    const changeTaskTitle = (task: any, title: string) => {}

    return (
        <div style={{margin: '20px'}}>
            <CreateItemForm onCreateItem={createTodolist}/>
            {todolists.map((todolist: any) => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan value={todolist.title}
                                      onChange={title => changeTodolistTitle(todolist.id, title)}/>
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>
                    <CreateItemForm onCreateItem={title => createTask(todolist.id, title)}/>
                    {tasks[todolist.id]?.map((task: any) => (
                        <div key={task.id}>
                            <Checkbox checked={task.isDone}
                                      onChange={e => changeTaskStatus(e, task)}/>
                            <EditableSpan value={task.title}
                                          onChange={title => changeTaskTitle(task, title)}/>
                            <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const container: CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}
