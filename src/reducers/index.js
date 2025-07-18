import { combineReducers } from 'redux';
import messages from './messages';
import users from './users';  // ✅ include users reducer

export default combineReducers({
  messages,
  users   // ✅ must be here
});
