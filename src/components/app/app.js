import React, { Component } from 'react';

import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    constructor() {
        super();

        this.maxId = 0;


        this.state = {

            todoData: [
                this.createTodoItem('Drink coffee'),
                this.createTodoItem('Make something'),
                this.createTodoItem('Learn React')
            ],
            term: '',
            filter: 'all' // active, all, done
        };
    }

    createTodoItem = (label) => {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    };



    deleteItem = (id) => {
        this.setState(({ todoData }) => {

            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

            return {
                todoData: newArray
            }
        })
    };

    addItem = (text) => {

        const newItem = this.createTodoItem(text)

        this.setState(({ todoData }) => {

            const newArray = [...todoData, newItem];

            return {
                todoData: newArray
            }
        })
    };

    toggleProperty = (arr, id, propName) => {

        const idx = arr.findIndex((el) => el.id === id);

        // Update object

        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        // Construcr new Array

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]

    }

    onToggleDone = (id) => {

        this.setState(({ todoData }) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }

        })
    };

    onToggleImportant = (id) => {

        this.setState(({ todoData }) => {

            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }

        })
    };

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter((items) => {
            return items.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    };

    filter = (items, filter) => {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    }

    onSearchChange = (term) => {
        this.setState({ term })
    };

    onFilterChange = (filter) => {
        this.setState({ filter })
    };


    render() {

        const { todoData, term, filter } = this.state;

        const visibleItem = this.filter(
            this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app" >
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange} />
                </div>

                <TodoList
                    todos={visibleItem}
                    onDeleted={this.deleteItem}
                    onToggleDone={this.onToggleDone}
                    onToggleImportant={this.onToggleImportant}
                />
                <ItemAddForm
                    onItemAdded={this.addItem} />
            </div>
        );
    };
};
