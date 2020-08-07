import { SET_ALERT, REMOVE_ALERT } from '../types';
import { v4 as uuid } from 'uuid';

// Set Alert
export const setAlert = (message, type, timeout = 5000) => async (dispatch) => {
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { id, message, type },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
