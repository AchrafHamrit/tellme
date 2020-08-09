import {
  SEND_MESSAGE,
  SET_LOADING_SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
  CLEAR_ERRORS,
} from '../types';

const initialState = {
  loading_send: false,
  error_send: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        error_send: false,
        loading_send: false,
      };

    case SEND_MESSAGE_ERROR:
      return {
        ...state,
        error_send: action.payload,
        loading_send: false,
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
      };

    default:
      return state;
  }
};
