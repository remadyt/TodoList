import {v1} from "uuid";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {FilterType, TodoListType} from "../App";

let todolistId1:string
let todolistId2:string
let startState:TodoListType[] = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})



test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodoListTitle = "New Todolist";
    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
});


test('correct todolist should change its name', () => {
        let newTodoListTitle = 'newTodoListTitle'
        const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodoListTitle))
        expect(endState[0].title).toBe('What to learn')
        expect(endState[1].title).toBe(newTodoListTitle)
    }
)

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterType = "completed";
    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



