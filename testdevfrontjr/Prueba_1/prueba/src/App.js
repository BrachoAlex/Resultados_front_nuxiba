import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchPosts, fetchTodos, addTodo } from "./store/index";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

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
    <VStack spacing={5}>
      <Heading>Users</Heading>
      <Box
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        p={5}
        w="100%"
        maxH="200px"
        overflowY="auto"
      >
        <List spacing={3}>
          {users.map((user) => (
            <ListItem
              key={user.id}
              onClick={() => handleClick(user)}
              _hover={{ bg: "gray.100" }}
              cursor="pointer"
            >
              {user.name}
            </ListItem>
          ))}
        </List>
      </Box>
      {selectedUser && (
        <VStack align="start" spacing={5} w="100%">
          <Heading size="lg">{selectedUser.name}</Heading>
          <Text>Username: {selectedUser.username}</Text>
          <Text>Email: {selectedUser.email}</Text>
          <Text>Phone: {selectedUser.phone}</Text>
          <Button onClick={handlePostsClick}>Posts</Button>
          <Button onClick={handleTodosClick}>Todos</Button>
          {display === "posts" &&
            posts.map((post) => (
              <Box
                key={post.id}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={5}
                w="100%"
              >
                <Text mb={2}>ID: {post.id}</Text>
                <Heading size="md">{post.title}</Heading>
                <Text>{post.body}</Text>
              </Box>
            ))}
          {display === "todos" && (
            <VStack align="start" spacing={5} w="100%">
              {todos.map((todo) => (
                <Box
                  key={todo.id}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={5}
                  w="100%"
                >
                  <Heading size="md">{todo.title}</Heading>
                  <Checkbox isChecked={todo.completed} isReadOnly>
                    {todo.completed ? "Completed" : "Not completed"}
                  </Checkbox>
                </Box>
              ))}
              <form onSubmit={handleNewTodoSubmit}>
                <FormControl id="new-todo">
                  <FormLabel>New todo title</FormLabel>
                  <Input
                    type="text"
                    value={newTodoTitle}
                    onChange={handleNewTodoChange}
                    required
                  />
                  <Checkbox
                    isChecked={newTodoCompleted}
                    onChange={handleNewTodoCompletedChange}
                    mt={2}
                  >
                    Completed
                  </Checkbox>
                </FormControl>
                <Button type="submit" colorScheme="blue" mt={2}>
                  Save
                </Button>
              </form>
            </VStack>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default App;
