import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterType} from "./App";
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";


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
    changeStatus: (id: string, isDone: boolean) => void
    deleteTodoList: (todoListId: string) => void
    changeTaskTitle: (id: string, title: string,todoListId:string) => void
    changeTodoListTitle: (title:string,todoListId:string) => void

}

export function TodoList(props: PropsType) {
    const addTask = (title:string) => props.addTask(title,props.id)
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(title, props.id)

    return (
        <div>
            <h3><EditableSpan changeItem={changeTodoListTitle} title={props.title}/> <button onClick={() => {props.deleteTodoList(props.id)}}>x</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, event.currentTarget.checked)
                        const changeTitle = (title:string) => {
                            props.changeTaskTitle(t.id,title,props.id)
                        }
                        return (
                            <li key={t.id}>
                                <input onChange={onChangeHandler}
                                       type="checkbox"
                                       checked={t.isDone}/>
                                <EditableSpan changeItem={changeTitle} title={t.title} />
                                <button
                                    onClick={onClickHandler}>
                                    x
                                </button>
                            </li>)
                    })}

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}