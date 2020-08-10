import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  SETTINGS_LOADED,
  UPDATE_SETTINGS,
  UPDATE_PASSWORD,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_LOADING,
  SET_LOADING_SETTINGS,
  AUTH_ERROR,
  SETTINGS_ERROR,
  CLEAR_ERRORS,
} from '../types';

import setAuthToken from '../../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
    return;
  }

  try {
    dispatch(setLoading());
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response?.data,
    });
  }
};

// Load User Settings
export const loadSettings = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
    return;
  }

  try {
    dispatch(setLoadingSettings());
    const res = await axios.get('/api/auth');

    dispatch({
      type: SETTINGS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response?.data,
    });
  }
};

// Update profile
export const updateProfile = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(setLoadingSettings());

    const res = await axios.put('api/users', formData, config);

    dispatch({ type: UPDATE_SETTINGS, payload: res.data });

    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch({
      type: SETTINGS_ERROR,
      payload: error?.response?.data,
    });
  }
};

// Update password
export const updatePassword = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(setLoadingSettings());

    const res = await axios.put('api/users/password', formData, config);

    dispatch({ type: UPDATE_PASSWORD, payload: res.data });

    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch({
      type: SETTINGS_ERROR,
      payload: error?.response?.data,
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(setLoading());

    const res = await axios.post('/api/users', formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error?.response?.data,
    });
  }
};

// Login user
export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch(setLoading());

    const res = await axios.post('api/auth', formData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error?.response?.data,
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Set loading to true
export const setLoading = () => {
  return { type: SET_LOADING };
};

// Set loading settings to true
export const setLoadingSettings = () => {
  return { type: SET_LOADING_SETTINGS };
};

// Clear errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
