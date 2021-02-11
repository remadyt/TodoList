import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeItem: (title:string) => void

}

function EditableSpan(props: EditableSpanPropsType) {
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
            ? <input
                autoFocus
                onBlur={offEditMode}
                value={title}
                onChange={changeTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan;