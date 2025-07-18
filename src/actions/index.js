import * as types from '../constants/ActionTypes'

let nextMessageId = 0
let nextUserId = 0

export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  message,
  author,
  timestamp: new Date().toISOString(), // ✅ FIX
  status: "delivered"
});

export const addUser = name => ({
	type: types.ADD_USER,
	id: nextUserId++,
	name
})

export const messageReceived = (message, author) => ({
	type : types.MESSAGE_RECEIVED,
	id: nextMessageId++,
	message,
	author
})

export const populateUsersList = (users) => {
  console.log("🚀 populateUsersList action called with:", users);
  return {
    type: types.USERS_LIST,
    users
  };
};


export const updateMessageStatus = (id, status) => ({
  type: types.UPDATE_MESSAGE_STATUS,
  id,
  status
})

export const deleteMessage = (id) => ({
  type: types.DELETE_MESSAGE,
  id
});

export const editMessage = (id, newMessage) => ({
  type: types.EDIT_MESSAGE,
  id,
  newMessage
});





