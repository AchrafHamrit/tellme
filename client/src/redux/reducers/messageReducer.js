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

const initialState = {
  messages: null,
  loading: false,
  loading_send: false,
  error: null,
  error_send: null,
  error_fav: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        error: false,
        loading: false,
        messages: action.payload,
      };

    case SEND_MESSAGE:
      return {
        ...state,
        error_send: false,
        loading_send: false,
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: null,
      };

    case GET_MESSAGES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SEND_MESSAGE_ERROR:
      return {
        ...state,
        error_send: action.payload,
        loading_send: false,
      };

    case SET_LOADING_MESSAGES:
      return {
        ...state,
        loading: true,
      };

    case TOGGLE_FAV_ERROR:
      return {
        ...state,
        error_fav: action.payload,
      };

    case SET_LOADING_SEND_MESSAGE:
      return {
        ...state,
        loading_send: true,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        error_send: null,
      };

    default:
      return state;
  }
};
