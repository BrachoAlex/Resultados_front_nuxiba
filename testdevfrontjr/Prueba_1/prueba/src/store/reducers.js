import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "./actions";

const initialState = {
  loading: false,
  users: [],
  posts: [],
  todos: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        loading: false,
        users: action.payload.users.length ? action.payload.users : state.users,
        posts: action.payload.posts.length ? action.payload.posts : state.posts,
        todos: action.payload.todos.length ? action.payload.todos : state.todos,
        error: "",
      };
    case FETCH_DATA_FAILURE:
      return {
        loading: false,
        users: [],
        posts: [],
        todos: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
