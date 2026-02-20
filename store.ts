import {configureStore} from "@reduxjs/toolkit"
import themeReducer, {useThemeSelector, useThemeActions} from "./reducers/themeReducer"
import actionReducer, {useActionSelector, useActionActions} from "./reducers/actionReducer"
import upscaleReducer, {useUpscaleSelector, useUpscaleActions} from "./reducers/upscaleReducer"

const store = configureStore({
    reducer: {
        theme: themeReducer,
        action: actionReducer,
        upscale: upscaleReducer
    },
})

export type StoreState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export {
    useThemeSelector, useThemeActions,
    useActionSelector, useActionActions,
    useUpscaleSelector, useUpscaleActions
}

export default store