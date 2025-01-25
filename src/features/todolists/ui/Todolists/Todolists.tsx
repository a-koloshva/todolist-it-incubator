import { Grid, Paper } from '@mui/material';
import { RootState } from '../../../../app/store';
import { TodolistType } from '../../../../model/todolists-reducer';
import { useSelector } from 'react-redux';
import { Todolist } from './Todolist/Todolist';

export const Todolists = () => {
    const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists);

    return todolists.map((tl) => {
        return (
            <Grid key={tl.id}>
                <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <Todolist key={tl.id} todolist={tl} />
                </Paper>
            </Grid>
        );
    });
};
