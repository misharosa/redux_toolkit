import { configureStore, combineReducers } from "@reduxjs/toolkit"
import todoReducer from "./todoSlice"

const rootReducer = combineReducers({
    todos: todoReducer,
})

export const store = configureStore({
    reducer: rootReducer,
})
