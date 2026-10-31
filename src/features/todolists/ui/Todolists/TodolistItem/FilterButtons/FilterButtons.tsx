import {Box, Button} from "@mui/material";
import {changeTodolistFilterAC, FilterValues, Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks";
import {containerSx} from "@/common/styles";

type Props = {
    todolist: Todolist
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist;
    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterValues) => {
        dispatch(changeTodolistFilterAC({todolistId: id, filter}))
    }

    return (
        <Box sx={containerSx}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => changeFilterHandler('all')}>
                All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => changeFilterHandler('active')}>
                Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => changeFilterHandler('completed')}>
                Completed
            </Button>
        </Box>
    )
}