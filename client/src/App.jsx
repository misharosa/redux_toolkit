import './App.css';
import { TodoList } from "./components/TodoList";
import { InputField } from "./components/InputField";
import { useEffect, useState } from "react";
import { addNewTodo, fetchTodos } from "./store/todoSlice";
import { useDispatch, useSelector } from "react-redux";

export const App = () => {
    const [title, setTitle] = useState('')
    const dispatch = useDispatch()
    const { status, error } = useSelector(state => state.todos)

    const handleAction = () => {
        title.trim().length > 0 &&
        dispatch(addNewTodo(title))
        setTitle('')
    }

    useEffect(() => {
        if(!JSON.parse(JSON.parse(localStorage.getItem('persist:root')).todos).todos.length){
            dispatch(fetchTodos())
        }
    }, [dispatch])

  return (
    <div className="App">
        <InputField
        value={title}
        updateText={setTitle}
        handleAction={handleAction}
        />
        {status === 'loading' && <h2>Loading...</h2>}
        {error && <h2>An error occurred: "{error}"</h2>}
        <TodoList />
    </div>
  );
}
