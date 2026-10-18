import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {
    createTodolistAC,
} from "@/features/todolists/model/todolists-reducer.ts";
import {Container, Grid} from "@mui/material";
import {CreateItemForm} from "@/common/components/CreateItemForm/CreateItemForm.tsx";
import {TodoLists} from "@/features/todolists/ui/Todolists/Todolists.tsx";

export const Main = () => {
    const dispatch = useAppDispatch()

    // -------------------------------❗Create-TodoList ------------------------------------------
    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return (
        <Container maxWidth={'lg'}>
            <Grid container sx={{mb: '30px'}}>
                <CreateItemForm onCreateItem={createTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <TodoLists/>
            </Grid>
        </Container>
    )
}