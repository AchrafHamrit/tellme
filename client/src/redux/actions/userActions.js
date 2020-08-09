import axios from 'axios';

import {
  USER_PROFILE_LOADED,
  USER_PROFILE_ERROR,
  SET_LOADING_USER_PROFILE,
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

// Set loading to true
export const setLoading = () => {
  return { type: SET_LOADING_USER_PROFILE };
};

// Clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
