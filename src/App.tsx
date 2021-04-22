import React, {useCallback} from 'react';
import {TaskType, TodoList} from "./TodoList";
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

export const App = () => {
    console.log('app is called')
    let todoLists = useSelector<AppStoreType,TodoListType[]> (state => state.todoLists)
    let tasks = useSelector<AppStoreType,AllTasksType> (state => state.tasks)
    let dispatch = useDispatch()

    const removeTask = useCallback((id: string, todoListId: string) => {
       dispatch(removeTaskAC(id,todoListId))
    },[dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id,isDone,todoListId))
    },[dispatch])

    const changeTaskTitle = useCallback((id: string, title: string, todoListId: string) =>  {
            dispatch(changeTaskTitleAC(id,title,todoListId))
    },[dispatch])

    const addTask = useCallback((title: string, todoListId: string) =>  {
            dispatch(addTaskAC(title,todoListId))
    },[dispatch])

    const changeFilter = useCallback((value: FilterType, todoListId: string)  => {
        dispatch(ChangeTodoListFilterAC(todoListId,value))
    },[dispatch])

    const removeTodoList = useCallback((todoListId: string)  => {
        dispatch(RemoveTodoListAC(todoListId))
    },[dispatch])

    const addTodoList = useCallback ((title: string) => {
        dispatch(AddTodoListAC(title))
    },[dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(title,todoListId))
    },[dispatch])

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

                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={5} style={{padding: '10px'}}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasks[tl.id]}
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


