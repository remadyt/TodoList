import React, { useCallback} from "react";
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import { FilterType } from "./App";
import Task from "./Task";



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

export const TodoList = React.memo((props: PropsType)  => {
    console.log('todoList is called')
    const addTask = useCallback((title:string) => props.addTask(title,props.id),[props.addTask,props.id])
    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id),[props.changeFilter,props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id),[props.changeFilter,props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id),[props.changeFilter,props.id])
    const changeTodoListTitle = useCallback((title:string) => props.changeTodoListTitle(title, props.id),[props.changeTodoListTitle,props.id])
    const removeTodoList =  useCallback(() => {props.removeTodoList(props.id)},[props.removeTodoList,props.id])


    if (props.filter === 'active') {
        props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        props.tasks.filter(t => t.isDone)
    }
    return (
        <div>
            <h3><EditableSpan changeItem={changeTodoListTitle} title={props.title}/> <IconButton onClick={removeTodoList}><Delete/></IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <ul className='li1'>
                {
                    props.tasks.map(t => <Task
                        key={t.id}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeStatus={props.changeStatus}
                        todoListId={props.id}
                        t={t} />
                    )
                }

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
})