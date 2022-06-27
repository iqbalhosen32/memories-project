import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';

import { Reducers } from "./Reducers";
import App from "./App";

import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(Reducers, compose(applyMiddleware(thunk)))

root.render(
    <Provider store={store}>
        <App />
    </Provider>);