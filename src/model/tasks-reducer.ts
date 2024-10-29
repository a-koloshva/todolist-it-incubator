import { v1 } from 'uuid';
import { TasksStateType } from '../App';

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = { ...state };
            const tasks = state[action.payload.todolistId];
            const filteredTasks = tasks.filter((t) => t.id !== action.payload.taskId);
            stateCopy[action.payload.todolistId] = filteredTasks;
            return stateCopy;
        }

        case 'ADD-TASK': {
            const stateCopy = { ...state };
            const tasks = stateCopy[action.payload.todolistId];
            const newTask = { id: v1(), title: action.payload.title, isDone: false };
            const newTasks = [newTask, ...tasks];
            stateCopy[action.payload.todolistId] = newTasks;
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t,
                ),
            };
        }

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
                    t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t,
                ),
            };
        }

        default:
            throw new Error("I don't understand this type");
    }
};

// Action creators
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', payload: { taskId, todolistId } } as const;
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', payload: { title, todolistId } } as const;
};

export const changeTaskStatusAC = (
    taskId: string,
    isDone: boolean,
    todolistId: string,
): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', payload: { taskId, isDone, todolistId } } as const;
};

export const changeTaskTitleAC = (
    taskId: string,
    title: string,
    todolistId: string,
): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', payload: { taskId, title, todolistId } } as const;
};

// Actions types
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    payload: {
        taskId: string;
        todolistId: string;
    };
};

export type AddTaskActionType = {
    type: 'ADD-TASK';
    payload: {
        title: string;
        todolistId: string;
    };
};

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS';
    payload: {
        taskId: string;
        isDone: boolean;
        todolistId: string;
    };
};

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE';
    payload: {
        taskId: string;
        title: string;
        todolistId: string;
    };
};

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType;
