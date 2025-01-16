import { TaskType } from '../../model/tasks-reducer';

export type TaskPropsType = {
    task: TaskType;
    todolistId: string;
    updateTask: (todolistId: string, taskId: string, title: string) => void;
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
    removeTask: (taskId: string, todolistId: string) => void;
};
