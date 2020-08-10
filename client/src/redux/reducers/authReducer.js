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

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  loading_settings: true,
  user: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case SETTINGS_LOADED:
      return {
        ...state,
        loading_settings: false,
        user: action.payload,
      };

    case UPDATE_SETTINGS:
    case UPDATE_PASSWORD:
      return {
        ...state,
        loading_settings: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload || null,
      };

    case SETTINGS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading_settings: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_LOADING_SETTINGS:
      return {
        ...state,
        loading_settings: true,
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
