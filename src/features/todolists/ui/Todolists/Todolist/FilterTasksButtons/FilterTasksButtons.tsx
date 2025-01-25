import { Box, Button } from '@mui/material';
import {
    changeTodolistFilterAC,
    FilterValuesType,
    TodolistType,
} from '../../../../../../model/todolists-reducer';
import { useDispatch } from 'react-redux';
import { filterButtonsContainerSx } from './styled';

type FilterTasksButtonsPropsType = {
    todolist: TodolistType;
};

export const FilterTasksButtons = ({ todolist }: FilterTasksButtonsPropsType) => {
    const { id, filter } = todolist;

    const dispatch = useDispatch();

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({ id, filter }));
    };

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}>
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}>
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};
