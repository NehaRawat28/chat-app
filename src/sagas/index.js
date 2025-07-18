import { takeEvery, put } from "redux-saga/effects";
import * as types from "../constants/ActionTypes";
import { updateMessageStatus, editMessage, deleteMessage, addMessage } from "../actions";

function* handleNewMessage(params) {
  const { socket, username } = params;

  // ✅ Send ADD_MESSAGE to server
  yield takeEvery(types.ADD_MESSAGE, function* (action) {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    socket.send(
      JSON.stringify({
        type: types.ADD_MESSAGE,
        message: action.message,
        author: action.author,
        timestamp,
      })
    );

    // Simulate Delivered ✅
    yield new Promise((resolve) => setTimeout(resolve, 500));
    yield put(updateMessageStatus(action.id, "delivered"));

    // Simulate Read ✅✅
    yield new Promise((resolve) => setTimeout(resolve, 2000));
    yield put(updateMessageStatus(action.id, "read"));
  });

  // ✅ Handle server broadcasts
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    switch (data.type) {
      case "ADD_MESSAGE":
        // Add new incoming message
        params.store.dispatch(
          addMessage(data.message, data.author, data.id, data.timestamp)
        );
        break;

      case "EDIT_MESSAGE":
        // Update a message with new text
        params.store.dispatch(editMessage(data.id, data.newMessage));
        break;

      case "DELETE_MESSAGE":
        // Remove message from state
        params.store.dispatch(deleteMessage(data.id));
        break;

      case "INITIAL_MESSAGES":
        // Load history
        data.messages.forEach((msg) => {
          params.store.dispatch(
            addMessage(msg.message, msg.author, msg.id, msg.timestamp)
          );
        });
        break;

      default:
        break;
    }
  };
}

export default handleNewMessage;
