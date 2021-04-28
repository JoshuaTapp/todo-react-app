import "./styles.css";
import React from "react";

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Finish Professional Development Activities", done: false },
    { id: 2, text: "APMA3080 HW", done: false },
    { id: 3, text: "Watch APMA3100 Lecture", done: false }
  ]);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList setTodos={setTodos} todos={todos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, done: !t.done } : t
    );
    setTodos(updatedTodos);
  }
  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Delete Item?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        AlignLeft: 50,
        cursor: "pointer"
      }}
    >
      [X]
    </span>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(todo); // adds new todo to old array
    });

    inputRef.current.value = ""; //clear field on submit
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input ref={inputRef} name="addTodo" placeholder="Add todo" />
      <button type="submit">Submit</button>
    </form>
  );
}
