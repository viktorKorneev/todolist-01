import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    themeMode: "light" as ThemeMode,
}

export const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(changeThemeModeAC, (state, action) => {

        })
})

export type ThemeMode = "dark" | "light";