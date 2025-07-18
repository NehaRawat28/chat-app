import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import App from './App';
import reducers from './reducers';
import handleNewMessage from './sagas';
import setupSocket from './sockets';
import username from './utils/name';

document.title = "Connectly";
const sagaMiddleware = createSagaMiddleware();

// ✅ 1️⃣ Create store first
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

// ✅ 2️⃣ Expose globally AFTER creation
window.store = store;

// ✅ 3️⃣ Setup socket
const socket = setupSocket(store.dispatch, username);
sagaMiddleware.run(handleNewMessage, { socket, username });

// ✅ 4️⃣ (Optional) Inject test users
store.dispatch({
  type: 'USERS_LIST',
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
