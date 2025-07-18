import * as types from '../constants/ActionTypes';

const messages = (state = [], action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return state.concat([
        {
          id: state.length + 1, // simple incremental id
          message: action.message,
          author: action.author,
          status: action.status || 'sent',
          timestamp:
            action.timestamp ||
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          edited: false // ✅ default not edited
        }
      ]);

    case types.UPDATE_MESSAGE_STATUS:
      return state.map((msg) =>
        msg.id === action.id ? { ...msg, status: action.status } : msg
      );

    case types.EDIT_MESSAGE:
      return state.map((msg) =>
        msg.id === action.id
          ? { ...msg, message: action.newMessage, edited: true } // ✅ mark edited
          : msg
      );

    case types.DELETE_MESSAGE:
      return state.filter((msg) => msg.id !== action.id);

    default:
      return state;
  }
};

export default messages;
