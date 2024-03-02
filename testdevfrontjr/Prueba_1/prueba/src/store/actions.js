import axios from "axios";

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

export const fetchDataRequest = () => {
  return {
    type: FETCH_DATA_REQUEST,
  };
};

export const fetchDataSuccess = (users, posts, todos) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: { users, posts, todos },
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(fetchDataSuccess(response.data, [], []));
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
      dispatch(fetchDataSuccess([], response.data, []));
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
      dispatch(fetchDataSuccess([], [], response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const addTodo = (todo) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/users/${todo.userId}/todos`,
        todo
      );
      dispatch(fetchTodos(todo.userId));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};
