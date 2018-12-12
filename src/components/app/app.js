import React from 'react';

import TodoList from '../todo-list/todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel/search-panel';

import './app.css';

const App = () => {

    const todoData = [
        { label: 'Drink coffee', important: false, id: 1 },
        { label: 'Make awesome app', important: true, id: 2 },
        { label: 'Have a lunch', important: false, id: 3 }
    ]

    return (
        <div className="todo-app">
            <AppHeader />
            <SearchPanel />
            <TodoList todos={ todoData } />
        </div>
    )
};

export default App;