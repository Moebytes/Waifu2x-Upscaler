import {createSlice} from "@reduxjs/toolkit"
import {useSelector, useDispatch} from "react-redux"
import type {StoreState, StoreDispatch} from "../store"

const actionSlice = createSlice({
    name: "action",
    initialState: {
        clearAll: false,
        advSettings: false,
        previewVisible: false
    },
    reducers: {
        setClearAll: (state, action) => {state.clearAll = action.payload},
        setAdvSettings: (state, action) => {state.advSettings = action.payload},
        setPreviewVisible: (state, action) => {state.previewVisible = action.payload}
    }    
})

const {
    setClearAll, setAdvSettings, setPreviewVisible
} = actionSlice.actions

export const useActionSelector = () => {
    const selector = useSelector.withTypes<StoreState>()
    return {
        clearAll: selector((state) => state.action.clearAll),
        advSettings: selector((state) => state.action.advSettings),
        previewVisible: selector((state) => state.action.previewVisible)
    }
}

export const useActionActions = () => {
    const dispatch = useDispatch.withTypes<StoreDispatch>()()
    return {
        setClearAll: (state: boolean) => dispatch(setClearAll(state)),
        setAdvSettings: (state: boolean) => dispatch(setAdvSettings(state)),
        setPreviewVisible: (state: boolean) => dispatch(setPreviewVisible(state))
    }
}

export default actionSlice.reducer