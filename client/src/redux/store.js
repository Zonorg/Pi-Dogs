import { compose, createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
