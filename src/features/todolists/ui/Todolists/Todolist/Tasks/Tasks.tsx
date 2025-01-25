import { TasksStateType } from '../../../../../../model/tasks-reducer';
import { List } from '@mui/material';
import { TodolistType } from '../../../../../../model/todolists-reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../app/store';
import { Task } from './Task/Task';

type TasksPropsType = {
    todolist: TodolistType;
};

export const Tasks = ({ todolist }: TasksPropsType) => {
    const tasks = useSelector<RootState, TasksStateType>((state) => state.tasks);

    const allTodolistTasks = tasks[todolist.id];
    let tasksForTodolist = allTodolistTasks;

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter((task) => !task.isDone);
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter((task) => task.isDone);
    }

    return (
        <>
            {tasksForTodolist.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasksForTodolist.map((task) => (
                        <Task task={task} todolist={todolist} />
                    ))}
                </List>
            )}
        </>
    );
};
