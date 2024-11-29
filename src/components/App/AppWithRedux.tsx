import './App.css';

import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';

import {
    addTodolistAC,
    changeTodolistFilter,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
} from '../../state/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
} from '../../state/tasks-reducer';
import { FilterValuesType, TaskType, ThemeMode } from './types';
import { MenuButton } from '../MenuButton';
import { AddItemForm } from '../AddItemForm';
import { Todolist } from '../Todolist';

export const AppWithRedux = () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ]);

    const [tasks, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    });

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    });

    const removeTask = (taskId: string, todolistId: string) => {
        const action = removeTaskAC(taskId, todolistId);
        dispatchToTaskReducer(action);
    };

    const addTask = (title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatchToTaskReducer(action);
    };

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const action = changeTaskStatusAC(taskId, taskStatus, todolistId);
        dispatchToTaskReducer(action);
    };

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilter(todolistId, filter);
        dispatchToTodolistsReducer(action);
    };

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatchToTaskReducer(action);
        dispatchToTodolistsReducer(action);
    };

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTaskReducer(action);
        dispatchToTodolistsReducer(action);
    };

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const action = changeTaskTitleAC(taskId, title, todolistId);
        dispatchToTaskReducer(action);
    };

    const updateTodolist = (todolistId: string, title: string) => {
        const action = changeTodolistTitleAC(todolistId, title);
        dispatchToTodolistsReducer(action);
    };

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{ mb: '30px' }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map((tl) => {
                        const allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(
                                (task: TaskType) => !task.isDone,
                            );
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(
                                (task: TaskType) => task.isDone,
                            );
                        }

                        return (
                            <Grid>
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
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};
