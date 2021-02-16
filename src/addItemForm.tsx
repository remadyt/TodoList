import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title:string) => void

}

function AddItemForm (props:AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error,setError] = useState<boolean>(false)
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }}
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        if(title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError(true)
        }
    }
    return (
        <div>
            <TextField
            variant={'outlined'}
            onKeyPress={onKeyPressAddTask}
            value={title}
            onChange={changeTitle}
            helperText={error ? 'Title is required' : ''}
            label={'Title'}
            error={error}
            />
           {/* <input
                className={error ? 'error' : ''}
                />*/}
            <IconButton onClick={addItem}><AddBox/></IconButton>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}

export default AddItemForm;