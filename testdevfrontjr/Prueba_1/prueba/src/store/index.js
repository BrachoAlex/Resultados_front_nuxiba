import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import reducer from "./reducers";
import * as actions from "./actions";

export const store = createStore(reducer, applyMiddleware(thunk));

export default actions;
