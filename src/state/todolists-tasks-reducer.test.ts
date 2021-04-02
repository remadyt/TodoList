import {tasksReducer} from "./tasks-reducer";
import {AllTasksType, TodoListType} from "../App";
import {AddTodoListAC, todoListsReducer} from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: AllTasksType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});
