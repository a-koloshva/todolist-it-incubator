import { Grid, Paper } from '@mui/material';
import { Todolist } from './Todolist';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistType,
} from '../../model/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksStateType,
} from '../../model/tasks-reducer';
import { useCallback } from 'react';

export const Todolists = () => {
    const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists);
    const tasks = useSelector<RootState, TasksStateType>((state) => state.tasks);

    const dispatch = useDispatch();

    const removeTask = useCallback(
        (taskId: string, todolistId: string) => {
            dispatch(removeTaskAC({ taskId, todolistId }));
        },
        [dispatch],
    );

    const addTask = useCallback(
        (title: string, todolistId: string) => {
            dispatch(addTaskAC({ title, todolistId }));
        },
        [dispatch],
    );

    const changeTaskStatus = useCallback(
        (taskId: string, taskStatus: boolean, todolistId: string) => {
            dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }));
        },
        [dispatch],
    );

    const updateTask = useCallback(
        (todolistId: string, taskId: string, title: string) => {
            dispatch(changeTaskTitleAC({ taskId, title, todolistId }));
        },
        [dispatch],
    );

    const changeFilter = useCallback(
        (filter: FilterValuesType, id: string) => {
            dispatch(changeTodolistFilterAC({ id, filter }));
        },
        [dispatch],
    );

    const removeTodolist = useCallback(
        (todolistId: string) => {
            dispatch(removeTodolistAC(todolistId));
        },
        [dispatch],
    );

    const updateTodolist = useCallback(
        (id: string, title: string) => {
            dispatch(changeTodolistTitleAC({ id, title }));
        },
        [dispatch],
    );

    return todolists.map((tl) => {
        const allTodolistTasks = tasks[tl.id];
        let tasksForTodolist = allTodolistTasks;

        return (
            <Grid key={tl.id}>
                <Paper sx={{ p: '0 20px 20px 20px' }}>
                    <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                </Paper>
            </Grid>
        );
    });
};
