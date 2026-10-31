import {useAppDispatch} from "@/common/hooks";
import {changeTodolistTitleAC, deleteTodolistAC, Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import styles from "./TodolistTitle.module.css"

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist;

    const dispatch = useAppDispatch()

    const deleteTodolistHandler = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            </h3>
            <IconButton onClick={deleteTodolistHandler}>
                <Delete />
            </IconButton>
        </div>
    )
}