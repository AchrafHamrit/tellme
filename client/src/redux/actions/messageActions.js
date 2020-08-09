import axios from 'axios';

import {
  SEND_MESSAGE,
  SET_LOADING_SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
  CLEAR_ERRORS,
} from '../types';

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

// Set loading message to true
export const setLoadingMessageSend = () => {
  return { type: SET_LOADING_SEND_MESSAGE };
};

// Clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
