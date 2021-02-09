import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterType} from "./App";


export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

type PropsType = {
    tasks: Array<TaskType>
    title: string
    id:string
    filter: FilterType
    removeTask: (title: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeFilter: (value:FilterType,todoListId: string ) => void
    changeStatus: (id: string, isDone: boolean) => void
    deleteTodoList: (todoListId:string) => void
}

export function TodoList(props: PropsType) {
    const [title, setTitle] = useState('')
    const [error,setError] = useState<string| null>(null)
    const addTask = () => {
        if(title.trim() !== '') {
        props.addTask(title,props.id)
        setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
    }}
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    return (
        <div>
            <h3>{props.title} <button onClick={() => {props.deleteTodoList(props.id)}}>x</button></h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    onKeyPress={onKeyPressHandler}
                    value={title}
                    onChange={onChangeHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => {
                            props.removeTask(t.id,props.id)
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, event.currentTarget.checked)
                        return (
                            <li key={t.id}>
                                <input onChange={onChangeHandler}
                                       type="checkbox"
                                       checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button
                                    onClick={onClickHandler}>
                                    x
                                </button>
                            </li>)
                    })}

                    </ul>
                    <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
                    </div>
                    </div>
                    )
                }