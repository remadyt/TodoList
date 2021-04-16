import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";


export type FilterType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}
export type AllTasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoLists = useSelector<AppStoreType,TodoListType[]> (state => state.todoLists)
    let tasks = useSelector<AppStoreType,AllTasksType> (state => state.tasks)
    let dispatch = useDispatch()

    const removeTask = (id: string, todoListId: string) => {
       dispatch(removeTaskAC(id,todoListId))
    }

    const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id,isDone,todoListId))
    }

    const changeTaskTitle = (id: string, title: string, todoListId: string) =>  {
            dispatch(changeTaskTitleAC(id,title,todoListId))
    }

    const addTask = (title: string, todoListId: string) =>  {
            dispatch(addTaskAC(title,todoListId))
    }

    const changeFilter = (value: FilterType, todoListId: string)  => {
        dispatch(ChangeTodoListFilterAC(todoListId,value))
    }

    const removeTodoList = (todoListId: string)  => {
        dispatch(RemoveTodoListAC(todoListId))
    }

    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(title,todoListId))
    }


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
                            let tasksForTodoList = tasks[tl.id]
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
                                            removeTodoList={removeTodoList}
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
