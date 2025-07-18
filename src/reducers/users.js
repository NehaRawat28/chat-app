import * as types from '../constants/ActionTypes';

const users = (state = [], action) => {
  switch (action.type) {
    case types.USERS_LIST:
      console.log("✅ USERS_LIST reducer received:", action.users);
      return [...action.users]; // force new array

    default:
      return state;
  }
};

export default users;
