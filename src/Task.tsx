import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoList";

type PropsType = {
    removeTask: (title: string, todoListId: string) => void
    changeTaskTitle: (id: string, title: string,todoListId:string) =>  void
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void
    todoListId: string
    t: TaskType
}

const Task = React.memo((props:PropsType) => {
    const onClickHandler = useCallback(() => {
        props.removeTask(props.t.id, props.todoListId)
    },[props.removeTask,props.todoListId])
    const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) =>
        props.changeStatus(props.t.id, event.currentTarget.checked,props.todoListId),[props.t.id,props.todoListId])
    const changeTitle = useCallback((title:string) => {
        props.changeTaskTitle(props.t.id,title,props.todoListId)
    },[props.changeTaskTitle,props.t.id,props.todoListId])
    return (
        <li  key={props.t.id}>
            <Checkbox onChange={onChangeHandler}
                      checked={props.t.isDone}/>
            <EditableSpan changeItem={changeTitle} title={props.t.title} />

            <IconButton
                onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>)
});

export default Task;