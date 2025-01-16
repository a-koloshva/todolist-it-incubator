import { Box, Button } from '@mui/material';
import { FilterValuesType } from '../../../../model/todolists-reducer';
import { filterButtonsContainerSx } from '../styles';

type FilterTasksButtonsPropsType = {
    todolistId: string;
    filter: FilterValuesType;
    changeFilter: (filter: FilterValuesType, todolistId: string) => void;
};

export const FilterTasksButtons = (props: FilterTasksButtonsPropsType) => {
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        props.changeFilter(filter, props.todolistId);
    };

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={props.filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}>
                All
            </Button>
            <Button
                variant={props.filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}>
                Active
            </Button>
            <Button
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};
