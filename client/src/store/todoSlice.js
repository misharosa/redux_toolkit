import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const URL_API = "https://jsonplaceholder.typicode.com/todos"

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async ( _ , {rejectWithValue}) => {
        try {
        const { data } = await axios(`${URL_API}?_limit=15`)
            localStorage.setItem('todos', JSON.stringify(data))
        return data
        } catch (error) {
           return rejectWithValue(error.message);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, {rejectWithValue,dispatch}) => {
        try {
            dispatch(removeTodo({id}))

            await axios.delete(`${URL_API}/${id}`)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async ( id, { rejectWithValue, dispatch, getState } ) => {
        const todo = getState().todos.todos.find(todo => todo.id === id)
            try {
                dispatch(toggleTodoComplete({ id }))

                await axios.patch(`${URL_API}/${id}`, {completed: !todo.completed})
            } catch (error) {
                return rejectWithValue((error.message))
            }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async (title, {rejectWithValue, dispatch}) => {
        try {
            const todo = {
                title,
                userId: 1,
                completed: false
            }
            dispatch(addTodo(todo))

            await axios.post(`${URL_API}`, todo)
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload
}

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: JSON.parse(localStorage.getItem('todos')) || [] ,
        status: null,
        error: null,
    },
    reducers: {
        addTodo (state, action) {
            state.todos.push({...action.payload, id: new Date().toISOString()})
        },
        removeTodo (state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete (state, action) {
            state.todos = state.todos.map(todo => {
                return (todo.id !== action.payload.id) ? todo : {...todo, completed: !todo.completed}
            })
        }
    },

    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.todos = action.payload;
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
        [addNewTodo.rejected]: setError
    }
})

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions
export default todoSlice.reducer