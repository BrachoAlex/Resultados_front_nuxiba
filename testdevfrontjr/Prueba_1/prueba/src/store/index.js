import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import axios from "axios";

// Define the initial state
const initialState = {
  users: [],
  posts: [],
  todos: [],
  loading: false,
  error: null,
};

// Define the reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case "FETCH_TODOS_SUCCESS":
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Define the action creators
const fetchDataRequest = () => ({
  type: "FETCH_DATA_REQUEST",
});

const fetchUsersSuccess = (users) => ({
  type: "FETCH_USERS_SUCCESS",
  payload: users,
});

const fetchPostsSuccess = (posts) => ({
  type: "FETCH_POSTS_SUCCESS",
  payload: posts,
});

const fetchTodosSuccess = (todos) => ({
  type: "FETCH_TODOS_SUCCESS",
  payload: todos,
});

const fetchDataFailure = (error) => ({
  type: "FETCH_DATA_FAILURE",
  payload: error,
});

// Define the async thunk actions
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const fetchPosts = (userId) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      dispatch(fetchPostsSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const fetchTodos = (userId) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`
      );
      dispatch(fetchTodosSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

// Create the Redux store
export const store = createStore(reducer, applyMiddleware(thunk));

// Subscribe to the store
store.subscribe(() => console.log(store.getState()));

// Save a new TODO
export const addTodo = (todo) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      await axios.post(
        `https://jsonplaceholder.typicode.com/users/${todo.userId}/todos`,
        todo
      );
      dispatch(fetchTodosSuccess(todo.userId));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
