import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/features/todolists/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks";
import {getListItemSx} from "./TaskItem.styles.ts";


type Props = {
    task: Task
    todolistId: string
}

export const TaskItem = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTaskHandler = () => {
        dispatch(deleteTaskAC({todolistId, taskId: task.id}))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId, taskId: task.id, isDone: newStatusValue}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: task.id, title}))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
            <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            <IconButton onClick={deleteTaskHandler}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
}