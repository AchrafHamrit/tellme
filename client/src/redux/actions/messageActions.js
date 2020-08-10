import axios from 'axios';

import {
  GET_MESSAGES,
  SEND_MESSAGE,
  CLEAR_MESSAGES,
  SET_LOADING_MESSAGES,
  SET_LOADING_SEND_MESSAGE,
  GET_MESSAGES_ERROR,
  SEND_MESSAGE_ERROR,
  TOGGLE_FAV_ERROR,
  CLEAR_ERRORS,
} from '../types';

// Get messages
export const getMessages = () => async (dispatch) => {
  try {
    dispatch(setLoadingMessages());
    const res = await axios.get('/api/messages');

    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MESSAGES_ERROR,
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

// Toggle message fav
export const toggleFav = (id) => async (dispatch) => {
  try {
    await axios.put('/api/messages/fav/' + id);
  } catch (error) {
    dispatch({
      type: TOGGLE_FAV_ERROR,
      payload: error.response?.data,
    });
  }
};

// Clear messages
export const clearMessages = () => {
  return { type: CLEAR_MESSAGES };
};

// Set loading messages to true
export const setLoadingMessages = () => {
  return { type: SET_LOADING_MESSAGES };
};

// Set loading message send to true
export const setLoadingMessageSend = () => {
  return { type: SET_LOADING_SEND_MESSAGE };
};

// Clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
