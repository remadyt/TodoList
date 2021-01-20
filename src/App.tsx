import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

const tasks1 = [
    {id:1, title:'CSS', isDone: true},
    {id:2, title:'JS', isDone: false},
    {id:3, title:'HTML', isDone: true},
]

function App() {
    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={tasks1}
            />
            <TodoList
                title='What to learn'
                tasks={tasks1}
            />


        </div>
    );
}

export default App;
