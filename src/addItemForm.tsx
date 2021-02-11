import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title:string) => void

}

function AddItemForm (props:AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    const [error,setError] = useState<string| null>(null)
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItem()
        }}
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
    }
    const addItem = () => {
        if(title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                onKeyPress={onKeyPressAddTask}
                value={title}
                onChange={changeTitle}/>
            <button onClick={addItem}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}

export default AddItemForm;