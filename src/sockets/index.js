import * as types from '../constants/ActionTypes';
import {
  messageReceived,
  populateUsersList,
  editMessage,
  deleteMessage
} from '../actions';

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:8989');

  socket.onopen = () => {
    console.log("✅ WebSocket connected! Sending ADD_USER:", username);

    socket.send(
      JSON.stringify({
        type: types.ADD_USER, // will be "ADD_USER"
        name: username
      })
    );
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📩 WebSocket received:", data);

    switch (data.type) {
      case types.ADD_MESSAGE: // "ADD_MESSAGE"
        dispatch(messageReceived(data.message, data.author, data.timestamp));
        break;

      // ✅ handle BOTH plain string & constant
      case 'USERS_LIST':
      case types.USERS_LIST:
        console.log("✅ Dispatching USERS_LIST to Redux:", data.users);
        dispatch(populateUsersList(data.users));
        break;

      case 'INITIAL_MESSAGES':
        console.log("✅ Loading initial messages:", data.messages);
        data.messages.forEach((msg) => {
          dispatch(messageReceived(msg.message, msg.author, msg.timestamp));
        });
        break;

      case 'EDIT_MESSAGE':
        dispatch(editMessage(data.id, data.newMessage));
        break;

      case 'DELETE_MESSAGE':
        dispatch(deleteMessage(data.id));
        break;

      default:
        console.warn("⚠️ Unknown WebSocket message type:", data.type);
        break;
    }
  };

  return socket;
};

export default setupSocket;
