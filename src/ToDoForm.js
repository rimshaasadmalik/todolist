import { React, useState } from "react";

function ToDoForm() {
  const [todo, setTodo] = useState("");
  const [items, setItems] = useState([]);
  const [editingText, setEditingText] = useState("");
  const [todoEditing, setTodoEditing] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodos = {
      id: new Date().getMilliseconds(),
      text: todo,
      completed: false,
    };

    setItems([...items].concat(newTodos));
    setTodo("");
  };

  const handleDelete = (id) => {
    setItems(items.filter((items) => items.id !== id));
  };

  const completedTodo = (id) => {
    const checkedTodos = [...items].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setItems(checkedTodos);
  };

  const submitEdit = (id) => {
    const subedit = [...items].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setItems(subedit);
    setTodoEditing(null);
    setEditingText("");
  };
  return (
    <div>
      <div className="header">
        <h2>To Do List</h2>
        <hr></hr>
        <h5>By Rimsha Asad Malik</h5>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          required
        ></input>
        <button type="submit"> ADD TODO</button>
      </form>

      {items.map((todo) => (
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            ></input>
          ) : (
            <>
              <input
                type="checkbox"
                onClick={() => completedTodo(todo.id)}
                checked={todo.completed}
              ></input>
              <h3>{todo.text}</h3>
            </>
          )}

          {todoEditing === todo.id ? (
            <button type="button" onClick={() => submitEdit(todo.id)}>
              Save Changes
            </button>
          ) : (
            <button type="button" onClick={() => setTodoEditing(todo.id)}>
              Edit TODO
            </button>
          )}

          <button type="button" onClick={() => handleDelete(todo.id)}>
            {" "}
            delete todo
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToDoForm;
