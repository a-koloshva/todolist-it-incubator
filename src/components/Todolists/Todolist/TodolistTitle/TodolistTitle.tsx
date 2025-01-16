import React, { useCallback } from 'react';
import { EditableSpan } from '../../../EditableSpan/EditableSpan';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type TodolistTitlePropsType = {
    title: string;
    todolistId: string;
    removeTodolist: (todolistId: string) => void;
    updateTodolist: (todolistId: string, title: string) => void;
};

export const TodolistTitle = (props: TodolistTitlePropsType) => {
    const { title, todolistId, removeTodolist, updateTodolist } = props;

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    };

    const updateTodolistHandler = useCallback(
        (title: string) => {
            updateTodolist(todolistId, title);
        },
        [updateTodolist, todolistId],
    );

    return (
        <div className={'todolist-title-container'}>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler} />
            </h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};
