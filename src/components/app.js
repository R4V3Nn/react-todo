import React from 'react';

import TodoList from './todo-list';
import AppHeader from './app-header';
import SearchPanel from './search-panel';

const App = () => {

    const todoData = [
        { label: 'Drink coffee', important: false, id: 1 },
        { label: 'Make awesome app', important: true, id: 2 },
        { label: 'Have a lunch', important: false, id: 3 }
    ]

    return (
        <div>
            <AppHeader />
            <SearchPanel />
            <TodoList todos={ todoData } />
        </div>
    )
};

export default App;