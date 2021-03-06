import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeItem: (title:string) => void

}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
     console.log('span clicked')
    const [title, setTitle] = useState('')
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeItem(title)
    }
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }
    return (
        editMode
            ? <TextField
                autoFocus
                onBlur={offEditMode}
                value={title}
                onChange={changeTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

export default EditableSpan;