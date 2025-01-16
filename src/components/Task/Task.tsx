import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import { getListItemSx } from '../Todolists/Todolist/styles';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskPropsType } from './types';

export const Task = React.memo((props: TaskPropsType) => {
    const { task, todolistId, updateTask, changeTaskStatus, removeTask } = props;

    const removeTaskHandler = () => {
        removeTask(task.id, todolistId);
    };

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newStatusValue, todolistId);
    };

    const changeTaskTitleHandler = useCallback(
        (title: string) => {
            updateTask(todolistId, task.id, title);
        },
        [updateTask, todolistId, task.id],
    );

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
});
