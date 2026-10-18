import {Checkbox, IconButton, List, ListItem} from "@mui/material";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC} from "@/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import {getListItemSx} from "@/TodolistItem.styles.ts";
import {EditableSpan} from "@/EditableSpan.tsx";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolist} from "@/model/todolists-reducer.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

type Props = {
    todolist: Todolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist;

    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks
    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {filteredTasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {filteredTasks.map(task => {
                        const deleteTaskHandler = () => {
                            dispatch(deleteTaskAC({todolistId: id, taskId: task.id}))
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC({todolistId: id, taskId: task.id, isDone: newStatusValue}))
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            dispatch(changeTaskTitleAC({todolistId: id, taskId: task.id, title}))
                        }

                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <IconButton onClick={deleteTaskHandler}>
                                    <Delete/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
        </>

    )
}