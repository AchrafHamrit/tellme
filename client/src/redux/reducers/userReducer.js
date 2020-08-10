import {
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  SET_LOADING_USER_PROFILE,
  CLEAR_ERRORS,
} from '../types';

const initialState = {
  user_profile: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_LOADED:
      return {
        ...state,
        user_profile: action.payload,
        loading: false,
      };

    case USER_PROFILE_ERROR:
      return {
        ...state,
        user_profile: null,
        error: action.payload || null,
        loading: false,
      };

    case SET_LOADING_USER_PROFILE:
      return {
        ...state,
        loading: true,
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
