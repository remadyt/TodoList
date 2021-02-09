import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


export type FilterType = 'all'| 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState ([
        {id:v1(), title:'HTML', isDone: true},
        {id:v1(), title:'CSS', isDone: true},
        {id:v1(), title:'React', isDone: false},

    ])
    let [filter,setFilter] = useState<FilterType>('all')


    function removeTask (id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter (t => !t.isDone)
    }
    if ( filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }
    function changeFilter (value: 'all'| 'active' | 'completed') {
        setFilter(value)
    }

    function changeStatus (id:string, isDone: boolean) {
        let task = tasks.find( task => task.id === id)
        if(task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }
    function addTask (title:string) {
       let task = {id:v1(), title:title, isDone: false}
       let newTask = [task,...tasks]
        setTasks(newTask)

    }

    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
                addTask={addTask}
                filter={filter}
            />
        </div>
    )
}

export default App;
