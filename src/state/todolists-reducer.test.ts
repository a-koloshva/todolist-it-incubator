import { v1 } from 'uuid';

import { TodolistType } from '../components/App/types';
import {
    addTodolistAC,
    changeTodolistFilter,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
} from './todolists-reducer';

test('correct todolist should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    // 1. Стартовый state
    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    // 2. Действие
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1);
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const newTitle = 'New Todolist';

    const endState = todolistsReducer(startState, addTodolistAC(newTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitle);
});

test('correct todolist should change its name', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const newTitle = 'New Todolist';

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTitle);
});

test('correct filter of todolist should be changed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const newFilter = 'completed';

    const endState = todolistsReducer(startState, changeTodolistFilter(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});