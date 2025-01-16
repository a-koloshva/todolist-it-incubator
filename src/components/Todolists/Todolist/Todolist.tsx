import React, { useCallback } from 'react';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { PropsType } from './types';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { Tasks } from './Tasks/Tasks';
import { FilterTasksButtons } from './FilterTasksButtons/FilterTasksButtons';

export const Todolist = React.memo((props: PropsType) => {
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

    const addTaskCallback = useCallback(
        (title: string) => {
            addTask(title, todolistId);
        },
        [addTask, todolistId],
    );

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter((task) => !task.isDone);
    }

    if (filter === 'completed') {
        // eslint-disable-next-line
        tasksForTodolist = tasks.filter((task) => task.isDone);
    }

    return (
        <div>
            <TodolistTitle
                title={title}
                removeTodolist={removeTodolist}
                todolistId={todolistId}
                updateTodolist={updateTodolist}
            />
            <AddItemForm addItem={addTaskCallback} />
            <Tasks
                tasks={tasks}
                todolistId={todolistId}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                updateTask={updateTask}
            />
            <FilterTasksButtons
                todolistId={todolistId}
                filter={filter}
                changeFilter={changeFilter}
            />
        </div>
    );
});
