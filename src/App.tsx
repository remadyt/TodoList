import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
type AllTasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterType, todoListId: string) {
        let todolist = todoLists.find((tl) => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoList([...todoLists])
        }

    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj})
    }

    function changeTaskTitle(id: string, title: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.title = title
        }
        setTasks({...tasksObj})
    }

    function addTask(title: string, todoListId: string) {
        let tasks = tasksObj[todoListId]
        let task = {id: v1(), title: title, isDone: false}
        let newTask = [task, ...tasks]
        tasksObj[todoListId] = newTask
        setTasks({...tasksObj})

    }

    function deleteTodoList(todoListId: string) {
        let filterTodoList = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoList(filterTodoList)
        delete tasksObj[todoListId]
        setTasks(tasksObj)
    }

    function addTodoList(title: string) {
        const newTodoListId = v1()
        const newTodoList: TodoListType = {
            id: newTodoListId, title: title, filter: 'all'
        }
        setTodoList([newTodoList, ...todoLists])
        setTasks({...tasksObj, [newTodoListId]: []})
    }

    function changeTodoListTitle(title: string, todoListId: string) {
        const todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = title
            setTodoList([...todoLists])
        }
    }

    const todoLists1 = v1()
    const todoLists2 = v1()
    const [tasksObj, setTasks] = useState<AllTasksType>({
            [todoLists1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'React', isDone: false},

            ],
            [todoLists2]: [
                {id: v1(), title: '1', isDone: true},
                {id: v1(), title: '2', isDone: true},
                {id: v1(), title: '3', isDone: false},

            ]
        }
    )


    let [todoLists, setTodoList] = useState<TodoListType[]>([
        {id: todoLists1, title: 'What to buy', filter: 'all'},
        /*{id: todoLists2, title: 'What to read', filter: 'all'},*/
    ])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={6}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodoList = tasksObj[tl.id]
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            return (
                                <Grid item key={tl.id}>
                                   <Paper elevation={5} style={{padding: '10px'}}>
                                       <TodoList
                                           id={tl.id}
                                           title={tl.title}
                                           tasks={tasksForTodoList}
                                           removeTask={removeTask}
                                           changeFilter={changeFilter}
                                           changeStatus={changeStatus}
                                           addTask={addTask}
                                           filter={tl.filter}
                                           deleteTodoList={deleteTodoList}
                                           changeTaskTitle={changeTaskTitle}
                                           changeTodoListTitle={changeTodoListTitle}
                                       />
                                   </Paper>
                                </Grid>

                            )
                        })
                    }
                </Grid>
                </Container>
        </div>
    )
}

export default App;
