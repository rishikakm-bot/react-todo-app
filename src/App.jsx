import { useState } from "react";

function App() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    function addTodo() {
        // Prevent empty tasks
        if (task.trim() === "") {
            return;
        }

        setTodos([
            ...todos,
            {
                id: Date.now(),
                text: task
            }
        ]);

        setTask("");
    }

    function deleteTodo(id) {
        setTodos(
            todos.filter(todo => todo.id !== id)
        );
    }

    return (
        <div>
            <h1>Todo App</h1>

            <input
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />

            <button onClick={addTodo}>
                Add
            </button>

            {todos.length === 0 ? (
                <p>No tasks yet!</p>
            ) : (
                todos.map(todo => (
                    <div key={todo.id}>
                        <span>{todo.text}</span>

                        <button
                            onClick={() => deleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default App;