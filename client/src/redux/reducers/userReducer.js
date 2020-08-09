import {
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  SET_LOADING_USER_PROFILE,
  SEND_MESSAGE,
  SET_LOADING_SEND_MESSAGE,
  SEND_MESSAGE_ERROR,
  CLEAR_ERRORS,
} from '../types';

const initialState = {
  user_profile: null,
  loading: true,
  loading_send: false,
  error: null,
  error_send: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_LOADED:
      return {
        ...state,
        user_profile: action.payload,
        loading: false,
      };

    case SEND_MESSAGE:
      return {
        ...state,
        error_send: false,
        loading_send: false,
      };

    case USER_PROFILE_ERROR:
      return {
        ...state,
        user_profile: null,
        error: action.payload || null,
        loading: false,
      };

    case SEND_MESSAGE_ERROR:
      return {
        ...state,
        error_send: action.payload,
        loading_send: false,
      };

    case SET_LOADING_USER_PROFILE:
      return {
        ...state,
        loading: true,
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
