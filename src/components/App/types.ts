export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: TaskType[];
};

export type ThemeMode = 'dark' | 'light';
