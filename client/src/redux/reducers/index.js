import { combineReducers } from 'redux';

import authReducer from './authReducer';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  user: userReducer,
  message: messageReducer,
});
