import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";



function App() {
    let [tasks, setTasks] = useState ([
        {id:0, title:'CSS', isDone: true},
        {id:1, title:'JS', isDone: false},
        {id:2, title:'HTML', isDone: true},
        {id:3, title:'rest api', isDone: false},
        {id:4, title:'graphQL', isDone: true},
    ])

    function removeTask (id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<'all'| 'active' | 'completed'>('all')
    let tasksForTodoList = tasks
        if (filter === 'active'){
            tasksForTodoList = tasks.filter(t => t.isDone === false)
        }
        if (filter === 'completed') {
            tasksForTodoList = tasks.filter(t => t.isDone === true)
        }
        function changeFilter (value:'all'| 'active' | 'completed') {
            setFilter(value)
    }


    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />


        </div>
    )
}

export default App;
