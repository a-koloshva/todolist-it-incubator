import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import { EditableSpan } from '../../../../../../../common/components/EditableSpan/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskType,
} from '../../../../../../../model/tasks-reducer';
import { TodolistType } from '../../../../../../../model/todolists-reducer';
import { getListItemSx } from './styled';

type TaskPropsType = {
    task: TaskType;
    todolist: TodolistType;
};

export const Task = React.memo(({ task, todolist }: TaskPropsType) => {
    const dispatch = useDispatch();

    const removeTaskHandler = useCallback(
        () => dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id })),
        [dispatch, task.id, todolist.id],
    );

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }));
    };

    const changeTaskTitleHandler = useCallback(
        (title: string) => {
            dispatch(changeTaskTitleAC({ todolistId: todolist.id, taskId: task.id, title }));
        },
        [dispatch, task.id, todolist.id],
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
