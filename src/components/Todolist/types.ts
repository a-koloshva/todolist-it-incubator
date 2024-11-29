import { FilterValuesType, TaskType } from '../App/App';

export type PropsType = {
    title: string;
    todolistId: string;
    tasks: TaskType[];
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (filter: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    updateTask: (todolistId: string, taskId: string, title: string) => void;
    updateTodolist: (todolistId: string, title: string) => void;
};
