
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
import { AllTasksType } from "../App";




const initialState:AllTasksType = {}
export const tasksReducer = (state: AllTasksType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case 'ADD_TASK':
            let tasks = state[action.todoListId]
            let task = {id: v1(), title: action.title, isDone: false}
            let newTask = [task, ...tasks]
            state[action.todoListId] = newTask
            return {...state}

        case "CHANGE_TASK_STATUS": {
            let tasks = state[action.todoListId]
            state[action.todoListId] = tasks.
            map(t => t.id === action.taskId
                ? {...t, isDone: action.isDone}
                : t)
            return {...state}

        }
        case "CHANGE_TASK_TITLE": {
            let tasks = state[action.todoListId]
            state[action.todoListId] = tasks.
            map(t => t.id === action.taskId
                ? {...t,title: action.newTitle}
                : t)
            return {...state}
        }
        case "ADD_TODOLIST":
            const stateCopy = {...state}
            stateCopy[action.todoListId] = []
            return stateCopy

        case "REMOVE_TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default :
            return state
    }

}

export const removeTaskAC = (taskId: string, todoListId: string) => ({
    type: 'REMOVE_TASK',
    taskId,
    todoListId
} as const)

export const addTaskAC = (title: string, todoListId: string) => ({
    type: 'ADD_TASK',
    title,
    todoListId
} as const)

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({
    type: 'CHANGE_TASK_STATUS',
    taskId,
    isDone,
    todoListId
} as const)

export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListId: string) => ({
    type: 'CHANGE_TASK_TITLE',
    taskId,
    newTitle,
    todoListId
} as const)


export type ActionsType = RemoveTaskAC
    | addTaskAC
    | changeTaskStatusAC
    | changeTaskTitleAC
    | AddTodoListActionType
    | RemoveTodoListActionType

export type RemoveTaskAC = ReturnType<typeof removeTaskAC>
export type addTaskAC = ReturnType<typeof addTaskAC>
export type changeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>






