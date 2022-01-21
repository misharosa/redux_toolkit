import { useSelector } from "react-redux"
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
    const todos = useSelector(state => state.todos.todos)

    sessionStorage.setItem('todos', JSON.stringify(todos))
    const localTodos = JSON.parse(sessionStorage.getItem('todos'))

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
