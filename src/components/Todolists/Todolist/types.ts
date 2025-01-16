import { TaskType } from '../../../model/tasks-reducer';
import { FilterValuesType } from '../../../model/todolists-reducer';

export type PropsType = {
    title: string;
    todolistId: string;
    tasks: TaskType[];
    updateTodolist: (todolistId: string, title: string) => void;
    changeFilter: (filter: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    updateTask: (todolistId: string, taskId: string, title: string) => void;
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
    removeTask: (taskId: string, todolistId: string) => void;
};
