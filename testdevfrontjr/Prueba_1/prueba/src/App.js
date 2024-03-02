import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchPosts, fetchTodos, addTodo } from "./store/index";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts.sort((a, b) => b.id - a.id));
  const todos = useSelector((state) => state.todos.sort((a, b) => b.id - a.id));
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const [selectedUser, setSelectedUser] = useState(null);
  const [display, setDisplay] = useState("users");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoCompleted, setNewTodoCompleted] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleClick = (user) => {
    setSelectedUser(user);
    dispatch(fetchPosts(user.id));
    dispatch(fetchTodos(user.id));
  };

  const handlePostsClick = () => {
    setDisplay("posts");
  };

  const handleTodosClick = () => {
    setDisplay("todos");
  };

  const handleNewTodoChange = (event) => {
    setNewTodoTitle(event.target.value);
  };

  const handleNewTodoCompletedChange = (event) => {
    setNewTodoCompleted(event.target.checked);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    dispatch(
      addTodo({
        userId: selectedUser.id,
        title: newTodoTitle,
        completed: newTodoCompleted,
      })
    );
    setNewTodoTitle("");
    setNewTodoCompleted(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <div style={{ height: "200px", overflow: "auto" }}>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleClick(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div>
          <h2>{selectedUser.name}</h2>
          <p>Username: {selectedUser.username}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone}</p>
          <button onClick={handlePostsClick}>Posts</button>
          <button onClick={handleTodosClick}>Todos</button>
          {display === "posts" &&
            posts.map((post) => (
              <div key={post.id}>
                <p>ID: {post.id}</p>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))}
          {display === "todos" && (
            <div>
              {todos.map((todo) => (
                <div key={todo.id}>
                  <p>{todo.title}</p>
                  <p>{todo.completed ? "Completed" : "Not completed"}</p>
                </div>
              ))}
              <form onSubmit={handleNewTodoSubmit}>
                <input
                  type="text"
                  value={newTodoTitle}
                  onChange={handleNewTodoChange}
                  placeholder="New todo title"
                  required
                />
                <input
                  type="checkbox"
                  checked={newTodoCompleted}
                  onChange={handleNewTodoCompletedChange}
                />
                <button type="submit">Save</button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
