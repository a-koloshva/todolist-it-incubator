import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskAC } from '../../../../../model/tasks-reducer';
import { TodolistType } from '../../../../../model/todolists-reducer';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { Tasks } from './Tasks/Tasks';
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons';

type PropsType = {
    todolist: TodolistType;
};

export const Todolist = React.memo(({ todolist }: PropsType) => {
    const dispatch = useDispatch();
    const addTaskCallback = useCallback(
        (title: string) => {
            dispatch(addTaskAC({ title, todolistId: todolist.id }));
        },
        [dispatch, todolist.id],
    );

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} />
            <Tasks todolist={todolist} />
            <FilterTasksButtons todolist={todolist} />
        </div>
    );
});
