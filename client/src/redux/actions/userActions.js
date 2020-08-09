import axios from 'axios';

import {
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  SET_LOADING_USER_PROFILE,
  SEND_MESSAGE,
  SET_LOADING_SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
  CLEAR_ERRORS,
} from '../types';

// Load User
export const loadUserProfile = (username) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const res = await axios.get('/api/users/' + username);

    dispatch({
      type: USER_PROFILE_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_ERROR,
      payload: error.response?.data,
    });
  }
};

// Send message
export const sendMessage = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(setLoadingMessageSend());
    const res = await axios.post('/api/messages/', formData, config);

    dispatch({ type: SEND_MESSAGE, payload: res.data });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_ERROR,
      payload: error.response?.data,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return { type: SET_LOADING_USER_PROFILE };
};

// Set loading message to true
export const setLoadingMessageSend = () => {
  return { type: SET_LOADING_SEND_MESSAGE };
};

// Clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
