import { Container, Grid } from '@mui/material';
import { AddItemForm } from '../features/todolists/ui/Todolists/Todolist/AddItemForm/AddItemForm';
import { useDispatch } from 'react-redux';
import { addTodolistAC } from '../model/todolists-reducer';

import { useCallback } from 'react';
import { Todolists } from '../features/todolists/ui/Todolists/Todolists';

export const Main = () => {
    const dispatch = useDispatch();

    const addTodolist = useCallback(
        (title: string) => {
            dispatch(addTodolistAC(title));
        },
        [dispatch],
    );

    return (
        <Container fixed>
            <Grid container sx={{ mb: '30px' }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>

            <Grid container>
                <Todolists />
            </Grid>
        </Container>
    );
};
