import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import { EditableSpan } from '../EditableSpan';
import { AddItemForm } from '../AddItemForm';
import { filterButtonsContainerSx, getListItemSx } from './styled';
import { PropsType } from './types';
import { FilterValuesType } from '../App/types';

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        updateTask,
        updateTodolist,
    } = props;

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId);
    };

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    };

    const addTaskCallback = (title: string) => {
        addTask(title, props.todolistId);
    };

    const updateTodolistHandler = (title: string) => {
        updateTodolist(props.todolistId, title);
    };

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>
                    <EditableSpan value={title} onChange={updateTodolistHandler} />
                </h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback} />
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasks.map((task) => {
                        const removeTaskHandler = () => {
                            removeTask(task.id, todolistId);
                        };

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked;
                            changeTaskStatus(task.id, newStatusValue, todolistId);
                        };

                        const changeTaskTitleHandler = (title: string) => {
                            updateTask(todolistId, task.id, title);
                        };
                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}
                                    />
                                    <EditableSpan
                                        value={task.title}
                                        onChange={changeTaskTitleHandler}
                                    />
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>
            )}
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
        </div>
    );
};
