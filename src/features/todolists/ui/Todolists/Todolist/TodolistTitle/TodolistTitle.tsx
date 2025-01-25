import React, { useCallback } from 'react';
import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistType,
} from '../../../../../../model/todolists-reducer';
import { useDispatch } from 'react-redux';

type TodolistTitlePropsType = {
    todolist: TodolistType;
};

export const TodolistTitle = ({ todolist }: TodolistTitlePropsType) => {
    const { id, title } = todolist;
    const dispatch = useDispatch();
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id));
    };

    const updateTodolistHandler = useCallback(
        (title: string) => {
            dispatch(changeTodolistTitleAC({ id, title }));
        },
        [dispatch, id],
    );

    return (
        <div className={'container'}>
            <h3>
                <EditableSpan value={title} onChange={updateTodolistHandler} />
            </h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
};
