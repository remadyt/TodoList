import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionsType = RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: 'REMOVE_TODOLIST',
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD_TODOLIST',
    id: string,
    title: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    id: string,
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    id: string,
    filter: FilterType
}



export const todoListsReducer = (state: TodoListType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter((tl) => tl.id !== action.id)

        case 'ADD_TODOLIST':
            return [
                ...state, {
                    id: v1(),
                    title: action.title,
                    filter: 'all'
                }
            ]
        case 'CHANGE_TODOLIST_TITLE':
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        case "CHANGE_TODOLIST_FILTER": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
            }
            return [...state]
        }
        default :
            throw new Error('I dont understand this type')
    }

}


export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE_TODOLIST', id}
}
export const AddTodoListAC = (id: string, title: string): AddTodoListActionType => {
    return {type: 'ADD_TODOLIST', id, title}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', id, title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterType ): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', id, filter: 'completed'}
}
