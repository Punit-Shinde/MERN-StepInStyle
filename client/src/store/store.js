import { combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { configureStore } from "@reduxjs/toolkit";
import {
  productReducer,
  productDetailsReducer,
} from "../reducers/product.Reducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
