import { combineReducers, legacy_createStore } from 'redux';

import { todolistsReducer } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

// @ts-ignore
window.store = store;
