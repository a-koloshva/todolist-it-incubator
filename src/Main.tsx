import { Container, Grid } from '@mui/material';
import { AddItemForm } from './components/Todolists/Todolist/AddItemForm/AddItemForm';
import { useDispatch } from 'react-redux';
import { addTodolistAC } from './model/todolists-reducer';

import { useCallback } from 'react';
import { Todolists } from './components/Todolists/Todolists';

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

            <Grid container spacing={4}>
                <Todolists />
            </Grid>
        </Container>
    );
};
