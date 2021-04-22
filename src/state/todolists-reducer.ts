
import {v1} from "uuid";
import { FilterType, TodoListType } from "../App";


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
    title: string,
    todoListId:string
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

const initialState:TodoListType[] = []


export const todoListsReducer = (state: TodoListType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter((tl) => tl.id !== action.id)

        case 'ADD_TODOLIST':
            return [
                ...state, {
                    id: action.todoListId,
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
            return state
    }

}


export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE_TODOLIST', id}
}
export const AddTodoListAC = (title: string,): AddTodoListActionType => {
    return {type: 'ADD_TODOLIST', title, todoListId: v1()}
}
export const ChangeTodoListTitleAC = (title: string,id: string): ChangeTodoListTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE',  title,id}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterType ): ChangeTodoListFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', id, filter}
}

