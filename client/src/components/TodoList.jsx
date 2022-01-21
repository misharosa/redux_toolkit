import { useSelector } from "react-redux"
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
    const todos = useSelector(state => state.todos.todos)

    localStorage.setItem('todos', JSON.stringify(todos))
    const localTodos = JSON.parse(localStorage.getItem('todos'))

    return (
        <ul>
            {
                localTodos.map(todo =>
            <TodoItem
                key={todo.id}
                {...todo}
            />
                )}
        </ul>
    );
};
