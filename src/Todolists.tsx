import {Grid, Paper} from "@mui/material";
import {TodolistItem} from "@/TodolistItem.tsx";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

export const TodoLists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(todolist => {
                return (
                    <Grid key={todolist.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <TodolistItem todolist={todolist}/>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}