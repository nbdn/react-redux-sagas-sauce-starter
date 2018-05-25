import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { cleanStorage } from '../Lib/Auth';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['username'],
  loginFailure: ['error'],
  reminderRequest: ['emailReminder'],
  reminderSuccess: ['email'],
  reminderFailure: ['errorReminder'],
  checkIfLoggedInRequest: null,
  checkIfLoggedInSuccess: ['loggedIn'],
  checkIfLoggedInFailure: ['error'],
  logout: null
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: 'NBDN',
  error: null,
  errorReminder: null,
  fetching: false,
  fetchingIfLoggedIn: false,
  fetchingReminder: false,
  fullName: null,
  loggedIn: false,
  picture: null,
  email: null
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = state => state.merge({ fetching: true });

// we've successfully logged in
export const success = (state, { username }) =>
  state.merge({ fetching: false, error: null, username });

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error });

// we've logged out
export const logout = state => {
  cleanStorage();
  return INITIAL_STATE;
};

export const requestReminder = state => state.merge({ fetchingReminder: true });

export const successReminder = (state, { emailReminder }) =>
  state.merge({ fetchingReminder: false, errorReminder: null, emailReminder });

export const failureReminder = (state, { errorReminder }) =>
  state.merge({ fetchingReminder: false, errorReminder });

export const requestCheckIfLoggedIn = state =>
  state.merge({ fetchingIfLoggedIn: true });

export const successCheckIfLoggedIn = (state, { loggedIn }) =>
  state.merge({ fetchingIfLoggedIn: false, loggedIn });

export const failureCheckIfLoggedIn = state =>
  state.merge({ fetchingIfLoggedIn: false, loggedIn: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.REMINDER_REQUEST]: requestReminder,
  [Types.REMINDER_SUCCESS]: successReminder,
  [Types.REMINDER_FAILURE]: failureReminder,
  [Types.CHECK_IF_LOGGED_IN_REQUEST]: requestCheckIfLoggedIn,
  [Types.CHECK_IF_LOGGED_IN_SUCCESS]: successCheckIfLoggedIn,
  [Types.CHECK_IF_LOGGED_IN_FAILURE]: failureCheckIfLoggedIn,
  [Types.LOGOUT]: logout
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = loginState => loginState.username !== null;
