import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterType} from "./App";
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

type PropsType = {
    tasks: Array<TaskType>
    title: string
    id: string
    filter: FilterType
    removeTask: (title: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value: FilterType, todoListId: string) => void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (id: string, title: string,todoListId:string) => void
    changeTodoListTitle: (title:string,todoListId:string) => void

}

export function TodoList(props: PropsType) {
    const addTask = (title:string) => props.addTask(title,props.id)
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(title, props.id)
    const removeTodoList =  () => {props.removeTodoList(props.id)}

    return (
        <div>
            <h3><EditableSpan changeItem={changeTodoListTitle} title={props.title}/> <IconButton onClick={removeTodoList}><Delete/></IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <ul className='li1'>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, event.currentTarget.checked,props.id)
                        const changeTitle = (title:string) => {
                            props.changeTaskTitle(t.id,title,props.id)
                        }
                        return (
                            <li  key={t.id}>
                                <Checkbox onChange={onChangeHandler}
                                       checked={t.isDone}/>
                                <EditableSpan changeItem={changeTitle} title={t.title} />

                                <IconButton
                                    onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>)
                    })}

            </ul>
            <div>
                <Button
                    variant="outlined"
                    size='small'
                    color={props.filter === 'all' ? 'secondary' : 'primary'} onClick={onAllClickHandler}>All
                </Button>
                <Button color= {props.filter === 'active' ? 'secondary' : 'primary'} size='small' variant="outlined"
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={props.filter === 'completed' ? 'secondary' : 'primary'} size='small' variant="outlined"
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}