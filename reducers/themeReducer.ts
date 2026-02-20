import {createSlice} from "@reduxjs/toolkit"
import {useSelector, useDispatch} from "react-redux"
import type {StoreState, StoreDispatch} from "../store"

export type Themes =
    | "light"
    | "dark"

export type OS =
    | "mac"
    | "windows"

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme: "light" as Themes,
        os: window.platform as OS
    },
    reducers: {
        setTheme: (state, action) => {state.theme = action.payload},
        setOS: (state, action) => {state.os = action.payload}
    }    
})

const {
    setTheme, setOS
} = themeSlice.actions

export const useThemeSelector = () => {
    const selector = useSelector.withTypes<StoreState>()
    return {
        theme: selector((state) => state.theme.theme),
        os: selector((state) => state.theme.os)
    }
}

export const useThemeActions = () => {
    const dispatch = useDispatch.withTypes<StoreDispatch>()()
    return {
        setTheme: (state: Themes) => dispatch(setTheme(state)),
        setOS: (state: OS) => dispatch(setOS(state))
    }
}

export default themeSlice.reducer