import { v1 } from 'uuid';

import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistID1,
    todolistID2,
} from './todolists-reducer';
import { TasksStateType } from '../components/App/types';

const initialState: TasksStateType = {
    [todolistID1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
        { id: v1(), title: 'Rest API', isDone: true },
        { id: v1(), title: 'GraphQL', isDone: false },
    ],
};

export const tasksReducer = (
    state: TasksStateType = initialState,
    action: ActionsType,
): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(
                    (t) => t.id !== action.payload.taskId,
                ),
            };
        }

        case 'ADD-TASK': {
            const newTask = { id: v1(), title: action.payload.title, isDone: false };
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]],
            };
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

        case 'ADD-TODOLIST': {
            return { ...state, [action.payload.todolistId]: [] };
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state };
            delete stateCopy[action.payload.id];
            return stateCopy;
        }

        default:
            return state;
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
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;
