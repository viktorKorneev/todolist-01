import {v1} from "uuid";
import {Todolist} from "../App.tsx";
import {deleteTodolistAC, todolistsReducer} from "./todolists-reducer.ts";
import {expect, test} from "vitest";

test ("correct todolist shuld be deleted", () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    //1. Стартовый state
    const startState: Todolist[] = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to learn", filter: "all"},
    ]

//2. Действие

    // const action = {
    //     type: "delete_todolist",
    //     payload: {
    //         id: todolistId1,
    //     },
    // } as const

    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    //3. Проверка, что действие изменило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})



