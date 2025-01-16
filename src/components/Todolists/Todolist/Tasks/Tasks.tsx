import React from 'react';
import { TaskType } from '../../../../model/tasks-reducer';
import { List } from '@mui/material';
import { Task } from '../../../Task';

type TasksPropsType = {
    todolistId: string;
    tasks: TaskType[];
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
    removeTask: (taskId: string, todolistId: string) => void;
    updateTask: (todolistId: string, taskId: string, title: string) => void;
};

export const Tasks = (props: TasksPropsType) => {
    const { tasks, todolistId, changeTaskStatus, removeTask, updateTask } = props;

    return tasks.length === 0 ? (
        <p>Тасок нет</p>
    ) : (
        <List>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    todolistId={todolistId}
                    changeTaskStatus={changeTaskStatus}
                    removeTask={removeTask}
                    updateTask={updateTask}
                />
            ))}
        </List>
    );
};
