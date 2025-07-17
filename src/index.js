import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import App from "./App";
import reducers from "./reducers";

import setupSocket from "./sockets";
import handleNewMessage from "./sagas";
import username from "./utils/name";

// ✅ 1. create saga middleware
const sagaMiddleware = createSagaMiddleware();

// ✅ 2. create store with middleware
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

// ✅ 3. setup WebSocket AFTER store is created
const socket = setupSocket(store.dispatch, username);

// ✅ 4. run saga AFTER socket is ready
sagaMiddleware.run(handleNewMessage, { socket, username });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
